import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Target Email mandated by user
const ADMIN_EMAIL = 'miludessaula123@gmail.com';

// Server-side orders store
interface ServerOrder {
  orderId: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  productName?: string;
  color: string;
  dimension: string;
  quantity: number;
  totalPrice: number;
  date: string;
  status: string;
  receivedAt: string;
  emailSent: boolean;
  emailDeliveryMethod: string;
}

const serverOrders: ServerOrder[] = [];

// Helper to send real email to miludessaula123@gmail.com via FormSubmit API + Nodemailer
async function dispatchOrderEmail(order: any): Promise<{ success: boolean; method: string; details?: any }> {
  const prodName = order.productName || 'Article Kasa & Home';
  const orderRef = order.orderId || `KH-${Date.now().toString().slice(-5)}`;
  const totalDh = order.totalPrice ? `${Number(order.totalPrice).toLocaleString('fr-FR')} DH` : '0 DH';
  const orderDate = order.date || new Date().toLocaleString('fr-FR');

  let emailSent = false;
  let methodUsed = 'FormSubmit.co API';

  // Method 1: FormSubmit.co direct forwarder to miludessaula123@gmail.com
  try {
    const payload = {
      _subject: `🚨 [NOUVELLE COMMANDE #${orderRef}] ${order.customerName} - ${order.city} (${totalDh})`,
      _template: 'table',
      _captcha: 'false',
      _replyto: 'no-reply@kasaandhome.ma',
      'N° de Commande': orderRef,
      'Date Commande': orderDate,
      'Nom du Client': order.customerName,
      'Téléphone': order.phone,
      'Ville de Livraison': order.city,
      'Adresse Complète': order.address,
      'Instructions / Note': order.note || 'Aucune',
      'Produit Commandé': prodName,
      'Format / Taille': order.dimension || 'Standard',
      'Couleur': order.color || 'Standard',
      'Quantité': order.quantity || 1,
      'Total à Encaisser (COD)': totalDh,
      'Statut': 'Enregistré - À Contacter et Expédier'
    };

    const res = await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`[EMAIL DISPATCH SUCCESS] FormSubmit delivered order #${orderRef} to ${ADMIN_EMAIL}:`, data);
      emailSent = true;
      methodUsed = 'FormSubmit Direct Delivery';
    } else {
      const errText = await res.text();
      console.warn(`[EMAIL DISPATCH WARN] FormSubmit response:`, errText);
    }
  } catch (err: any) {
    console.warn('[EMAIL DISPATCH WARN] FormSubmit direct call error:', err.message);
  }

  // Method 2: Nodemailer SMTP if configured in environment
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #FAF8F5; padding: 24px; color: #2A231F;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e7e5e4;">
            <div style="background: #2A231F; color: #f59e0b; padding: 16px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 20px; text-transform: uppercase;">KASA & HOME</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #e7e5e4;">Alerte Nouvelle Commande</p>
            </div>
            <h2 style="color: #059669; font-size: 18px; margin-top: 0;">🎉 Commande N° ${orderRef}</h2>
            <div style="background-color: #f5f5f4; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
              <p><strong>Client:</strong> ${order.customerName}</p>
              <p><strong>Téléphone:</strong> ${order.phone}</p>
              <p><strong>Ville:</strong> ${order.city}</p>
              <p><strong>Adresse:</strong> ${order.address}</p>
              ${order.note ? `<p><strong>Note:</strong> ${order.note}</p>` : ''}
            </div>
            <div style="background-color: #fef3c7; border-radius: 12px; padding: 16px; border: 1px solid #fde68a;">
              <p><strong>Produit:</strong> ${prodName}</p>
              <p><strong>Format:</strong> ${order.dimension}</p>
              <p><strong>Couleur:</strong> ${order.color}</p>
              <p><strong>Quantité:</strong> ${order.quantity}</p>
              <p style="font-size: 18px; color: #78350f;"><strong>Total:</strong> ${totalDh}</p>
            </div>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Kasa & Home Store" <${process.env.SMTP_USER}>`,
        to: ADMIN_EMAIL,
        subject: `🚨 NOUVELLE COMMANDE #${orderRef} - ${order.customerName} (${order.city})`,
        html: emailHtml,
      });

      console.log(`[EMAIL DISPATCH SUCCESS] SMTP delivered order #${orderRef} to ${ADMIN_EMAIL}`);
      emailSent = true;
      methodUsed = 'SMTP Transporter';
    } catch (smtpErr: any) {
      console.warn('[EMAIL DISPATCH SMTP WARN]:', smtpErr.message);
    }
  }

  return { success: emailSent, method: methodUsed };
}

// POST /api/orders
app.post('/api/orders', async (req, res) => {
  try {
    const order = req.body;

    if (!order || !order.customerName || !order.phone) {
      return res.status(400).json({ error: 'Données de commande incomplètes' });
    }

    const emailResult = await dispatchOrderEmail(order);

    const orderRecord: ServerOrder = {
      orderId: order.orderId || `KH-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: order.customerName,
      phone: order.phone,
      city: order.city,
      address: order.address,
      note: order.note || '',
      productName: order.productName || 'Article Kasa & Home',
      color: order.color || 'Standard',
      dimension: order.dimension || 'Standard',
      quantity: Number(order.quantity) || 1,
      totalPrice: Number(order.totalPrice) || 0,
      date: order.date || new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: order.status || 'Pending',
      receivedAt: new Date().toISOString(),
      emailSent: emailResult.success,
      emailDeliveryMethod: emailResult.method,
    };

    serverOrders.unshift(orderRecord);

    console.log(`[ORDER RECORDED] Order #${orderRecord.orderId} stored. Email sent: ${emailResult.success} via ${emailResult.method}`);

    return res.status(200).json({
      success: true,
      message: `Commande enregistrée avec succès et transmise à ${ADMIN_EMAIL}`,
      orderId: orderRecord.orderId,
      emailSent: emailResult.success,
      deliveryMethod: emailResult.method,
      recipientEmail: ADMIN_EMAIL,
    });
  } catch (err: any) {
    console.error('Error processing order:', err);
    return res.status(500).json({ error: 'Erreur lors du traitement de la commande', details: err.message });
  }
});

// POST /api/test-email
app.post('/api/test-email', async (req, res) => {
  try {
    const testOrder = {
      orderId: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: req.body.customerName || 'Test Client Kasa & Home',
      phone: req.body.phone || '+212 6 00 00 00 00',
      city: req.body.city || 'Casablanca',
      address: req.body.address || 'Boulevard d\'Anfa, Test',
      note: 'Ceci est un test de notification automatique par email.',
      productName: req.body.productName || 'Vase Sculptural Organique',
      color: 'Gris Ciment',
      dimension: 'Grand Format (32cm)',
      quantity: 1,
      totalPrice: 420,
      date: new Date().toLocaleString('fr-FR'),
    };

    const result = await dispatchOrderEmail(testOrder);
    return res.json({
      success: true,
      message: `E-mail de test envoyé à ${ADMIN_EMAIL}`,
      result,
      recipient: ADMIN_EMAIL,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/orders
app.get('/api/orders', (req, res) => {
  res.json({ orders: serverOrders, targetEmail: ADMIN_EMAIL });
});

// Vite Middleware for Dev / Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kasa & Home server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

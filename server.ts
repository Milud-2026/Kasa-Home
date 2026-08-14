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

// Server-side orders store
const serverOrders: any[] = [];

// Target Email
const ADMIN_EMAIL = 'miludessaula123@gmail.com';

// Configure Nodemailer transporter
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback transporter (JSON / Stream output for logging and test dispatch)
  return nodemailer.createTransport({
    jsonTransport: true,
  });
};

// API Route: Submit New Order & Send Email
app.post('/api/orders', async (req, res) => {
  try {
    const order = req.body;

    if (!order || !order.customerName || !order.phone) {
      return res.status(400).json({ error: 'Données de commande incomplètes' });
    }

    const orderRecord = {
      ...order,
      receivedAt: new Date().toISOString(),
      targetEmail: ADMIN_EMAIL,
    };

    serverOrders.unshift(orderRecord);

    // Format Email Content
    const emailSubject = `🚨 NOUVELLE COMMANDE #${order.orderId || 'SANS-ID'} - ${order.customerName} (${order.city})`;
    
    const emailText = `
==================================================
        NOUVELLE COMMANDE REÇUE - KASA & HOME
==================================================

- N° de Commande: ${order.orderId || 'N/A'}
- Date: ${order.date || new Date().toLocaleString('fr-FR')}

--- INFORMATIONS CLIENT ---
- Nom & Prénom: ${order.customerName}
- Téléphone: ${order.phone}
- Ville: ${order.city}
- Adresse de Livraison: ${order.address}
- Notes/Instructions: ${order.note || 'Aucune note'}

--- DÉTAILS DU PRODUIT COMMANDÉ ---
- Produit: ${order.productName || 'Article Kasa & Home'}
- Option / Format: ${order.dimension || 'Standard'}
- Couleur / Finition: ${order.color || 'Standard'}
- Quantité: ${order.quantity || 1}
- TOTAL À PAYER A LA LIVRAISON: ${order.totalPrice ? order.totalPrice.toLocaleString('fr-FR') : '0'} DH

--------------------------------------------------
Destinataire Admin: ${ADMIN_EMAIL}
Statut: Enregistré dans le panneau Admin & notification transmise.
==================================================
`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #FAF8F5; padding: 24px; color: #2A231F;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e7e5e4; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: #2A231F; color: #f59e0b; padding: 16px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">KASA & HOME</h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #e7e5e4;">Alerte Nouvelle Commande Clients</p>
          </div>

          <h2 style="color: #059669; font-size: 18px; margin-top: 0;">🎉 Commande N° ${order.orderId || 'MH-NEW'}</h2>

          <div style="background-color: #f5f5f4; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; font-size: 14px; color: #78350f; text-transform: uppercase;">1. Informations Client & Livraison</h3>
            <p style="margin: 4px 0;"><strong>Nom Client:</strong> ${order.customerName}</p>
            <p style="margin: 4px 0;"><strong>Téléphone:</strong> <a href="tel:${order.phone}" style="color: #b45309; font-weight: bold;">${order.phone}</a></p>
            <p style="margin: 4px 0;"><strong>Ville:</strong> ${order.city}</p>
            <p style="margin: 4px 0;"><strong>Adresse:</strong> ${order.address}</p>
            ${order.note ? `<p style="margin: 4px 0;"><strong>Note Client:</strong> ${order.note}</p>` : ''}
          </div>

          <div style="background-color: #fef3c7; border-radius: 12px; padding: 16px; border: 1px solid #fde68a; margin-bottom: 20px;">
            <h3 style="margin-top: 0; font-size: 14px; color: #92400e; text-transform: uppercase;">2. Détails du Produit Sélectionné</h3>
            <p style="margin: 4px 0; font-size: 16px;"><strong>Produit:</strong> ${order.productName || 'Article Kasa & Home'}</p>
            <p style="margin: 4px 0;"><strong>Format / Taille:</strong> ${order.dimension || 'Standard'}</p>
            <p style="margin: 4px 0;"><strong>Couleur:</strong> ${order.color || 'Standard'}</p>
            <p style="margin: 4px 0;"><strong>Quantité:</strong> ${order.quantity || 1}</p>
            <hr style="border: 0; border-top: 1px solid #fcd34d; margin: 12px 0;" />
            <p style="margin: 4px 0; font-size: 18px; color: #78350f;"><strong>Total à encaisser (COD):</strong> <span style="font-weight: bold;">${order.totalPrice ? order.totalPrice.toLocaleString('fr-FR') : '0'} DH</span></p>
          </div>

          <div style="text-align: center; font-size: 12px; color: #78716c; border-top: 1px solid #e7e5e4; padding-top: 16px;">
            Cet e-mail a été envoyé automatiquement à <strong>${ADMIN_EMAIL}</strong> pour validation et expédition du colis.
          </div>
        </div>
      </div>
    `;

    const transporter = createTransporter();

    const mailOptions = {
      from: '"Kasa & Home Store" <notifications@kasaandhome.ma>',
      to: ADMIN_EMAIL,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    };

    const sendResult = await transporter.sendMail(mailOptions);
    console.log(`[ORDER NOTIFICATION] Email for Order #${order.orderId} dispatched to ${ADMIN_EMAIL}:`, sendResult);

    return res.status(200).json({
      success: true,
      message: `Commande enregistrée et email envoyé à ${ADMIN_EMAIL}`,
      orderId: order.orderId,
      recipientEmail: ADMIN_EMAIL,
    });
  } catch (err: any) {
    console.error('Error processing order email:', err);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi de la commande par email', details: err.message });
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

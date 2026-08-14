import React from 'react';
import { CheckCircle, Truck, Phone, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderConfirmationModalProps {
  order: OrderDetails;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  const prodName = order.productName || 'Article Kasa & Home';
  const whatsappText = encodeURIComponent(
    `Bonjour Kasa & Home ! Je viens de passer la commande ${order.orderId} pour ${prodName} (${order.color}) à ${order.city}. Merci de me contacter pour valider la livraison !`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative border border-stone-200 shadow-2xl overflow-hidden">
        {/* Top Green Banner */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-600 to-teal-500" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center flex flex-col items-center gap-2 mt-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner mb-1">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Commande Validée & Notification Envoyée !
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Merci {order.customerName.split(' ')[0]} !
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-sm">
            Votre commande <strong className="text-stone-900 font-mono">{order.orderId}</strong> pour <strong>{prodName}</strong> a bien été enregistrée. Notre équipe logistique va vous contacter incessamment au <strong className="text-stone-900">{order.phone}</strong> pour confirmer votre livraison.
          </p>
        </div>

        {/* Email Notification Dispatch Status Banner */}
        <div className="mt-4 bg-amber-50 p-3 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 flex items-center gap-2">
          <span className="text-base">📧</span>
          <span>
            Les détails complets de votre commande ont été transmis directement à l'adresse <strong>miludessaula123@gmail.com</strong> ainsi que dans le panneau d'administration.
          </span>
        </div>

        {/* Order Details Card */}
        <div className="mt-4 bg-stone-50 rounded-2xl p-4 border border-stone-200/80 text-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
            <span className="font-bold text-stone-900 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-800" />
              Récapitulatif de votre commande :
            </span>
            <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
              {order.totalPrice.toLocaleString('fr-FR')} DH
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-stone-700">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Produit</span>
              <span className="font-semibold text-stone-900">{prodName}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Format / Taille</span>
              <span className="font-semibold text-stone-900">{order.dimension}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Couleur</span>
              <span className="font-semibold text-amber-900">{order.color}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Paiement</span>
              <span className="font-bold text-emerald-700">Paiement à la livraison</span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200/80 flex flex-col gap-1 text-stone-700">
            <span className="text-stone-400 text-[10px] uppercase font-bold">Adresse de livraison</span>
            <span className="font-medium text-stone-900">
              {order.address}, <strong>{order.city}</strong>
            </span>
            <span className="text-stone-500 text-[11px] flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3 text-amber-800" /> Téléphone : {order.phone}
            </span>
          </div>
        </div>

        {/* Shipping Timeline */}
        <div className="mt-4 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-950">
          <Truck className="w-5 h-5 text-emerald-700 shrink-0" />
          <div>
            <span className="font-bold block">Estimation de Livraison :</span>
            <span>
              {order.city === 'Casablanca' || order.city === 'Rabat'
                ? 'Expédition sous 24h à 48h (Grands centres)'
                : 'Expédition sous 3 à 5 jours ouvrés à votre domicile'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2">
          <a
            href={`https://wa.me/212661002233?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Suivre ma commande sur WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Retourner à la boutique Mon Habitat
          </button>
        </div>
      </div>
    </div>
  );
};

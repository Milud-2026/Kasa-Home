import React from 'react';
import { Truck, ShieldCheck, RefreshCw, CheckCircle2, Clock } from 'lucide-react';

export const ShippingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
          POLITIQUE DE LIVRAISON & RETOUR
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
          Livraison Partout au Maroc & Paiement à la Livraison
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto">
          Chez Mon Habitat, nous facilitons au maximum votre expérience d'achat. Transparence totale, sécurité et accompagnement de A à Z.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3">
          <Truck className="w-10 h-10 text-amber-600 mx-auto" />
          <h3 className="font-bold text-stone-900 text-base">Livraison Offerte</h3>
          <p className="text-stone-600 text-xs">Gratuite dès 499 DH d'achat partout au Maroc.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3">
          <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-stone-900 text-base">Cash on Delivery</h3>
          <p className="text-stone-600 text-xs">Vous ne payez le livreur qu'après réception de votre colis.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3">
          <RefreshCw className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="font-bold text-stone-900 text-base">Échange & Retour 14 Jours</h3>
          <p className="text-stone-600 text-xs">Garantie satisfait ou échangé en cas de défaut ou souci de taille.</p>
        </div>
      </div>

      {/* Detailed Accordions / Explanations */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200 space-y-8 shadow-sm">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            1. Délais de Livraison par Zone Géographique
          </h2>
          <div className="text-stone-600 text-sm space-y-2 leading-relaxed">
            <p><strong>Grand Casablanca & Rabat-Salé :</strong> Expédition express sous 24h à 48h jours ouvrés.</p>
            <p><strong>Marrakech, Tanger, Agadir, Fès, Meknès, Oujda, Tétouan, Kénitra :</strong> 48h à 72h ouvrés.</p>
            <p><strong>Autres provinces et zones du Sud (Laâyoune, Dakhla...) :</strong> 3 à 5 jours ouvrés.</p>
          </div>
        </section>

        <section className="space-y-3 border-t border-stone-100 pt-6">
          <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            2. Déroulement de la Livraison et Vérification du Colis
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Avant le passage du livreur, vous recevez un appel téléphonique pour valider votre présence. À l'arrivée de votre commande, vous avez le droit de vérifier l'état extérieur de votre emballage et la couleur de la housse avant de régler le montant en espèces.
          </p>
        </section>

        <section className="space-y-3 border-t border-stone-100 pt-6">
          <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            3. Procédure de Retour & Échange
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Si votre article présente un défaut de fabrication ou ne correspond pas à la commande validée, contactez immédiatement notre service client au <strong>0522 00 00 00</strong> ou sur WhatsApp. Notre transporteur récupérera le produit à votre domicile gratuitement pour un échange sous 48h.
          </p>
        </section>
      </div>
    </div>
  );
};

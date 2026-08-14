import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Truck, Clock, RefreshCw, MessageCircle, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, setCurrentRoute } = useStore();
  return (
    <footer className="bg-[#2A231F] text-stone-300 pt-12 pb-20 sm:pb-12 border-t border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-stone-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Livraison au Maroc</h4>
              <p className="text-stone-400 mt-0.5">Gratuite dès 499 DH</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Garantie 10 Ans</h4>
              <p className="text-stone-400 mt-0.5">Sur la mousse HR 35kg/m³</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Paiement à la Livraison</h4>
              <p className="text-stone-400 mt-0.5">100% Cash On Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">30 Jours d'Essai</h4>
              <p className="text-stone-400 mt-0.5">Satisfait ou remboursé</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-stone-800">
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                KASA & HOME
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Kasa & Home est la destination e-commerce référence pour la maison au Maroc : objets de décoration, luminaires, art de la table, linge de maison et accessoires d'art de vivre.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Conseil</span>
              </a>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="md:col-span-3 flex flex-col gap-2 text-xs">
            <h4 className="font-serif font-bold text-white text-sm mb-1 uppercase tracking-wider">
              Nos Univers
            </h4>
            <button onClick={() => setCurrentRoute('catalog')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              Déco & Sculptures
            </button>
            <button onClick={() => setCurrentRoute('catalog')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              Luminaires & Éclairage
            </button>
            <button onClick={() => setCurrentRoute('catalog')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              Cuisine & Art de la Table
            </button>
            <button onClick={() => setCurrentRoute('catalog')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              Rangement & Organisation
            </button>
            <button onClick={() => setCurrentRoute('catalog')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              Linge de Maison & Plaids
            </button>
            <button onClick={() => setCurrentRoute('catalog')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              Senteurs & Diffuseurs
            </button>
          </div>

          {/* Nav Col 2 */}
          <div className="md:col-span-2 flex flex-col gap-2 text-xs">
            <h4 className="font-serif font-bold text-white text-sm mb-1 uppercase tracking-wider">
              Service Client
            </h4>
            <button onClick={() => setCurrentRoute('faq')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              FAQ & Aide
            </button>
            <button onClick={() => setCurrentRoute('shipping')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              Conditions de Livraison
            </button>
            <button onClick={() => setCurrentRoute('about')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              À Propos de Kasa & Home
            </button>
            <button onClick={() => setCurrentRoute('contact')} className="text-left text-stone-400 hover:text-amber-400 transition-colors">
              Contactez-nous
            </button>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-3 flex flex-col gap-2.5 text-xs text-stone-300">
            <h4 className="font-serif font-bold text-white text-sm mb-1 uppercase tracking-wider">
              Showroom & Contact
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{settings.storeAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{settings.supportPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{settings.supportEmail}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-3">
            <p>© 2026 Kasa & Home. Tous droits réservés.</p>
          </div>

          <div className="flex items-center gap-2 text-amber-300 font-medium">
            <span>Paiement sécurisé :</span>
            <span className="bg-stone-800 text-white font-bold px-2.5 py-1 rounded text-[10px] border border-stone-700">
              💵 Espèces à la livraison (COD)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

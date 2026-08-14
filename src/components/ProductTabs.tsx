import React, { useState } from 'react';
import { Info, FileText, RefreshCw, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductTabs: React.FC = () => {
  const { selectedProduct, settings } = useStore();
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'care' | 'shipping'>('description');

  return (
    <section id="tabs-section" className="my-10 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
      {/* Tab Navigation Headers */}
      <div className="flex border-b border-stone-200 overflow-x-auto no-scrollbar gap-2 sm:gap-6 pb-2">
        <button
          onClick={() => setActiveTab('description')}
          className={`flex items-center gap-2 pb-3 px-3 font-serif text-sm sm:text-base font-bold whitespace-nowrap border-b-2 transition-all ${
            activeTab === 'description'
              ? 'border-amber-800 text-amber-900 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Description Détillée</span>
        </button>

        <button
          onClick={() => setActiveTab('specs')}
          className={`flex items-center gap-2 pb-3 px-3 font-serif text-sm sm:text-base font-bold whitespace-nowrap border-b-2 transition-all ${
            activeTab === 'specs'
              ? 'border-amber-800 text-amber-900 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Fiche Technique</span>
        </button>

        <button
          onClick={() => setActiveTab('care')}
          className={`flex items-center gap-2 pb-3 px-3 font-serif text-sm sm:text-base font-bold whitespace-nowrap border-b-2 transition-all ${
            activeTab === 'care'
              ? 'border-amber-800 text-amber-900 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Entretien & Conseils</span>
        </button>

        <button
          onClick={() => setActiveTab('shipping')}
          className={`flex items-center gap-2 pb-3 px-3 font-serif text-sm sm:text-base font-bold whitespace-nowrap border-b-2 transition-all ${
            activeTab === 'shipping'
              ? 'border-amber-800 text-amber-900 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Livraison au Maroc</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="pt-6">
        {/* 1. Description Tab */}
        {activeTab === 'description' && (
          <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed flex flex-col gap-4">
            <p>
              Le produit <strong>{selectedProduct.name}</strong> proposé par Kasa & Home associe design raffiné, matériaux durables et finitions soignées pour enrichir votre décoration intérieure au Maroc.
            </p>
            <p className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/60 text-stone-800 font-medium">
              {selectedProduct.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <h4 className="font-bold text-stone-900 text-sm mb-1">✨ Design & Finitions</h4>
                <p className="text-xs text-stone-600">
                  Pensé pour apporter de l'élégance et du relief à vos pièces de vie, vos tables ou vos espaces de repos.
                </p>
              </div>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <h4 className="font-bold text-stone-900 text-sm mb-1">📦 Emballage Sécurisé</h4>
                <p className="text-xs text-stone-600">
                  Expédié dans un carton de protection spécialisé avec calage en bulle pour garantir une réception impeccable.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Fiche Technique */}
        {activeTab === 'specs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <tbody>
                <tr className="border-b border-stone-100">
                  <td className="py-2.5 px-3 font-bold text-stone-900 bg-stone-50 w-1/3">Produit</td>
                  <td className="py-2.5 px-3 text-stone-700">{selectedProduct.name}</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-2.5 px-3 font-bold text-stone-900 bg-stone-50">Catégorie</td>
                  <td className="py-2.5 px-3 text-stone-700">{selectedProduct.category}</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-2.5 px-3 font-bold text-stone-900 bg-stone-50">Options Disponibles</td>
                  <td className="py-2.5 px-3 text-stone-700">
                    {selectedProduct.dimensions?.map(d => d.name).join(' • ') || 'Format Standard'}
                  </td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-2.5 px-3 font-bold text-stone-900 bg-stone-50">Couleurs / Variantes</td>
                  <td className="py-2.5 px-3 text-stone-700">
                    {selectedProduct.colors?.map(c => c.name).join(' • ') || 'Teintes Naturelles'}
                  </td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-2.5 px-3 font-bold text-stone-900 bg-stone-50">Disponibilité</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">En stock (Livraison sous 24h-48h)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 3. Care Instructions */}
        {activeTab === 'care' && (
          <div className="flex flex-col gap-3 text-xs sm:text-sm text-stone-700">
            <h4 className="font-bold text-stone-900 text-sm">Conseils d'entretien Kasa & Home :</h4>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong>Dépoussiérage :</strong> Utilisez un chiffon doux et sec ou un plumeau microfibre pour dépoussiérer délicatement la surface.
              </li>
              <li>
                <strong>Nettoyage des taches :</strong> En cas de salissure, nettoyez immédiatement avec un chiffon humide et un savon doux sans solvant corrosif.
              </li>
              <li>
                <strong>Précautions :</strong> Évitez les chocs thermiques directs ou l'exposition prolongée aux intempéries extérieures.
              </li>
            </ul>
          </div>
        )}

        {/* 4. Shipping & Returns */}
        {activeTab === 'shipping' && (
          <div className="flex flex-col gap-4 text-xs sm:text-sm text-stone-700">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <h4 className="font-bold text-emerald-950 text-sm mb-1">🚚 {settings.freeShippingText}</h4>
              <p className="text-emerald-900">
                Paiement 100% à la livraison en espèces (COD). Vous pouvez inspecter votre colis au moment de la remise en main propre par notre livreur.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 border border-stone-200 rounded-lg">
                <span className="font-bold text-stone-900 block">Casablanca & Rabat :</span>
                <span className="text-stone-600">Livraison express sous 24h.</span>
              </div>
              <div className="p-3 border border-stone-200 rounded-lg">
                <span className="font-bold text-stone-900 block">Toutes les villes du Maroc :</span>
                <span className="text-stone-600">Expédition sous 48h via transporteur partenaire.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

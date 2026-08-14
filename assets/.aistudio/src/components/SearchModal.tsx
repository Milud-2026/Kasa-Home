import React, { useState } from 'react';
import { Search, X, ChevronRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (colorName: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectColor }) => {
  const { products, setSelectedProductId, setCurrentRoute } = useStore();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickPills = ['Vase Sculptural', 'Lampe Champignon', 'Service à Café', 'Plaid Bouclé', 'Table Travertin'];

  const matchedProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentRoute('product');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-16 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-5 relative border border-stone-200 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3 shrink-0">
          <Search className="w-5 h-5 text-amber-900 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Rechercher un objet, luminaire, meuble ou catégorie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-medium text-stone-900 focus:outline-none placeholder:text-stone-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-800 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Search Results */}
        {query.trim() !== '' && (
          <div className="mt-4 flex-1 overflow-y-auto space-y-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              Résultats de recherche ({matchedProducts.length}) :
            </span>
            {matchedProducts.length === 0 ? (
              <p className="text-xs text-stone-500 py-4 text-center">Aucun produit trouvé pour "{query}"</p>
            ) : (
              matchedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p.id)}
                  className="p-3 rounded-xl border border-stone-200 hover:border-amber-800 hover:bg-amber-50/50 flex items-center justify-between gap-3 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{p.name}</h4>
                      <p className="text-[11px] text-amber-800 font-semibold">{p.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">{p.price.toLocaleString('fr-FR')} DH</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Suggestions when query is empty */}
        {query.trim() === '' && (
          <div className="mt-4 space-y-4">
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                Recherches populaires :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPills.map((pill) => (
                  <button
                    key={pill}
                    onClick={() => {
                      setQuery(pill);
                    }}
                    className="text-xs bg-stone-100 hover:bg-amber-100 hover:text-amber-950 text-stone-700 px-3 py-1 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-700" />
                    <span>{pill}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                Catalogue Kasa & Home :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {products.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="p-2.5 rounded-xl border border-stone-200 hover:border-amber-800 hover:bg-amber-50/50 text-left flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-8 h-8 rounded-md object-cover" />
                      <span className="text-xs font-semibold text-stone-800 group-hover:text-amber-900 truncate">
                        {p.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-900 shrink-0 ml-2">{p.price} DH</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

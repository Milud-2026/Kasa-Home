import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, Filter, ArrowUpDown, ChevronRight, Check } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { products, setSelectedProductId, setCurrentRoute } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Dynamic Categories list from active catalog
  const availableCategories = Array.from(new Set(products.map(p => p.category)));
  const categories = ['Tous', ...availableCategories];

  // Filtering
  const filteredProducts = products.filter(p => {
    if (selectedCategory !== 'Tous' && p.category !== selectedCategory) return false;
    if (onlyInStock && !p.inStock) return false;
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-amber-400 font-semibold text-xs uppercase tracking-widest">CATALOGUE EXCLUSIF KASA & HOME</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold">Objets, Déco & Art de la Maison</h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Une sélection unique d'objets de décoration, luminaires, art de la table et textiles conçus pour sublimer votre intérieur. Paiement à la livraison partout au Maroc.
          </p>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-stone-500 text-xs font-bold uppercase tracking-wider mr-2 hidden sm:inline flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Catégories:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting & Stock Filter */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700 select-none">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
            />
            <span>En Stock Uniquement</span>
          </label>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="featured">En Vedette</option>
              <option value="price-asc">Prix: Croissant</option>
              <option value="price-desc">Prix: Décroissant</option>
              <option value="rating">Meilleures Notes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <p className="text-stone-500 text-base font-medium">Aucun produit ne correspond à ces critères.</p>
          <button
            onClick={() => { setSelectedCategory('Tous'); setOnlyInStock(false); }}
            className="bg-stone-900 text-white font-semibold text-xs px-4 py-2.5 rounded-xl"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map(prod => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div 
                  className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer"
                  onClick={() => { setSelectedProductId(prod.id); setCurrentRoute('product'); }}
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.badge && (
                    <span className="absolute top-3 left-3 bg-stone-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md">
                      {prod.badge}
                    </span>
                  )}
                  {prod.colors && prod.colors.length > 0 && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-2 py-1 rounded-full">
                      {prod.colors.slice(0, 4).map(c => (
                        <span
                          key={c.id}
                          className="w-3.5 h-3.5 rounded-full border border-white/60 inline-block"
                          style={{ backgroundColor: c.colorCode }}
                          title={c.name}
                        />
                      ))}
                      {prod.colors.length > 4 && (
                        <span className="text-[10px] text-white font-bold ml-0.5">+{prod.colors.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-amber-800 uppercase tracking-wider">{prod.category}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-stone-800">{prod.rating}</span>
                      <span>({prod.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => { setSelectedProductId(prod.id); setCurrentRoute('product'); }}
                    className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors cursor-pointer"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
                    {prod.tagline}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-stone-900">{prod.price.toLocaleString('fr-FR')} DH</div>
                  {prod.originalPrice > prod.price && (
                    <div className="text-xs text-stone-400 line-through">{prod.originalPrice.toLocaleString('fr-FR')} DH</div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedProductId(prod.id);
                    setCurrentRoute('product');
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Commander</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

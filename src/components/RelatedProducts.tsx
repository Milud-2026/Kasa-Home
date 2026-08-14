import React from 'react';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { RelatedProduct } from '../types';
import { useStore } from '../context/StoreContext';

interface RelatedProductsProps {
  products: RelatedProduct[];
  onQuickAdd: (product: RelatedProduct) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, onQuickAdd }) => {
  const { setSelectedProductId, setCurrentRoute } = useStore();

  const handleOpenProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentRoute('product');
  };

  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
            Produits Assortis
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
            Vous Aimerez Aussi Chez Kasa & Home
          </h2>
        </div>
        <button
          onClick={() => setCurrentRoute('catalog')}
          className="text-xs font-bold text-amber-900 hover:underline hidden sm:flex items-center gap-1 cursor-pointer"
        >
          <span>Voir tout le catalogue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div
                className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer"
                onClick={() => handleOpenProduct(p.id)}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {p.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-stone-900 text-amber-300 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {p.badge}
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold text-stone-900">{p.rating}</span>
                  <span className="text-stone-400">({p.reviewsCount})</span>
                </div>

                <h3
                  onClick={() => handleOpenProduct(p.id)}
                  className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer"
                >
                  {p.name}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">{p.tagline}</p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif font-bold text-amber-900 text-lg">
                    {p.price.toLocaleString('fr-FR')} DH
                  </span>
                  <span className="text-stone-400 line-through text-xs">
                    {p.originalPrice.toLocaleString('fr-FR')} DH
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => onQuickAdd(p)}
                className="w-full bg-stone-100 hover:bg-amber-900 text-stone-800 hover:text-white font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ajouter au Panier</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

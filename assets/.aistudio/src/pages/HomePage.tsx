import React from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, ShieldCheck, Sparkles, Star, ArrowRight, Clock, Award, ChevronRight, Check } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setCurrentRoute, setSelectedProductId, settings } = useStore();

  const featuredProducts = products.filter(p => p.isFeatured || p.isPopular);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917] text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-6 rounded-3xl mx-4 sm:mx-6 shadow-2xl mt-4">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{settings.announcementText}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-100 leading-tight">
              L'Art de Vivre & La Déco Pour Votre Intérieur.
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Découvrez la collection exclusive Kasa & Home : objets de décoration uniques, luminaires d'ambiance, céramiques artisanales, linge de maison et petits mobiliers design pour sublimer chaque pièce.
            </p>

            {/* Value badges in hero */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-stone-300">
              <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Livraison Gratuite Maroc</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Paiement à la Livraison</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Qualité Artisanal Supérieure</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-buy-button"
                onClick={() => setCurrentRoute('catalog')}
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explorer la Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-catalog-button"
                onClick={() => {
                  if (products[0]) {
                    setSelectedProductId(products[0].id);
                    setCurrentRoute('product');
                  } else {
                    setCurrentRoute('catalog');
                  }
                }}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold px-6 py-4 rounded-xl text-base transition-all text-center"
              >
                Découvrir nos Coups de Cœur
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-stone-700/60 shadow-2xl group">
              <img
                src={featuredProducts[0]?.images[0] || 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=800'}
                alt="Kasa & Home Déco"
                className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400">BEST-SELLER KASA & HOME</span>
                <p className="text-xl font-bold text-white">{featuredProducts[0]?.name || 'Vase Sculptural Céramique Nude'}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-amber-400">{featuredProducts[0]?.price || 390} DH</span>
                    {featuredProducts[0]?.originalPrice && (
                      <span className="text-sm line-through text-stone-400">{featuredProducts[0].originalPrice} DH</span>
                    )}
                  </div>
                  <span className="bg-emerald-500 text-stone-950 text-xs font-bold px-2.5 py-1 rounded-full">EN STOCK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Collections Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-amber-700 font-semibold text-xs sm:text-sm uppercase tracking-widest">UNIVERS MAISON</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">Nos Catégories Signatures</h2>
          <p className="text-stone-600 text-sm sm:text-base">Explorez des collections d'objets soigneusement sélectionnées pour votre intérieur.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => setCurrentRoute('catalog')}
            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-stone-200 shadow-sm hover:shadow-md transition-all"
          >
            <img 
              src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=800" 
              alt="Déco & Sculptures" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Incontournable</span>
              <h3 className="text-2xl font-serif font-bold mt-1">Déco & Sculptures</h3>
              <p className="text-stone-300 text-xs mt-1">Vases céramiques, miroirs galbés et objets d'art.</p>
              <div className="inline-flex items-center gap-1 text-amber-300 text-xs font-bold mt-3 group-hover:underline">
                <span>Explorer les objets</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div 
            onClick={() => setCurrentRoute('catalog')}
            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-stone-200 shadow-sm hover:shadow-md transition-all"
          >
            <img 
              src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800" 
              alt="Luminaires & Éclairage" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Ambiance Chaude</span>
              <h3 className="text-2xl font-serif font-bold mt-1">Luminaires & Lampes</h3>
              <p className="text-stone-300 text-xs mt-1">Lampes tactiles sans fil et suspensions design.</p>
              <div className="inline-flex items-center gap-1 text-amber-300 text-xs font-bold mt-3 group-hover:underline">
                <span>Découvrir la gamme</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div 
            onClick={() => setCurrentRoute('catalog')}
            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-stone-200 shadow-sm hover:shadow-md transition-all sm:col-span-2 lg:col-span-1"
          >
            <img 
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800" 
              alt="Art de la Table" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Grès & Céramique</span>
              <h3 className="text-2xl font-serif font-bold mt-1">Cuisine & Table</h3>
              <p className="text-stone-300 text-xs mt-1">Services à café, carafes pyrex et platerie artisanale.</p>
              <div className="inline-flex items-center gap-1 text-amber-300 text-xs font-bold mt-3 group-hover:underline">
                <span>Voir la vaisselle</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">SÉLECTION KASA & HOME</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Nos Nouveautés & Coups de Cœur</h2>
          </div>
          <button
            onClick={() => setCurrentRoute('catalog')}
            className="text-stone-800 hover:text-amber-700 font-semibold text-sm flex items-center gap-1 group"
          >
            <span>Voir tout le catalogue ({products.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(prod => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => { setSelectedProductId(prod.id); setCurrentRoute('product'); }}>
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
                  {!prod.inStock && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                      Rupture de stock
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
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
                  className="bg-stone-900 hover:bg-amber-600 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1"
                >
                  <span>Commander</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Kasa & Home */}
      <section className="bg-stone-100 py-16 px-4 sm:px-6 rounded-3xl max-w-7xl mx-auto border border-stone-200">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">ENGAGEMENT KASA & HOME</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">Pourquoi Nos Clients au Maroc Nous Font Confiance</h2>
          <p className="text-stone-600 text-sm sm:text-base">Des objets soigneusement emballés et livrés rapidement chez vous partout au Maroc.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 mx-auto sm:mx-0">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">Livraison Rapide Gratuit</h3>
            <p className="text-stone-600 text-xs leading-relaxed">Livraison à domicile partout au Maroc sous 24h à 48h dès 300 DH d'achat.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 mx-auto sm:mx-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">Paiement à la Livraison</h3>
            <p className="text-stone-600 text-xs leading-relaxed">Paiement 100% sécurisé en espèces après déballage et inspection de votre colis.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 mx-auto sm:mx-0">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">Finitions Artisanales</h3>
            <p className="text-stone-600 text-xs leading-relaxed">Chaque objet est sélectionné pour la finesse de ses matériaux et son design.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mx-auto sm:mx-0">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">Emballage Sécurisé</h3>
            <p className="text-stone-600 text-xs leading-relaxed">Protection renforcée spéciale pour objets fragiles en céramique et verre.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

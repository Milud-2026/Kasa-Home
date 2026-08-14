import React from 'react';
import { ShieldCheck, Heart, Award, Sparkles, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setCurrentRoute } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
          À PROPOS DE MON HABITAT
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 leading-tight">
          Redéfinir le Confort & l'Élégance du Mobilier au Maroc.
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Chez Mon Habitat, nous croyons qu'un intérieur chaleureux ne doit faire aucun compromis entre esthétique contemporaine, praticité modulaire et confort absolu.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-stone-900">Notre Histoire & Notre Mission</h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Fondée avec la volonté d'offrir au public marocain du mobilier convertible d'exception, notre marque s'est spécialisée dans la création de canapés modulaires à structure 100% mousse Haute Résilience (HR 35kg/m³).
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Fini les mécanismes métalliques lourds, grinçants et difficiles à manier. Nos pièces se métamorphosent en un geste fluide pour accueillir vos moments en famille, vos sessions de lecture ou le sommeil de vos invités.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentRoute('catalog')}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Découvrir nos créations
            </button>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000"
            alt="Matières et finitions Mon Habitat"
            className="w-full h-96 object-cover"
          />
        </div>
      </div>

      {/* Key Numbers */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">10,000+</div>
          <div className="text-stone-300 text-xs sm:text-sm">Foyers Marocains Équipés</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">100%</div>
          <div className="text-stone-300 text-xs sm:text-sm">Paiement à la Livraison</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">10 Ans</div>
          <div className="text-stone-300 text-xs sm:text-sm">Garantie Mousse HR</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">24/48h</div>
          <div className="text-stone-300 text-xs sm:text-sm">Livraison Casablanca & Rabat</div>
        </div>
      </div>

      {/* Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-stone-900 text-center">Les 4 Engagements Mon Habitat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <Award className="w-8 h-8 text-amber-600" />
            <h3 className="font-bold text-stone-900 text-lg">Qualité Mousse Supérieure</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Mousse haute densité ne s'affaissant pas avec le temps. Ergonomie étudiée pour maintenir la colonne vertébrale.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-stone-900 text-lg">Confiance & Transparence</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Aucun acompte exigé. Vous inspectez l'état et la couleur de votre canapé avant de remettre le règlement au livreur.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-600" />
            <h3 className="font-bold text-stone-900 text-lg">Tissus Bouclés Anti-Taches</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Nos textiles en bouclé chenille premium sont à la fois doux au toucher et ultra résistants pour un usage quotidien.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <Truck className="w-8 h-8 text-blue-600" />
            <h3 className="font-bold text-stone-900 text-lg">Couverture Tout le Maroc</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              De Tanger à Laâyoune, nous assurons une livraison soignée directement à votre domicile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

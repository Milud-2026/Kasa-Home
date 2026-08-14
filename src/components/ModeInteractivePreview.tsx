import React, { useState } from 'react';
import { Sofa, Bed, Sparkles, Check, ArrowRightLeft } from 'lucide-react';
import sofaBeige from '../assets/images/sofa_comfy_beige_1786357191090.jpg';
import sofaBedMode from '../assets/images/sofa_comfy_bed_mode_1786357206630.jpg';
import sofaOrange from '../assets/images/sofa_comfy_orange_1786357220372.jpg';

export const ModeInteractivePreview: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'canape' | 'meridienne' | 'lit'>('canape');

  const modesData = {
    canape: {
      title: 'Mode Canapé Design',
      subtitle: 'Pour vos moments détente au quotidien',
      image: sofaBeige,
      length: '200 cm',
      depth: '90 cm',
      height: '70 cm',
      seatHeight: '42 cm',
      description: 'Une assise enveloppante et ferme grâce à la mousse HR 35kg/m³. Design contemporain aux lignes arrondies s\'intégrant parfaitement dans tous les salons.',
      bullets: [
        'Soutien lombaire ergonomique',
        'Tissu bouclé ultra doux & résistant',
        'Design 100% sans arêtes dures',
      ],
    },
    meridienne: {
      title: 'Mode Méridienne Relax',
      subtitle: 'Pour la lecture, séries TV et siestes l\'après-midi',
      image: sofaOrange,
      length: '200 cm',
      depth: '140 cm',
      height: '50 cm',
      seatHeight: '35 cm',
      description: 'Dépliez simplement le premier module vers l\'avant pour allonger vos jambes tout en conservant le dossier relevé pour lire ou regarder la télévision.',
      bullets: [
        'Position ergonomique semi-allongée',
        'Alignement parfait des jambes et des pieds',
        'S\'installe en 2 secondes chrono',
      ],
    },
    lit: {
      title: 'Mode Lit 2 Personnes',
      subtitle: 'Un vrai lit confortable pour recevoir vos invités',
      image: sofaBedMode,
      length: '200 cm',
      depth: '180 cm',
      height: '50 cm',
      seatHeight: '25 cm',
      description: 'Déplié entièrement au sol, il offre une surface de couchage 180x200cm digne d\'un matelas hôtelier haut de gamme. Aucune barre métallique dans le dos !',
      bullets: [
        'Couchage king size 180 x 200 cm',
        'Zéro ressort, zéro bruit, zéro métal',
        'Housse déhoussable et lavable',
      ],
    },
  };

  const current = modesData[activeMode];

  return (
    <section id="mode-preview" className="my-10 bg-[#2A231F] text-stone-100 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="bg-amber-800/60 text-amber-300 border border-amber-700/50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Polyvalence 3-en-1 Innovante
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Un Canapé, Trois Utilisations en Quelques Secondes
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-2">
            Cliquez sur les modes ci-dessous pour voir la transformation instantanée du Canapé-Lit Comfy Mon Habitat.
          </p>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto w-full">
          <button
            onClick={() => setActiveMode('canape')}
            className={`p-3 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
              activeMode === 'canape'
                ? 'bg-amber-600 text-white border-amber-500 shadow-lg scale-102 font-bold'
                : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border-stone-700'
            }`}
          >
            <Sofa className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm">1. Mode Canapé</span>
          </button>

          <button
            onClick={() => setActiveMode('meridienne')}
            className={`p-3 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
              activeMode === 'meridienne'
                ? 'bg-amber-600 text-white border-amber-500 shadow-lg scale-102 font-bold'
                : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border-stone-700'
            }`}
          >
            <ArrowRightLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm">2. Méridienne</span>
          </button>

          <button
            onClick={() => setActiveMode('lit')}
            className={`p-3 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
              activeMode === 'lit'
                ? 'bg-amber-600 text-white border-amber-500 shadow-lg scale-102 font-bold'
                : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border-stone-700'
            }`}
          >
            <Bed className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm">3. Mode Lit</span>
          </button>
        </div>

        {/* Interactive Mode Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900/80 p-6 sm:p-8 rounded-2xl border border-stone-800">
          {/* Left Visual Image with Dimensions Overlay */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden aspect-4/3 border border-stone-700/60 shadow-2xl">
            <img
              src={current.image}
              alt={current.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Floating Measurement Overlay Badge */}
            <div className="absolute top-4 left-4 bg-stone-950/85 backdrop-blur-md text-amber-300 p-3 rounded-xl border border-amber-900/50 shadow-lg">
              <p className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Dimensions Mode</p>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold mt-0.5">
                <span>L: {current.length}</span>
                <span>P: {current.depth}</span>
                <span>H: {current.height}</span>
              </div>
            </div>
          </div>

          {/* Right Mode Specs & Content */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                Configuration Sélectionnée
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                {current.title}
              </h3>
              <p className="text-xs text-amber-200/80 mt-0.5 font-medium">
                {current.subtitle}
              </p>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {current.description}
            </p>

            <ul className="flex flex-col gap-2 my-2">
              {current.bullets.map((b, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-200 font-medium">
                  <div className="w-5 h-5 rounded-full bg-amber-900/80 border border-amber-600 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-amber-300" />
                  </div>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-400">Temps de transformation :</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
                ⚡ Moins de 3 secondes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

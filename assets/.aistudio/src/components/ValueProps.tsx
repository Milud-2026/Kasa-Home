import React from 'react';
import { Layers, Feather, ShieldCheck, Sparkles } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const props = [
    {
      icon: Layers,
      title: 'Mousse HR 35 kg/m³',
      desc: '100% bloc de mousse ergonomique haute résilience pour un maintien ferme du dos et du bassin.',
    },
    {
      icon: Feather,
      title: 'Tissu Bouclé Anti-taches',
      desc: 'Revêtement effet bouclé tendance, doux au toucher, respirant et entièrement déhoussable.',
    },
    {
      icon: Sparkles,
      title: 'Zéro Mécanisme Métallique',
      desc: 'Dépliage fluide 100% silencieux sans charnières métalliques lourdes ni ressorts grinçants.',
    },
    {
      icon: ShieldCheck,
      title: 'Garantie 10 Ans Mon Habitat',
      desc: 'Conçu à Casablanca selon les normes ISO & TSE. Satisfait ou remboursé sous 30 jours.',
    },
  ];

  return (
    <section className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {props.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-stone-50/80 hover:bg-amber-50/50 p-5 rounded-2xl border border-stone-200/80 hover:border-amber-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2A231F] text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900">{p.title}</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

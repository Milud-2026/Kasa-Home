import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  const categories = ['Tous', 'Paiement & Commande', 'Livraison & Délais', 'Qualité & Matériaux', 'Garantie & Retour'];

  const filteredFaqs = faqs.filter((f) => {
    if (activeCategory !== 'Tous' && f.category !== activeCategory) return false;
    return true;
  });

  return (
    <section id="faq-section" className="my-10 bg-stone-50 rounded-2xl border border-stone-200/80 p-6 sm:p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="text-center">
          <span className="bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Besoin d'Informations ?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
            Foire Aux Questions (FAQ)
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Toutes les réponses concernant la livraison au Maroc, le paiement à la livraison et la garantie Mon Habitat.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-amber-900 text-amber-100 font-bold shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3">
          {filteredFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full p-4 text-left font-serif font-bold text-stone-900 text-sm flex items-center justify-between gap-3 hover:bg-amber-50/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-800" />
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 leading-relaxed bg-stone-50/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-4 bg-[#2A231F] text-amber-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif font-bold text-base text-white">Vous avez une autre question ?</h4>
            <p className="text-xs text-stone-300 mt-0.5">
              Notre équipe conseillère à Casablanca vous répond en direct sur WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/212661002233?text=Bonjour%20Mon%20Habitat,%20j'ai%20une%20question%20concernant%20le%20Canape-Lit%20Comfy"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Discuter sur WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

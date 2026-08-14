import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQSection } from '../components/FAQSection';
import { Search, HelpCircle, MessageSquare } from 'lucide-react';
import { PRODUCT_FAQS } from '../data/productData';

export const FAQPage: React.FC = () => {
  const { settings } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = PRODUCT_FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
          CENTRE D'AIDE
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">Questions Fréquentes (FAQ)</h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Trouvez rapidement toutes les réponses à vos questions sur les commandes, la livraison et les produits Mon Habitat.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher une question (ex: livraison, paiement, mousse)..."
          className="w-full bg-white border border-stone-300 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
        />
      </div>

      {/* FAQ Component */}
      <FAQSection faqs={filteredFaqs} />

      {/* WhatsApp Support Box */}
      <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 text-center space-y-4">
        <HelpCircle className="w-10 h-10 text-amber-700 mx-auto" />
        <h3 className="text-xl font-serif font-bold text-stone-900">Vous ne trouvez pas votre réponse ?</h3>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
          Notre équipe commerciale et technique répons directement à toutes vos sollicitations sur WhatsApp du lundi au dimanche.
        </p>
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Poser ma question sur WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

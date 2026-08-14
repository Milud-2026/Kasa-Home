import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-stone-500 flex items-center gap-1.5 flex-wrap">
      <a href="#" className="hover:text-stone-900 flex items-center gap-1 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Accueil</span>
      </a>
      <ChevronRight className="w-3 h-3 text-stone-400" />
      <a href="#" className="hover:text-stone-900 transition-colors">
        Canapés & Lits Convertibles
      </a>
      <ChevronRight className="w-3 h-3 text-stone-400" />
      <span className="font-semibold text-stone-900">Canapé-Lit Comfy 2-en-1</span>
    </nav>
  );
};

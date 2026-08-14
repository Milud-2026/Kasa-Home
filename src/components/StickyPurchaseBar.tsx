import React, { useEffect, useState } from 'react';
import { ColorOption, DimensionOption } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface StickyPurchaseBarProps {
  selectedColor: ColorOption;
  selectedDimension: DimensionOption;
  onScrollToOrderForm: () => void;
}

export const StickyPurchaseBar: React.FC<StickyPurchaseBarProps> = ({
  selectedColor,
  selectedDimension,
  onScrollToOrderForm,
}) => {
  const { selectedProduct } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar when scrolled past 600px
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#2A231F] text-white py-3 px-4 border-t border-amber-900/40 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Item Info */}
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={selectedColor.image}
            alt={selectedColor.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-amber-800/50"
          />
          <div className="hidden sm:flex flex-col overflow-hidden">
            <span className="font-serif font-bold text-sm text-white truncate">
              {selectedProduct.name} ({selectedDimension.name.split(' ')[0]})
            </span>
            <span className="text-xs text-amber-200/90 truncate flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/50"
                style={{ backgroundColor: selectedColor.colorCode }}
              />
              {selectedColor.name} • Paiement à la livraison
            </span>
          </div>
        </div>

        {/* Price & Primary CTA */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="text-right">
            <span className="font-serif font-bold text-lg text-amber-300 block leading-tight">
              {selectedDimension.price.toLocaleString('fr-FR')} DH
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold block">
              Paiement à la livraison
            </span>
          </div>

          <button
            onClick={onScrollToOrderForm}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>COMMANDER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Maximize2, Sparkles, Check, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { ColorOption } from '../types';

interface ProductGalleryProps {
  galleryImages: { src: string; alt: string; title: string }[];
  selectedColor: ColorOption;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  galleryImages,
  selectedColor,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Display current active image from gallery, syncing with color image if valid
  const currentImage =
    selectedColor?.image && galleryImages.some((g) => g.src === selectedColor.image)
      ? activeIndex === 0
        ? selectedColor.image
        : galleryImages[activeIndex]?.src || selectedColor.image
      : galleryImages[activeIndex]?.src || selectedColor?.image || galleryImages[0]?.src || '';

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image Frame */}
      <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs group">
        <img
          src={currentImage}
          alt={galleryImages[activeIndex]?.alt || 'Canapé Lit Comfy'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Promo Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-amber-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Promo -27%
          </span>
          <span className="bg-stone-900/90 backdrop-blur-md text-amber-300 font-semibold text-[11px] px-2.5 py-0.5 rounded-md shadow-xs">
            🔥 Best-Seller Mon Habitat
          </span>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="bg-white/95 hover:bg-white text-stone-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 backdrop-blur-xs hover:scale-105 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-stone-900" />
            <span>Voir Vidéo (0:45)</span>
          </button>

          <button
            onClick={() => setIsZoomOpen(true)}
            className="bg-stone-900/80 hover:bg-stone-900 text-white p-2 rounded-full shadow-md backdrop-blur-xs hover:scale-105 transition-all"
            aria-label="Agrandir l'image"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Color Sync Indicator */}
        <div className="absolute bottom-3 left-3 bg-stone-900/80 text-stone-100 text-[11px] px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/50"
            style={{ backgroundColor: selectedColor.colorCode }}
          />
          <span>Finition : <strong>{selectedColor.name}</strong></span>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-5 gap-2">
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative aspect-4/3 rounded-lg overflow-hidden border-2 transition-all ${
              activeIndex === idx
                ? 'border-amber-800 ring-2 ring-amber-800/20 scale-102'
                : 'border-stone-200 opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={idx === 0 && selectedColor.image ? selectedColor.image : img.src}
              alt={img.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {activeIndex === idx && (
              <div className="absolute inset-0 bg-amber-900/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-amber-900 font-bold bg-white/90 rounded-full p-0.5" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={currentImage}
              alt="Zoomed product view"
              referrerPolicy="no-referrer"
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <p className="text-stone-300 text-sm mt-3 font-medium">
              {galleryImages[activeIndex]?.title || selectedColor.name} — Toucher ou cliquez n'importe où pour fermer
            </p>
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 font-bold text-lg"
            >
              ✕ Fermer
            </button>
          </div>
        </div>
      )}

      {/* Video Modal Demo */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="bg-stone-900 text-white rounded-2xl max-w-2xl w-full p-6 relative border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b border-stone-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-amber-400">
                Démonstration Transformation Canapé-Lit Comfy
              </h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-stone-950 rounded-xl flex flex-col items-center justify-center p-6 text-center border border-stone-800 relative overflow-hidden">
              <img
                src={galleryImages[1]?.src || currentImage}
                alt="Video preview frame"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xs"
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg mb-3 animate-bounce">
                  <Play className="w-8 h-8 fill-stone-950 ml-1" />
                </div>
                <p className="font-semibold text-white text-base">
                  Passage instantané du Mode Canapé au Mode Lit 2 Personnes
                </p>
                <p className="text-xs text-stone-300 mt-1 max-w-md">
                  Architecture 100% Mousse Haute Résilience sans aucun levier métallique.
                  Dépliez sans effort en moins de 3 secondes !
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Compris, retourner à la commande
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

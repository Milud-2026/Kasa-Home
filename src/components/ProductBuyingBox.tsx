import React, { useState } from 'react';
import { Star, Shield, Truck, RotateCcw, Clock, CheckCircle2, MessageCircle, ArrowRight, Zap, Gift } from 'lucide-react';
import { ColorOption, DimensionOption, OrderDetails } from '../types';
import { MOROCCAN_CITIES } from '../data/productData';
import { useStore } from '../context/StoreContext';

interface ProductBuyingBoxProps {
  colors: ColorOption[];
  dimensions: DimensionOption[];
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
  selectedDimension: DimensionOption;
  onSelectDimension: (dim: DimensionOption) => void;
  onOrderSubmit: (order: OrderDetails) => void;
  onScrollToReviews: () => void;
}

export const ProductBuyingBox: React.FC<ProductBuyingBoxProps> = ({
  colors,
  dimensions,
  selectedColor,
  onSelectColor,
  selectedDimension,
  onSelectDimension,
  onOrderSubmit,
  onScrollToReviews,
}) => {
  const { selectedProduct, addOrder, settings } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const totalPrice = selectedDimension.price * quantity;
  const originalTotalPrice = selectedDimension.originalPrice * quantity;
  const savings = originalTotalPrice - totalPrice;

  const handleCitySelect = (c: string) => {
    setCity(c);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setValidationError('Veuillez saisir votre nom et prénom.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setValidationError('Veuillez saisir un numéro de téléphone valide (ex: 0661234567).');
      return;
    }
    if (!address.trim()) {
      setValidationError('Veuillez préciser votre adresse de livraison.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    const newOrder = addOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      city,
      address: address.trim(),
      note: note.trim(),
      productName: selectedProduct.name,
      color: selectedColor.name,
      dimension: selectedDimension.name,
      quantity,
      totalPrice,
    });

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newOrder,
          productName: selectedProduct.name,
        }),
      });
    } catch (err) {
      console.error('Error sending order email notification:', err);
    }

    setIsSubmitting(false);
    onOrderSubmit({
      ...newOrder,
      productName: selectedProduct.name,
    });
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Bonjour Kasa & Home ! Je souhaite commander le produit : ${selectedProduct.name}
- Option / Format : ${selectedDimension.name}
- Couleur : ${selectedColor.name}
- Quantité : ${quantity}
- Prix Total : ${totalPrice.toLocaleString('fr-FR')} DH (Paiement à la livraison)
Merci de me contacter pour valider la livraison !`
    );
    window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-5 bg-white p-5 sm:p-7 rounded-2xl border border-stone-200/80 shadow-xs">
      {/* Brand & Title */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
            Kasa & Home • Collection Maison 2026
          </span>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            En Stock - Expédié sous 24h
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A231F] tracking-tight">
          {selectedProduct.name}
        </h1>

        {/* Rating Summary */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <button
            onClick={onScrollToReviews}
            className="text-xs text-stone-600 hover:text-amber-900 underline font-medium"
          >
            4.8 / 5.0 (13 avis clients vérifiés)
          </button>
        </div>
      </div>

      {/* Price Banner */}
      <div className="bg-gradient-to-r from-[#2A231F] to-[#3D322B] text-white p-4 sm:p-5 rounded-xl shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-baseline justify-between gap-2 relative z-10">
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif">
                {totalPrice.toLocaleString('fr-FR')} DH
              </span>
              <span className="text-stone-400 line-through text-sm sm:text-base">
                {originalTotalPrice.toLocaleString('fr-FR')} DH
              </span>
            </div>
            <p className="text-[11px] text-amber-100/90 mt-0.5">
              Prix TTC avec livraison disponible partout au Maroc
            </p>
          </div>

          <div className="bg-amber-500 text-stone-950 font-black text-xs px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1">
            <span>ÉCONOMISEZ {savings.toLocaleString('fr-FR')} DH</span>
            <span className="bg-stone-950 text-amber-400 px-1.5 py-0.2 rounded text-[10px] font-mono">
              -27%
            </span>
          </div>
        </div>

        {/* Stock Urgency Indicator */}
        <div className="mt-3 pt-3 border-t border-stone-700/80 flex items-center justify-between text-xs text-stone-300">
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold animate-pulse">
            <Zap className="w-4 h-4 fill-amber-400" />
            Plus que 4 unités disponibles au tarif promo !
          </span>
          <span className="text-[11px] text-stone-400 hidden sm:inline">Offre limitée</span>
        </div>
      </div>

      {/* 1. Select Color Swatches */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
            1. Choisissez la Couleur : <span className="text-amber-900 font-semibold">{selectedColor.name}</span>
          </label>
          <span className="text-[11px] text-stone-500 font-medium">Tissu Bouclé Premium Anti-taches</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {colors.map((c) => {
            const isSelected = c.id === selectedColor.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectColor(c)}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  isSelected
                    ? 'border-amber-800 bg-amber-50/50 ring-2 ring-amber-800/20 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <span
                  className="w-6 h-6 rounded-full border border-black/10 shrink-0 shadow-xs"
                  style={{ backgroundColor: c.colorCode }}
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-stone-900 truncate">{c.name.split(' ')[0]}</p>
                  <p className="text-[10px] text-stone-500 truncate">{c.tagline?.split(' ')[0] || 'Bouclé'}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Select Dimensions / Size */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
            2. Choisissez le Format / Dimensions :
          </label>
        </div>

        <div className="flex flex-col gap-2">
          {dimensions.map((d) => {
            const isSelected = d.id === selectedDimension.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => onSelectDimension(d)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                  isSelected
                    ? 'border-amber-800 bg-amber-50/60 ring-2 ring-amber-800/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-amber-800 bg-amber-800' : 'border-stone-300'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">{d.name}</span>
                      {d.popular && (
                        <span className="bg-amber-800 text-amber-100 text-[10px] font-bold px-2 py-0.2 rounded-full">
                          ⭐ Plus populaire
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {d.sofaDimensions} {d.bedDimensions ? `• ${d.bedDimensions}` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-stone-900">{d.price.toLocaleString('fr-FR')} DH</span>
                  <span className="block text-[10px] text-stone-400 line-through">
                    {d.originalPrice.toLocaleString('fr-FR')} DH
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between pt-1">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Quantité :</label>
        <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1.5 text-stone-700 hover:bg-stone-200 font-bold transition-colors"
          >
            -
          </button>
          <span className="px-4 py-1.5 font-bold text-sm text-stone-900 bg-white border-x border-stone-200">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1.5 text-stone-700 hover:bg-stone-200 font-bold transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* 3. Express COD Form */}
      <form
        onSubmit={handleSubmitOrder}
        className="mt-2 bg-gradient-to-b from-amber-50/70 to-stone-50 p-4 sm:p-5 rounded-2xl border-2 border-amber-800/30 flex flex-col gap-3 shadow-xs"
      >
        <div className="flex items-center gap-2 pb-2 border-b border-amber-200/80">
          <Gift className="w-5 h-5 text-amber-800 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
              Commander en 30 secondes (Paiement à la livraison)
            </h3>
            <p className="text-[11px] text-stone-600">
              Remplissez le formulaire ci-dessous. Notre équipe vous appelle pour confirmer !
            </p>
          </div>
        </div>

        {validationError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-2.5 rounded-lg font-medium">
            ⚠️ {validationError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              Nom et Prénom *
            </label>
            <input
              type="text"
              placeholder="ex: Youssef Benani"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              Téléphone (Maroc) *
            </label>
            <input
              type="tel"
              placeholder="ex: 06 61 23 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white"
            />
          </div>
        </div>

        {/* Quick City Pills */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 mb-1">
            Ville de livraison *
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {MOROCCAN_CITIES.slice(0, 6).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleCitySelect(c)}
                className={`text-[11px] px-2.5 py-1 rounded-full border font-medium transition-all ${
                  city === c
                    ? 'bg-amber-900 text-amber-100 border-amber-900 font-bold'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white font-medium text-stone-800"
          >
            {MOROCCAN_CITIES.map((c) => (
              <option key={c} value={c}>
                {c} {c === 'Casablanca' || c === 'Rabat' ? '(Livraison Express 24h)' : '(Livraison 3-5 jours)'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-700 mb-1">
            Adresse complète de livraison *
          </label>
          <textarea
            rows={2}
            placeholder="ex: Quartier Gauthier, Rue Molière, Appt 4..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white resize-none"
          />
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-sm sm:text-base cursor-pointer"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Validation de votre commande...
            </span>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-200" />
              <span>COMMANDER MAINTENANT (PAIEMENT À LA LIVRAISON)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Secondary WhatsApp Button */}
        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold py-2.5 px-4 rounded-xl border border-emerald-300 transition-colors flex items-center justify-center gap-2 text-xs"
        >
          <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-700" />
          <span>Commander rapidement par WhatsApp 💬</span>
        </button>
      </form>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-stone-700">
        <div className="flex items-center gap-2 text-[11px] font-medium">
          <Truck className="w-4 h-4 text-amber-800 shrink-0" />
          <span>Livraison offerte partout au Maroc</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium">
          <Shield className="w-4 h-4 text-amber-800 shrink-0" />
          <span>Garantie 10 Ans sur la Mousse HR</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium col-span-2 sm:col-span-1">
          <RotateCcw className="w-4 h-4 text-amber-800 shrink-0" />
          <span>30 jours satisfait ou remboursé</span>
        </div>
      </div>
    </div>
  );
};

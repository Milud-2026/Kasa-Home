import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-900" />
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Mon Panier ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-amber-50 p-3.5 border-b border-amber-200/80 text-xs text-amber-950">
            <div className="flex items-center justify-between font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-800" />
                {remainingForFreeShipping === 0
                  ? '🎉 Félicitations ! Vous bénéficiez de la livraison GRATUITE'
                  : `Plus que ${remainingForFreeShipping.toLocaleString('fr-FR')} DH pour la livraison offerte !`}
              </span>
            </div>
            <div className="w-full h-2 bg-amber-200/80 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-amber-800 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 divide-y divide-stone-100">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-stone-300" />
                </div>
                <p className="font-serif font-bold text-base text-stone-800">Votre panier est vide</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Découvrez la collection Canapé-Lit Comfy et profitez du paiement à la livraison.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.productId} className="pt-4 first:pt-0 flex gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif font-bold text-sm text-stone-900">{item.productName}</h3>
                        <button
                          onClick={() => onRemoveItem(item.productId)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {item.dimension.name.split(' ')[0]} • <span className="text-amber-900 font-semibold">{item.color.name}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, -1)}
                          className="px-2 py-0.5 text-stone-700 hover:bg-stone-200 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-stone-900 bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, 1)}
                          className="px-2 py-0.5 text-stone-700 hover:bg-stone-200 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif font-bold text-stone-900 text-sm">
                        {(item.unitPrice * item.quantity).toLocaleString('fr-FR')} DH
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 flex flex-col gap-3">
              <div className="flex items-center justify-between text-stone-900">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Total Produit :</span>
                <span className="font-serif text-xl font-extrabold text-amber-900">
                  {subtotal.toLocaleString('fr-FR')} DH
                </span>
              </div>

              <p className="text-[11px] text-stone-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Livraison partout au Maroc avec option d'essayage à domicile.</span>
              </p>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>VALIDER LA COMMANDER (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

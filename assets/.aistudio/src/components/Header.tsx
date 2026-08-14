import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Phone, ShieldCheck, Truck, RefreshCw, Heart, Lock, LayoutGrid, Info, HelpCircle, FileText, Settings } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onScrollToReviews?: () => void;
  onScrollToOrder?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
}) => {
  const { currentRoute, setCurrentRoute, settings } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(1);

  // Promo Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 42, seconds: 15 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 3, minutes: 45, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (val: number) => String(val).padStart(2, '0');

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'catalog', label: 'Catalogue Objets & Déco' },
    { id: 'about', label: 'À Propos' },
    { id: 'contact', label: 'Contact' },
    { id: 'shipping', label: 'Livraison' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs transition-all duration-200">
      {/* Top Announcement Bar */}
      <div className="bg-[#2A231F] text-amber-50 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <Truck className="w-3.5 h-3.5" />
              {settings.freeShippingText}
            </span>
            <span className="hidden md:inline-block text-stone-500">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Paiement à la livraison (Cash On Delivery)
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px]">
            <div className="flex items-center gap-1 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800/40">
              <span className="text-amber-300 font-semibold">Offre Limité :</span>
              <span className="font-mono text-amber-100 font-bold">
                {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
              </span>
            </div>
            <a
              href={`tel:${settings.supportPhone}`}
              className="hidden sm:flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{settings.supportPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`border-b border-stone-100 transition-all ${isScrolled ? 'py-2.5' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-amber-900 rounded-lg hover:bg-stone-100"
            aria-label="Menu Mobile"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div
            onClick={() => setCurrentRoute('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#2A231F] to-[#433730] flex items-center justify-center text-amber-400 shadow-sm group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2A231F] leading-none">
                KASA & HOME
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-medium text-amber-800">
                Objets & Déco Pour La Maison
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentRoute(item.id as any)}
                className={`transition-colors py-1 ${
                  currentRoute === item.id
                    ? 'text-amber-900 font-bold border-b-2 border-amber-800'
                    : 'hover:text-amber-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-amber-900 hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-stone-900 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-amber-950 transition-all shadow-sm active:scale-95"
              aria-label="Panier"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-stone-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline">Mon Panier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white px-4 py-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2 font-medium text-stone-800 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentRoute(item.id as any);
                }}
                className={`p-2.5 rounded-xl text-left transition-colors flex items-center justify-between ${
                  currentRoute === item.id ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-stone-50'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

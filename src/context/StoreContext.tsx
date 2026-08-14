import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, OrderDetails, Review, SiteSettings, PageRoute, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_SETTINGS } from '../data/initialCatalog';
import { PRODUCT_REVIEWS } from '../data/productData';

interface StoreContextType {
  products: Product[];
  categories: string[];
  orders: OrderDetails[];
  reviews: Review[];
  settings: SiteSettings;
  currentRoute: PageRoute;
  selectedProductId: string;
  selectedProduct: Product;
  isAdminAuthenticated: boolean;
  setCurrentRoute: (route: PageRoute) => void;
  setSelectedProductId: (id: string) => void;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  
  // Category CRUD
  addCategory: (name: string) => void;
  updateCategory: (oldName: string, newName: string) => void;
  deleteCategory: (name: string) => void;

  // Product CRUD
  addProduct: (newProd: Omit<Product, 'id'>) => void;
  updateProduct: (prod: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Order CRUD & Status
  addOrder: (order: Omit<OrderDetails, 'orderId' | 'date' | 'status'>) => OrderDetails;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  
  // Review Management
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  updateReviewStatus: (id: string, status: 'Approved' | 'Pending' | 'Hidden') => void;
  deleteReview: (id: string) => void;
  
  // Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  
  // Quick Reset
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default Categories List
  const DEFAULT_CATEGORIES = [
    'Déco & Sculptures',
    'Luminaires & Éclairage',
    'Cuisine & Table',
    'Rangement & Organisation',
    'Linge de Maison',
    'Mobilier & Assises',
    'Accessoires & Senteurs'
  ];

  // 1. Categories State
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('mh_categories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_CATEGORIES;
  });

  // 2. Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mh_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Orders State
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    const saved = localStorage.getItem('mh_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  // 3. Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('mh_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return PRODUCT_REVIEWS.map(r => ({ ...r, status: 'Approved' as const }));
  });

  // 4. Site Settings State
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('mh_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SETTINGS;
  });

  // 5. Page Navigation & Admin Auth State
  const parseInitialRouteAndAuth = (): { route: PageRoute; auth: boolean } => {
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    const savedAuth = sessionStorage.getItem('kh_admin_auth') === 'true';

    // Check if admin is requested in hash (#admin), search (?admin or ?page=admin), or pathname (/admin)
    const isAdminRequested =
      hash.includes('admin') ||
      search.includes('admin') ||
      search.includes('page=admin') ||
      pathname.endsWith('/admin');

    if (isAdminRequested) {
      // Auto-authenticate if admin URL is accessed directly
      sessionStorage.setItem('kh_admin_auth', 'true');
      return { route: 'admin', auth: true };
    }

    if (hash.includes('catalog') || search.includes('catalog')) return { route: 'catalog', auth: savedAuth };
    if (hash.includes('product') || search.includes('product')) return { route: 'product', auth: savedAuth };
    if (hash.includes('about') || search.includes('about')) return { route: 'about', auth: savedAuth };
    if (hash.includes('contact') || search.includes('contact')) return { route: 'contact', auth: savedAuth };
    if (hash.includes('shipping') || search.includes('shipping')) return { route: 'shipping', auth: savedAuth };
    if (hash.includes('faq') || search.includes('faq')) return { route: 'faq', auth: savedAuth };

    return { route: 'home', auth: savedAuth };
  };

  const initialRouteObj = parseInitialRouteAndAuth();
  const [currentRoute, setCurrentRouteState] = useState<PageRoute>(initialRouteObj.route);
  const [selectedProductId, setSelectedProductId] = useState<string>('vase-sculptural-nude');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(initialRouteObj.auth);

  const setCurrentRoute = (route: PageRoute) => {
    setCurrentRouteState(route);
    if (route === 'admin') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('kh_admin_auth', 'true');
    }
    if (window.location.hash !== `#${route}`) {
      window.location.hash = `#${route}`;
    }
  };

  // Sync route on hash change or query param change
  useEffect(() => {
    const handleLocationSync = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      if (hash.includes('admin') || search.includes('admin') || search.includes('page=admin') || pathname.endsWith('/admin')) {
        setIsAdminAuthenticated(true);
        sessionStorage.setItem('kh_admin_auth', 'true');
        setCurrentRouteState('admin');
      } else if (hash.includes('catalog') || search.includes('catalog')) {
        setCurrentRouteState('catalog');
      } else if (hash.includes('product') || search.includes('product')) {
        setCurrentRouteState('product');
      } else if (hash.includes('about') || search.includes('about')) {
        setCurrentRouteState('about');
      } else if (hash.includes('contact') || search.includes('contact')) {
        setCurrentRouteState('contact');
      } else if (hash.includes('shipping') || search.includes('shipping')) {
        setCurrentRouteState('shipping');
      } else if (hash.includes('faq') || search.includes('faq')) {
        setCurrentRouteState('faq');
      } else if (hash.includes('home') || search.includes('home')) {
        setCurrentRouteState('home');
      }
    };

    window.addEventListener('hashchange', handleLocationSync);
    window.addEventListener('popstate', handleLocationSync);
    return () => {
      window.removeEventListener('hashchange', handleLocationSync);
      window.removeEventListener('popstate', handleLocationSync);
    };
  }, []);

  const loginAdmin = (_pass: string): boolean => {
    // Always grant access to admin
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('kh_admin_auth', 'true');
    return true;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('kh_admin_auth');
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mh_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('mh_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mh_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mh_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('mh_settings', JSON.stringify(settings));
  }, [settings]);

  // Derived selected product
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0] || INITIAL_PRODUCTS[0];

  // Category CRUD
  const addCategory = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      setCategories(prev => [...prev, trimmed]);
    }
  };

  const updateCategory = (oldName: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed || oldName === trimmed) return;

    setCategories(prev => prev.map(c => c === oldName ? trimmed : c));

    // Update products using the old category name
    setProducts(prevProds => prevProds.map(p => {
      if (p.category === oldName) {
        return { ...p, category: trimmed };
      }
      return p;
    }));
  };

  const deleteCategory = (name: string) => {
    setCategories(prev => prev.filter(c => c !== name));

    // Reassign products in deleted category to fallback category or first remaining category
    setProducts(prevProds => prevProds.map(p => {
      if (p.category === name) {
        return { ...p, category: 'Autres' };
      }
      return p;
    }));
  };

  // Helper actions
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = newProd.slug || `prod-${Date.now()}`;
    const productWithId: Product = { ...newProd, id };
    setProducts(prev => [productWithId, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = (orderData: Omit<OrderDetails, 'orderId' | 'date' | 'status'>): OrderDetails => {
    const orderId = `MH-${Math.floor(10000 + Math.random() * 90000)}`;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newOrder: OrderDetails = {
      ...orderData,
      orderId,
      date: dateStr,
      status: 'Pending',
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status } : o));
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.orderId !== orderId));
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Aujourd\'hui',
      helpfulCount: 0,
      status: 'Approved',
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const updateReviewStatus = (id: string, status: 'Approved' | 'Pending' | 'Hidden') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setCategories(DEFAULT_CATEGORIES);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setReviews(PRODUCT_REVIEWS.map(r => ({ ...r, status: 'Approved' as const })));
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem('mh_categories');
    localStorage.removeItem('mh_products');
    localStorage.removeItem('mh_orders');
    localStorage.removeItem('mh_reviews');
    localStorage.removeItem('mh_settings');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        reviews,
        settings,
        currentRoute,
        selectedProductId,
        selectedProduct,
        isAdminAuthenticated,
        setCurrentRoute,
        setSelectedProductId,
        loginAdmin,
        logoutAdmin,
        addCategory,
        updateCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        addReview,
        updateReviewStatus,
        deleteReview,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

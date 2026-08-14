import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ProductGallery } from './components/ProductGallery';
import { ProductBuyingBox } from './components/ProductBuyingBox';
import { ModeInteractivePreview } from './components/ModeInteractivePreview';
import { ValueProps } from './components/ValueProps';
import { ProductTabs } from './components/ProductTabs';
import { CustomerReviews } from './components/CustomerReviews';
import { FAQSection } from './components/FAQSection';
import { RelatedProducts } from './components/RelatedProducts';
import { StickyPurchaseBar } from './components/StickyPurchaseBar';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ShippingPage } from './pages/ShippingPage';
import { FAQPage } from './pages/FAQPage';
import { AdminPage } from './pages/AdminPage';

import {
  PRODUCT_COLORS,
  PRODUCT_DIMENSIONS,
  PRODUCT_GALLERY_IMAGES,
  PRODUCT_FAQS,
  RELATED_PRODUCTS,
} from './data/productData';

import { ColorOption, DimensionOption, OrderDetails, CartItem, RelatedProduct } from './types';

function StoreApp() {
  const { currentRoute, selectedProduct, setSelectedProductId, setCurrentRoute, reviews, addReview } = useStore();

  // Active Color Selection
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    selectedProduct.colors && selectedProduct.colors.length > 0
      ? selectedProduct.colors[0]
      : PRODUCT_COLORS[0]
  );

  // Active Dimensions Selection
  const [selectedDimension, setSelectedDimension] = useState<DimensionOption>(
    selectedProduct.dimensions && selectedProduct.dimensions.length > 0
      ? selectedProduct.dimensions[0]
      : {
          id: 'dim-std',
          name: 'Taille Standard',
          subtitle: 'Format unique',
          sofaDimensions: 'Standard',
          bedDimensions: '',
          price: selectedProduct.price,
          originalPrice: selectedProduct.originalPrice,
          popular: true,
        }
  );

  // Keep color and dimension in sync when selectedProduct changes
  React.useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.colors && selectedProduct.colors.length > 0) {
        setSelectedColor(selectedProduct.colors[0]);
      } else {
        setSelectedColor({
          id: 'default-color',
          name: 'Standard',
          colorCode: '#D4A373',
          image: selectedProduct.images?.[0] || '',
          tagline: 'Finition naturelle',
        });
      }

      if (selectedProduct.dimensions && selectedProduct.dimensions.length > 0) {
        setSelectedDimension(selectedProduct.dimensions[0]);
      } else {
        setSelectedDimension({
          id: 'default-dim',
          name: 'Format Unique',
          subtitle: 'Dimensions standards',
          sofaDimensions: 'Standard',
          bedDimensions: '',
          price: selectedProduct.price,
          originalPrice: selectedProduct.originalPrice,
          popular: true,
        });
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct.id]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      productId: 'comfy-default',
      productName: 'Canapé-Lit Comfy',
      color: PRODUCT_COLORS[0],
      dimension: PRODUCT_DIMENSIONS[1],
      quantity: 1,
      unitPrice: PRODUCT_DIMENSIONS[1].price,
      image: PRODUCT_COLORS[0].image,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Order Confirmation Modal State
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Scroll Helpers
  const scrollToReviews = () => {
    const el = document.getElementById('reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToOrderForm = () => {
    const el = document.getElementById('product-main');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Order Submission Handler
  const handleOrderSubmit = (order: OrderDetails) => {
    setCompletedOrder(order);
  };

  // Cart Item Handlers
  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Quick Add Related Product to Cart
  const handleQuickAddRelated = (prod: RelatedProduct) => {
    const cartId = `related-${prod.id}`;
    const existing = cartItems.find((i) => i.productId === cartId);
    if (existing) {
      handleUpdateCartQuantity(cartId, 1);
    } else {
      const newItem: CartItem = {
        productId: cartId,
        productName: prod.name,
        color: PRODUCT_COLORS[0],
        dimension: PRODUCT_DIMENSIONS[0],
        quantity: 1,
        unitPrice: prod.price,
        image: prod.image,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    setIsCartOpen(true);
  };

  const handleSelectColorByName = (colorName: string) => {
    const matched = PRODUCT_COLORS.find(
      (c) => c.name.toLowerCase().includes(colorName.toLowerCase()) || colorName.toLowerCase().includes(c.name.toLowerCase())
    );
    if (matched) {
      setSelectedColor(matched);
      setCurrentRoute('product');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans antialiased flex flex-col justify-between selection:bg-amber-200 selection:text-amber-950">
      <div>
        {/* Header Navigation */}
        <Header
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onScrollToReviews={scrollToReviews}
          onScrollToOrder={scrollToOrderForm}
        />

        {/* Breadcrumb Path (Hidden on Home and Admin) */}
        {currentRoute !== 'home' && currentRoute !== 'admin' && <Breadcrumbs />}

        {/* ROUTE RENDERING */}
        {currentRoute === 'home' && <HomePage />}
        {currentRoute === 'catalog' && <CatalogPage />}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'contact' && <ContactPage />}
        {currentRoute === 'shipping' && <ShippingPage />}
        {currentRoute === 'faq' && <FAQPage />}
        {currentRoute === 'admin' && <AdminPage />}

        {currentRoute === 'product' && (
          <main id="product-main" className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Col: Product Gallery */}
              <div className="lg:col-span-6 lg:sticky lg:top-24">
                <ProductGallery
                  galleryImages={
                    selectedProduct.images && selectedProduct.images.length > 0
                      ? selectedProduct.images.map((img, idx) => ({
                          src: img,
                          alt: `${selectedProduct.name} - Vue ${idx + 1}`,
                          title: `${selectedProduct.name}`,
                        }))
                      : PRODUCT_GALLERY_IMAGES
                  }
                  selectedColor={selectedColor}
                />
              </div>

              {/* Right Col: Product Buying Box */}
              <div className="lg:col-span-6">
                <ProductBuyingBox
                  colors={selectedProduct.colors && selectedProduct.colors.length > 0 ? selectedProduct.colors : PRODUCT_COLORS}
                  dimensions={selectedProduct.dimensions && selectedProduct.dimensions.length > 0 ? selectedProduct.dimensions : PRODUCT_DIMENSIONS}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                  selectedDimension={selectedDimension}
                  onSelectDimension={setSelectedDimension}
                  onOrderSubmit={handleOrderSubmit}
                  onScrollToReviews={scrollToReviews}
                />
              </div>
            </div>

            {/* 4 Value Pillars */}
            <ValueProps />

            {/* Interactive 3-in-1 Transformation Mode Preview (For seating/furniture) */}
            {(selectedProduct.id === 'canape-lit-comfy' || (selectedProduct.category === 'Mobilier & Assises' && selectedProduct.dimensions?.some(d => d.bedDimensions && d.bedDimensions.toLowerCase().includes('couchage')))) && (
              <ModeInteractivePreview />
            )}

            {/* Specifications & Technical Details Tabs */}
            <ProductTabs />

            {/* Customer Reviews Section */}
            <CustomerReviews
              reviews={reviews}
              onAddReview={(newRev) => addReview(newRev)}
            />

            {/* FAQ Accordions Section */}
            <FAQSection faqs={PRODUCT_FAQS} />

            {/* Related Products Slider */}
            <RelatedProducts
              products={RELATED_PRODUCTS}
              onQuickAdd={handleQuickAddRelated}
            />
          </main>
        )}
      </div>

      {/* Floating Sticky Bottom Purchase Bar (Product page only) */}
      {currentRoute === 'product' && (
        <StickyPurchaseBar
          selectedColor={selectedColor}
          selectedDimension={selectedDimension}
          onScrollToOrderForm={scrollToOrderForm}
        />
      )}

      {/* Order Confirmation Celebratory Modal */}
      {completedOrder && (
        <OrderConfirmationModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentRoute('product');
          setTimeout(() => scrollToOrderForm(), 100);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectColor={handleSelectColorByName}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}


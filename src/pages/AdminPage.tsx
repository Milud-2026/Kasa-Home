import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, OrderDetails, OrderStatus, Review, SiteSettings, ColorOption, DimensionOption } from '../types';
import {
  Package,
  ShoppingBag,
  MessageCircle,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Phone,
  MapPin,
  Tag,
  Copy,
  ExternalLink,
  Link,
  Upload,
  Image as ImageIcon,
  FolderTree,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

// Multi-Photo Manager Component for File Uploads & Gallery
const ProductPhotoManager: React.FC<{
  images: string[];
  onChangeImages: (newImages: string[]) => void;
  showToast: (msg: string) => void;
}> = ({ images, onChangeImages, showToast }) => {
  const [urlInput, setUrlInput] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const promises = fileList.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(base64Imgs => {
      onChangeImages([...images, ...base64Imgs]);
      showToast(`${base64Imgs.length} photo(s) chargée(s) avec succès !`);
    }).catch(err => {
      console.error(err);
      showToast('Erreur lors du chargement des images');
    });

    e.target.value = '';
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onChangeImages([...images, urlInput.trim()]);
    setUrlInput('');
    showToast('Photo ajoutée par URL !');
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const newImgs = [...images];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImgs.length) return;
    const temp = newImgs[index];
    newImgs[index] = newImgs[targetIndex];
    newImgs[targetIndex] = temp;
    onChangeImages(newImgs);
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const newImgs = [...images];
    const [selected] = newImgs.splice(index, 1);
    newImgs.unshift(selected);
    onChangeImages(newImgs);
    showToast('Photo définie comme couverture principale !');
  };

  const handleRemove = (index: number) => {
    if (images.length <= 1) {
      if (!window.confirm('Voulez-vous vraiment supprimer la seule photo ?')) return;
    }
    const newImgs = images.filter((_, i) => i !== index);
    onChangeImages(newImgs);
    showToast('Photo supprimée');
  };

  return (
    <div className="space-y-4 bg-stone-50/80 p-4 rounded-2xl border border-stone-200">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-amber-600" />
          <span>Photos du Produit ({images.length})</span>
        </label>
        <span className="text-[11px] text-stone-500 font-medium">Formats : JPG, PNG, WEBP, GIF, Fichiers locaux</span>
      </div>

      {/* Upload Zone & URL Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Local File Picker */}
        <label className="border-2 border-dashed border-stone-300 hover:border-amber-500 bg-white hover:bg-amber-50/40 rounded-xl p-4 transition-all flex flex-col items-center justify-center cursor-pointer text-center group">
          <Upload className="w-6 h-6 text-stone-400 group-hover:text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-stone-800 text-xs group-hover:text-amber-700">
            Téléverser 1 ou plusieurs photos
          </span>
          <span className="text-[10px] text-stone-500 mt-0.5">
            Sélectionnez directement vos fichiers d'images
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Add URL */}
        <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col justify-between space-y-2">
          <span className="font-bold text-stone-700 text-xs">Ou ajouter via une URL Web :</span>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs shrink-0 cursor-pointer"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {images.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-bold text-stone-600 block">Galerie active (la 1ère photo est l'image principale) :</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`relative bg-white rounded-xl overflow-hidden border ${
                  idx === 0 ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-stone-200'
                } shadow-sm group flex flex-col`}
              >
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={img}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {idx === 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-amber-500 text-stone-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow">
                      Couverture
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow transition-all cursor-pointer opacity-90"
                    title="Supprimer la photo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2 bg-stone-50 flex items-center justify-between gap-1 text-[10px] border-t border-stone-100">
                  {idx !== 0 ? (
                    <button
                      type="button"
                      onClick={() => handleSetCover(idx)}
                      className="text-amber-700 hover:underline font-bold cursor-pointer"
                    >
                      Couverture
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-bold">Principale</span>
                  )}

                  <div className="flex items-center gap-1">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleMove(idx, 'left')}
                        className="p-1 hover:bg-stone-200 rounded text-stone-700 font-bold cursor-pointer"
                        title="Placer avant"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    )}
                    {idx < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleMove(idx, 'right')}
                        className="p-1 hover:bg-stone-200 rounded text-stone-700 font-bold cursor-pointer"
                        title="Placer après"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminPage: React.FC = () => {
  const {
    products,
    categories,
    orders,
    reviews,
    settings,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    deleteOrder,
    updateReviewStatus,
    deleteReview,
    addReview,
    updateSettings,
    resetToDefaults,
    setCurrentRoute,
    setSelectedProductId
  } = useStore();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin('ADMIN');
    setLoginError('');
    setPasswordInput('');
  };

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'reviews' | 'settings'>('products');

  // Category Management State
  const [newCatName, setNewCatName] = useState('');
  const [editingCatName, setEditingCatName] = useState<{ oldName: string; newName: string } | null>(null);
  const [quickCatName, setQuickCatName] = useState('');
  const [showQuickAddCat, setShowQuickAddCat] = useState(false);

  // Product Filter/Search
  const [productSearch, setProductSearch] = useState('');

  // Edit / Create Product Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // New Product Form State
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    slug: '',
    name: '',
    tagline: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: categories[0] || 'Déco & Sculptures',
    rating: 5.0,
    reviewsCount: 0,
    inStock: true,
    badge: 'NOUVEAU',
    isFeatured: true,
    isPopular: false,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'],
    colors: [
      { id: 'beige', name: 'Beige Bouclé', colorCode: '#E6DEC', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' }
    ],
    dimensions: [
      {
        id: 'duo',
        name: 'Modèle Duo (2 Personnes)',
        subtitle: 'Grand confort convertible',
        sofaDimensions: '200 cm x 90 cm',
        bedDimensions: '200 cm x 180 cm',
        price: 5490,
        originalPrice: 7500,
        popular: true
      }
    ]
  });

  // Orders Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // Manual Review Form State
  const [newReviewForm, setNewReviewForm] = useState({
    author: '',
    location: 'Casablanca',
    rating: 5,
    colorChosen: 'Beige Bouclé (Nude)',
    comment: ''
  });
  const [isAddingReview, setIsAddingReview] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPIs
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

  // Filtered lists
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter === 'All') return true;
    return o.status === orderStatusFilter;
  });

  // Handlers for Product Save
  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;
    const slug = productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addProduct({ ...productForm, slug });
    setIsCreatingProduct(false);
    showToast('Nouveau produit ajouté au catalogue avec succès !');
  };

  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
    showToast('Fiche produit mise à jour !');
  };

  const handleAddManualReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.author || !newReviewForm.comment) return;
    addReview({
      author: newReviewForm.author,
      location: newReviewForm.location,
      rating: newReviewForm.rating,
      colorChosen: newReviewForm.colorChosen,
      comment: newReviewForm.comment,
      verified: true
    });
    setNewReviewForm({ author: '', location: 'Casablanca', rating: 5, colorChosen: 'Beige Bouclé (Nude)', comment: '' });
    setIsAddingReview(false);
    showToast('Nouvel avis client ajouté !');
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-800 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
              <Settings className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">Espace Administration</h1>
            <p className="text-stone-500 text-xs leading-relaxed">
              Veuillez saisir le mot de passe administrateur pour accéder à la gestion du catalogue et des commandes.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Mot de Passe Admin
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Entrez le mot de passe..."
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-stone-50/50"
                autoFocus
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3.5 rounded-xl text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Accéder Directement Au Panneau Admin</span>
              <Check className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-stone-100 text-center">
            <span className="text-[11px] text-stone-400">
              Accès réservé • Mot de passe par défaut : <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-amber-800 font-bold">ADMIN</code>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-amber-400 font-semibold px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              ADMINISTRATION
            </span>
            <span className="text-stone-400 text-xs">Kasa & Home Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold mt-1 text-white">
            Panneau de Gestion E-Commerce
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            Gérez en temps réel vos objets, produits, prix, catégories, commandes COD et avis clients.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentRoute('home')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Voir le site public</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="bg-stone-800 hover:bg-red-900/40 text-stone-300 hover:text-red-300 border border-stone-700 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span>Déconnexion Admin</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Voulez-vous réinitialiser toutes les données aux valeurs par défaut ?')) {
                resetToDefaults();
                showToast('Données réinitialisées !');
              }
            }}
            className="bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700/50 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>

      {/* Direct Admin Link Access Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-500 text-stone-950 rounded-xl shrink-0 mt-0.5">
            <Link className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              Lien d'Accès Direct au Panneau de Contrôle
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Connexion Automatique
              </span>
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Ouvrez ou partagez cette URL pour accéder directement au panneau admin sans saisir de mot de passe :
            </p>
            <code className="text-xs font-mono font-bold text-amber-900 bg-amber-100/80 px-2 py-1 rounded border border-amber-200 mt-1.5 inline-block break-all">
              {window.location.origin + window.location.pathname + '#admin'}
            </code>
          </div>
        </div>

        <button
          onClick={() => {
            const adminUrl = window.location.origin + window.location.pathname + '#admin';
            navigator.clipboard.writeText(adminUrl);
            showToast('Lien direct d\'administration copié !');
          }}
          className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0 active:scale-95"
        >
          <Copy className="w-4 h-4" />
          <span>Copier le Lien Direct</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Revenu Total Estimé</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900">{totalRevenue.toLocaleString('fr-FR')} DH</div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Commandes COD actives
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Commandes Total</span>
            <ShoppingBag className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900">{orders.length}</div>
          <div className="text-[11px] text-amber-700 font-medium">
            {pendingOrdersCount} en attente de confirmation
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Produits au Catalogue</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900">{products.length}</div>
          <div className="text-[11px] text-stone-500">
            {products.filter(p => p.inStock).length} en stock
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Avis Clients</span>
            <MessageCircle className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900">{reviews.length}</div>
          <div className="text-[11px] text-stone-500">
            Note moyenne : 4.9 / 5
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'products'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Gestion des Produits ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <FolderTree className="w-4 h-4 text-amber-400" />
          <span>Catégories & Rayons ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Commandes COD ({orders.length})</span>
          {pendingOrdersCount > 0 && (
            <span className="bg-amber-500 text-stone-950 font-black text-[10px] px-2 py-0.5 rounded-full">
              {pendingOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Avis Clients ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Configuration du Site</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              onClick={() => setIsCreatingProduct(true)}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Produit</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-800">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="p-4">Produit</th>
                    <th className="p-4">Catégorie</th>
                    <th className="p-4">Prix</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Badge</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map(prod => (
                    <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-lg border border-stone-200 shrink-0"
                        />
                        <div>
                          <div 
                            onClick={() => { setSelectedProductId(prod.id); setCurrentRoute('product'); }}
                            className="font-bold text-stone-900 hover:text-amber-700 cursor-pointer"
                          >
                            {prod.name}
                          </div>
                          <div className="text-stone-400 text-[11px] line-clamp-1">{prod.tagline}</div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-stone-600">{prod.category}</td>
                      <td className="p-4">
                        <div className="font-bold text-stone-900">{prod.price.toLocaleString('fr-FR')} DH</div>
                        {prod.originalPrice > prod.price && (
                          <div className="text-[10px] text-stone-400 line-through">
                            {prod.originalPrice.toLocaleString('fr-FR')} DH
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            updateProduct({ ...prod, inStock: !prod.inStock });
                            showToast(`Stock mis à jour pour ${prod.name}`);
                          }}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                            prod.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {prod.inStock ? 'En Stock' : 'Rupture'}
                        </button>
                      </td>
                      <td className="p-4">
                        {prod.badge ? (
                          <span className="bg-stone-900 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                            {prod.badge}
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[10px]">-</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Éditer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Supprimer ${prod.name} ?`)) {
                              deleteProduct(prod.id);
                              showToast('Produit supprimé');
                            }
                          }}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES MANAGER */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          {/* Add Category Banner Form */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <FolderTree className="w-4.5 h-4.5 text-amber-600" />
                <span>Créer un Nouveau Rayon / Catégorie</span>
              </h3>
              <span className="text-[11px] text-stone-500 font-medium">Total : {categories.length} catégories</span>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!newCatName.trim()) return;
                addCategory(newCatName);
                showToast(`Catégorie "${newCatName.trim()}" créée avec succès !`);
                setNewCatName('');
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                required
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                placeholder="Ex: Tapis & Textiles, Art de la Table, Horloges..."
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-sm shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter la Catégorie</span>
              </button>
            </form>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(cat => {
              const prodCount = products.filter(p => p.category === cat).length;
              const isEditing = editingCatName?.oldName === cat;

              return (
                <div
                  key={cat}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors"
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-bold text-stone-500">Renommer la catégorie :</label>
                      <input
                        type="text"
                        value={editingCatName.newName}
                        onChange={e => setEditingCatName({ ...editingCatName, newName: e.target.value })}
                        className="w-full bg-stone-50 border border-amber-400 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-amber-500"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingCatName(null)}
                          className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                        >
                          Annuler
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (editingCatName.newName.trim()) {
                              updateCategory(cat, editingCatName.newName);
                              setEditingCatName(null);
                              showToast(`Catégorie modifiée en "${editingCatName.newName.trim()}"`);
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold cursor-pointer"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                            <FolderTree className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>{cat}</span>
                          </h4>
                          <p className="text-[11px] text-stone-500 font-medium">
                            {prodCount} produit{prodCount > 1 ? 's' : ''} en rayon
                          </p>
                        </div>
                        <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full shrink-0">
                          {prodCount}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setEditingCatName({ oldName: cat, newName: cat })}
                          className="text-stone-700 hover:text-amber-700 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Éditer le nom</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Supprimer la catégorie "${cat}" ? Les produits associés resteront accessibles.`)) {
                              deleteCategory(cat);
                              showToast(`Catégorie "${cat}" supprimée`);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGER */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-2">Filtrer par statut:</span>
            {['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
              <button
                key={st}
                onClick={() => setOrderStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  orderStatusFilter === st
                    ? 'bg-stone-900 text-white font-bold'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {st === 'All' ? 'Toutes' : st}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-800">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="p-4">N° Commande</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Ville & Adresse</th>
                    <th className="p-4">Produit Choisis</th>
                    <th className="p-4">Total DH</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-stone-500">
                        Aucune commande trouvée.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map(ord => (
                      <tr key={ord.orderId} className="hover:bg-stone-50/80 transition-colors">
                        <td className="p-4 font-bold text-stone-900">{ord.orderId}</td>
                        <td className="p-4">
                          <div className="font-bold text-stone-900">{ord.customerName}</div>
                          <div className="text-stone-500 text-[11px] flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>{ord.phone}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-amber-900">{ord.city}</div>
                          <div className="text-stone-500 text-[11px] line-clamp-1">{ord.address}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-stone-900">{ord.productName || 'Article Kasa & Home'}</div>
                          <div className="text-stone-600 font-medium text-[11px]">{ord.dimension} • {ord.color}</div>
                        </td>
                        <td className="p-4 font-bold text-stone-900">
                          {ord.totalPrice.toLocaleString('fr-FR')} DH
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={e => {
                              updateOrderStatus(ord.orderId, e.target.value as OrderStatus);
                              showToast(`Statut commande ${ord.orderId} -> ${e.target.value}`);
                            }}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border border-stone-200 focus:outline-none cursor-pointer ${
                              ord.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              ord.status === 'Delivered' ? 'bg-purple-100 text-purple-800' :
                              ord.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-amber-100 text-amber-800'
                            }`}
                          >
                            <option value="Pending">En Attente</option>
                            <option value="Confirmed">Confirmée</option>
                            <option value="Shipped">Expédiée</option>
                            <option value="Delivered">Livrée</option>
                            <option value="Cancelled">Annulée</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`Supprimer la commande ${ord.orderId} ?`)) {
                                deleteOrder(ord.orderId);
                                showToast('Commande supprimée');
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REVIEWS MODERATION */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-serif font-bold text-stone-900">Modération des Avis Clients ({reviews.length})</h2>
            <button
              onClick={() => setIsAddingReview(true)}
              className="bg-amber-500 text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un Avis Manuel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map(rev => (
              <div key={rev.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-900 text-sm">{rev.author}</div>
                    <div className="text-xs text-stone-500">{rev.location} - {rev.date}</div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>

                <p className="text-stone-700 text-xs italic leading-relaxed bg-stone-50 p-3 rounded-xl">
                  "{rev.comment}"
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
                  <span className="text-stone-500 text-[11px]">Couleur: {rev.colorChosen}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        deleteReview(rev.id);
                        showToast('Avis supprimé');
                      }}
                      className="text-red-600 hover:underline font-bold"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900">Configuration Générale de la Boutique</h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Bandeau d'Annonce Supérieur</label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={e => updateSettings({ announcementText: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Numéro WhatsApp Support</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={e => updateSettings({ whatsappNumber: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Téléphone Fixe Support</label>
                <input
                  type="text"
                  value={settings.supportPhone}
                  onChange={e => updateSettings({ supportPhone: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Support</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={e => updateSettings({ supportEmail: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Adresse Showroom / Siège</label>
                <input
                  type="text"
                  value={settings.storeAddress}
                  onChange={e => updateSettings({ storeAddress: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => showToast('Paramètres sauvegardés avec succès !')}
                className="bg-stone-900 text-white font-bold px-6 py-3 rounded-xl"
              >
                Sauvegarder les Paramètres
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW PRODUCT MODAL */}
      {isCreatingProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="text-xl font-serif font-bold text-stone-900">Créer un Nouveau Produit</h3>
              <button onClick={() => setIsCreatingProduct(false)} className="p-2 text-stone-400 hover:text-stone-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Nom du Produit *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Ex: Canapé Modulaire Nube"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Prix (DH) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Prix Rayé Original (DH)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={e => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Dynamic Category Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-stone-700">Catégorie / Rayon</label>
                  <button
                    type="button"
                    onClick={() => setShowQuickAddCat(!showQuickAddCat)}
                    className="text-amber-700 hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Créer nouvelle catégorie</span>
                  </button>
                </div>

                {showQuickAddCat ? (
                  <div className="flex gap-2 mb-2 bg-amber-50/50 p-2 rounded-xl border border-amber-200">
                    <input
                      type="text"
                      value={quickCatName}
                      onChange={e => setQuickCatName(e.target.value)}
                      placeholder="Nom de la nouvelle catégorie..."
                      className="flex-1 bg-white border border-amber-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (quickCatName.trim()) {
                          addCategory(quickCatName.trim());
                          setProductForm({ ...productForm, category: quickCatName.trim() });
                          setQuickCatName('');
                          setShowQuickAddCat(false);
                          showToast(`Catégorie "${quickCatName.trim()}" créée et sélectionnée !`);
                        }
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                    >
                      Créer
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuickAddCat(false)}
                      className="bg-stone-200 text-stone-700 font-bold px-2 py-1.5 rounded-lg text-xs cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description courte (Tagline)</label>
                <input
                  type="text"
                  value={productForm.tagline}
                  onChange={e => setProductForm({ ...productForm, tagline: e.target.value })}
                  placeholder="Ex: Tissu bouclé chic et convertible"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Multi-Photo Upload & Manager */}
              <ProductPhotoManager
                images={productForm.images}
                onChangeImages={imgs => setProductForm({ ...productForm, images: imgs })}
                showToast={showToast}
              />

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={e => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>En Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={e => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>Afficher sur la page d'accueil</span>
                </label>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingProduct(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold cursor-pointer hover:bg-stone-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold cursor-pointer"
                >
                  Enregistrer le Produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="text-xl font-serif font-bold text-stone-900">Éditer : {editingProduct.name}</h3>
              <button onClick={() => setEditingProduct(null)} className="p-2 text-stone-400 hover:text-stone-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Nom du Produit</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Prix (DH)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Prix Rayé (DH)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice}
                    onChange={e => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Dynamic Category Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-stone-700">Catégorie / Rayon</label>
                  <button
                    type="button"
                    onClick={() => setShowQuickAddCat(!showQuickAddCat)}
                    className="text-amber-700 hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Créer nouvelle catégorie</span>
                  </button>
                </div>

                {showQuickAddCat ? (
                  <div className="flex gap-2 mb-2 bg-amber-50/50 p-2 rounded-xl border border-amber-200">
                    <input
                      type="text"
                      value={quickCatName}
                      onChange={e => setQuickCatName(e.target.value)}
                      placeholder="Nom de la nouvelle catégorie..."
                      className="flex-1 bg-white border border-amber-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (quickCatName.trim()) {
                          addCategory(quickCatName.trim());
                          setEditingProduct({ ...editingProduct, category: quickCatName.trim() });
                          setQuickCatName('');
                          setShowQuickAddCat(false);
                          showToast(`Catégorie "${quickCatName.trim()}" créée et sélectionnée !`);
                        }
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                    >
                      Créer
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuickAddCat(false)}
                      className="bg-stone-200 text-stone-700 font-bold px-2 py-1.5 rounded-lg text-xs cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <select
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline}
                  onChange={e => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Badge (ex: BEST-SELLER, -25%)</label>
                <input
                  type="text"
                  value={editingProduct.badge || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Multi-Photo Upload & Manager */}
              <ProductPhotoManager
                images={editingProduct.images || []}
                onChangeImages={imgs => setEditingProduct({ ...editingProduct, images: imgs })}
                showToast={showToast}
              />

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock}
                    onChange={e => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>En Stock</span>
                </label>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold cursor-pointer hover:bg-stone-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold cursor-pointer"
                >
                  Mettre à Jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MANUAL REVIEW MODAL */}
      {isAddingReview && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-stone-900 text-base">Ajouter un Avis Client</h3>
              <button onClick={() => setIsAddingReview(false)} className="text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualReview} className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Nom du Client *</label>
                <input
                  type="text"
                  required
                  value={newReviewForm.author}
                  onChange={e => setNewReviewForm({ ...newReviewForm, author: e.target.value })}
                  placeholder="Ex: Salma Kettani"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Ville *</label>
                <input
                  type="text"
                  required
                  value={newReviewForm.location}
                  onChange={e => setNewReviewForm({ ...newReviewForm, location: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Avis / Commentaire *</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewForm.comment}
                  onChange={e => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingReview(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold"
                >
                  Publier l'Avis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

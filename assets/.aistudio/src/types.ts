export interface ColorOption {
  id: string;
  name: string;
  colorCode: string;
  image: string;
  tagline?: string;
}

export interface DimensionOption {
  id: string;
  name: string;
  subtitle: string;
  sofaDimensions: string;
  bedDimensions: string;
  price: number;
  originalPrice: number;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  colorChosen: string;
  comment: string;
  images?: string[];
  helpfulCount: number;
  status?: 'Approved' | 'Pending' | 'Hidden';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviewsCount: number;
  colorsCount: number;
  badge?: string;
}

export type HomeCategory = string;

export interface CategoryItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  category: HomeCategory;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  badge?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  images: string[];
  colors: ColorOption[];
  dimensions: DimensionOption[];
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  productName?: string;
  color: string;
  dimension: string;
  quantity: number;
  totalPrice: number;
  date: string;
  status: OrderStatus;
  items?: CartItem[];
}

export interface CartItem {
  productId: string;
  productName: string;
  color: ColorOption;
  dimension: DimensionOption;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface SiteSettings {
  announcementText: string;
  freeShippingText: string;
  whatsappNumber: string;
  supportPhone: string;
  supportEmail: string;
  promoEndsMinutes: number;
  storeAddress: string;
}

export type PageRoute = 
  | 'home' 
  | 'product' 
  | 'catalog' 
  | 'about' 
  | 'contact' 
  | 'shipping' 
  | 'faq' 
  | 'admin';


import { Product } from '../types';
import { PRODUCT_COLORS, PRODUCT_DIMENSIONS } from './productData';

import sofaBeige from '../assets/images/sofa_comfy_beige_1786357191090.jpg';
import sofaBedMode from '../assets/images/sofa_comfy_bed_mode_1786357206630.jpg';
import sofaOrange from '../assets/images/sofa_comfy_orange_1786357220372.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'vase-sculptural-nude',
    slug: 'vase-sculptural-nude',
    name: 'Vase Sculptural Céramique Nude',
    tagline: 'Design organique artisanal cuit au four haute température',
    description: 'Une pièce de décoration maîtresse pour votre table basse, buffet ou console d\'entrée. Façonné à la main en céramique mate aux tons sable chauds.',
    price: 390,
    originalPrice: 550,
    category: 'Déco & Sculptures',
    rating: 4.9,
    reviewsCount: 84,
    inStock: true,
    badge: 'BEST-SELLER',
    isFeatured: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: PRODUCT_COLORS.slice(0, 3),
    dimensions: [
      {
        id: 'dim-std',
        name: 'Taille Standard H32cm',
        subtitle: 'Diamètre 18cm',
        sofaDimensions: '32 cm x 18 cm',
        bedDimensions: 'Céramique mate',
        price: 390,
        originalPrice: 550,
        popular: true
      }
    ],
  },
  {
    id: 'lampe-champignon-led',
    slug: 'lampe-champignon-led',
    name: 'Lampe Champignon LED Tactile',
    tagline: 'Éclairage d\'ambiance sans fil rechargeable en métal brossé',
    description: 'Lampe à poser tactile avec 3 intensités lumineuses chaudes. Autonomie de 12 heures sur batterie lithium USB-C.',
    price: 650,
    originalPrice: 890,
    category: 'Luminaires & Éclairage',
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    badge: 'TENDANCE',
    isFeatured: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: PRODUCT_COLORS.slice(0, 4),
    dimensions: [
      {
        id: 'lamp-std',
        name: 'Modèle Sans Fil Rechargeable',
        subtitle: 'USB-C inclus',
        sofaDimensions: 'H28cm x D18cm',
        bedDimensions: 'Batterie 4000mAh',
        price: 650,
        originalPrice: 890,
        popular: true
      }
    ],
  },
  {
    id: 'service-cafe-artisanal',
    slug: 'service-cafe-artisanal',
    name: 'Service à Café Céramique (6 Pcs)',
    tagline: 'Vaisselle en grès émaillé fabriquée à la main',
    description: 'Sublimez vos moments café et thé. Ensemble de 6 tasses avec soucoupes en grès brut texturé et intérieur émaillé soyeux.',
    price: 480,
    originalPrice: 650,
    category: 'Cuisine & Table',
    rating: 4.8,
    reviewsCount: 46,
    inStock: true,
    badge: 'ARTISANAL',
    isFeatured: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: PRODUCT_COLORS.slice(0, 3),
    dimensions: [
      {
        id: 'set-6',
        name: 'Coffret 6 Tasses + Soucoupes',
        subtitle: 'Contenance 180ml',
        sofaDimensions: 'Grès émaillé',
        bedDimensions: 'Compatible lave-vaisselle',
        price: 480,
        originalPrice: 650,
        popular: true
      }
    ],
  },
  {
    id: 'panier-boucle-chenille',
    slug: 'panier-boucle-chenille',
    name: 'Panier de Rangement Bouclé',
    tagline: 'Organisation élégante pour plaids, magazines et jouets',
    description: 'Structure renforcée revêtue de tissu bouclé écru d\'une douceur remarquable. Idéal au pied du canapé ou dans la chambre.',
    price: 290,
    originalPrice: 420,
    category: 'Rangement & Organisation',
    rating: 4.9,
    reviewsCount: 61,
    inStock: true,
    badge: 'PRATIQUE',
    isFeatured: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: PRODUCT_COLORS.slice(0, 3),
    dimensions: [
      {
        id: 'panier-m',
        name: 'Format Medium 40x40cm',
        subtitle: 'Capacité 35L',
        sofaDimensions: '40cm x 40cm x 35cm',
        bedDimensions: 'Mousse et Tissu Bouclé',
        price: 290,
        originalPrice: 420,
        popular: true
      }
    ],
  },
  {
    id: 'plaid-moelleux-boucle',
    slug: 'plaid-moelleux-boucle',
    name: 'Plaid Laine & Bouclé Premium',
    tagline: 'Couverture douillette 150x200cm aux finitions frangées',
    description: 'Apportez de la chaleur et du relief à votre intérieur. Tissage dense haute qualité en mélange laine et fibres bouclées hypoallergéniques.',
    price: 550,
    originalPrice: 780,
    category: 'Linge de Maison',
    rating: 5.0,
    reviewsCount: 93,
    inStock: true,
    badge: 'COZY',
    isFeatured: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: PRODUCT_COLORS.slice(0, 4),
    dimensions: [
      {
        id: 'plaid-std',
        name: 'Grand Format 150 x 200 cm',
        subtitle: 'Toucher ultra doux',
        sofaDimensions: '150 cm x 200 cm',
        bedDimensions: 'Lavable à 30°C',
        price: 550,
        originalPrice: 780,
        popular: true
      }
    ],
  },
  {
    id: 'table-basse-travertin',
    slug: 'table-basse-travertin',
    name: 'Table Basse Organique Travertin',
    tagline: 'Pierre naturelle et piètement sculptural massif',
    description: 'Une pièce maîtresse architecturale. Plateau galet en véritable travertin naturel adouci, résistant aux taches et rayures.',
    price: 2490,
    originalPrice: 3500,
    category: 'Mobilier & Assises',
    rating: 4.9,
    reviewsCount: 37,
    inStock: true,
    badge: 'PREMIUM',
    isFeatured: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: PRODUCT_COLORS.slice(0, 2),
    dimensions: PRODUCT_DIMENSIONS.slice(0, 2),
  },
  {
    id: 'diffuseur-ambiance-ambre',
    slug: 'diffuseur-ambiance-ambre',
    name: 'Diffuseur d\'Ambiance Verre Ambré',
    tagline: 'Parfum de grasse (Bois de santal & Ambre ambré) 250ml',
    description: 'Diffusion continue pendant 4 mois. Bâtonnets en rotin naturel et flacon réutilisable en verre ambré apothicaire.',
    price: 320,
    originalPrice: 450,
    category: 'Accessoires & Senteurs',
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    badge: 'SENTEUR',
    isFeatured: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: PRODUCT_COLORS.slice(0, 2),
    dimensions: [
      {
        id: 'diff-250',
        name: 'Flacon 250 ml + 8 Bâtonnets',
        subtitle: 'Durée 12 à 16 semaines',
        sofaDimensions: 'Verre ambré',
        bedDimensions: 'Parfum de Grasse',
        price: 320,
        originalPrice: 450,
        popular: true
      }
    ],
  },
  {
    id: 'miroir-ondule-laiton',
    slug: 'miroir-ondule-laiton',
    name: 'Miroir Mural Ondulé Laiton',
    tagline: 'Cadre métallique galbé contour doré mat',
    description: 'Agrandit la pièce et reflète la lumière avec grâce. Fixation verticale ou horizontale incluse.',
    price: 890,
    originalPrice: 1200,
    category: 'Déco & Sculptures',
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    badge: 'DESIGN',
    isFeatured: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: PRODUCT_COLORS.slice(0, 3),
    dimensions: [
      {
        id: 'mir-std',
        name: 'Dimensions 80 cm x 50 cm',
        subtitle: 'Épaisseur miroir 4mm',
        sofaDimensions: '80 x 50 cm',
        bedDimensions: 'Laiton mat',
        price: 890,
        originalPrice: 1200,
        popular: true
      }
    ],
  },
  {
    id: 'canape-lit-comfy',
    slug: 'canape-lit-comfy',
    name: 'Fauteuil & Canapé Modulaire Comfy',
    tagline: 'Assise modulable ultra confortable en tissu bouclé chenille',
    description: 'Conçu en mousse Haute Résilience 35kg/m³ ergonomique. Passe du mode assise au mode détente en quelques secondes.',
    price: 4990,
    originalPrice: 6800,
    category: 'Mobilier & Assises',
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    badge: 'ICÔNE',
    isFeatured: true,
    isPopular: true,
    images: [
      sofaBeige,
      sofaBedMode,
      sofaOrange
    ],
    colors: PRODUCT_COLORS,
    dimensions: PRODUCT_DIMENSIONS,
  }
];

export const INITIAL_ORDERS = [
  {
    orderId: 'KH-84920',
    customerName: 'Youssef El Amrani',
    phone: '+212 661-234567',
    city: 'Casablanca',
    address: 'Angle Bd Anfa et Rue Molière, Appt 4B',
    note: 'Appeler avant de livrer SVP',
    color: 'Sable Nude',
    dimension: 'Taille Standard H32cm',
    quantity: 1,
    totalPrice: 390,
    date: '2026-08-09 14:30',
    status: 'Confirmed' as const,
  },
  {
    orderId: 'KH-84919',
    customerName: 'Fatima-Zahra Benjelloun',
    phone: '+212 662-987654',
    city: 'Rabat',
    address: 'Avenue Mohammed VI, Agdal',
    note: 'Livraison souhaitée le matin',
    color: 'Ambre Chaud',
    dimension: 'Modèle Sans Fil Rechargeable',
    quantity: 2,
    totalPrice: 1300,
    date: '2026-08-09 11:15',
    status: 'Shipped' as const,
  },
  {
    orderId: 'KH-84918',
    customerName: 'Othmane Berrada',
    phone: '+212 663-112233',
    city: 'Marrakech',
    address: 'Gueliz, Rue Souriya',
    color: 'Terre Cuite',
    dimension: 'Grand Format 150 x 200 cm',
    quantity: 1,
    totalPrice: 550,
    date: '2026-08-08 18:45',
    status: 'Delivered' as const,
  }
];

export const INITIAL_SETTINGS = {
  announcementText: '✨ KASA & HOME : NOUVELLE COLLECTION OBJET & DÉCO MAISON - LIVRAISON GRATUITE ✨',
  freeShippingText: 'Livraison Gratuite partout au Maroc dès 300 DH',
  whatsappNumber: '+212600000000',
  supportPhone: '0522 00 00 00',
  supportEmail: 'contact@kasaandhome.ma',
  promoEndsMinutes: 24,
  storeAddress: 'Boulevard d\'Anfa, Casablanca, Maroc',
};


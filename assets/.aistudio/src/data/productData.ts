import { ColorOption, DimensionOption, Review, FAQItem, RelatedProduct } from '../types';

import sofaBeige from '../assets/images/sofa_comfy_beige_1786357191090.jpg';
import sofaBedMode from '../assets/images/sofa_comfy_bed_mode_1786357206630.jpg';
import sofaOrange from '../assets/images/sofa_comfy_orange_1786357220372.jpg';

export const MOROCCAN_CITIES = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Tanger',
  'Agadir',
  'Fès',
  'Meknès',
  'Oujda',
  'Tétouan',
  'Kénitra',
  'El Jadida',
  'Safi',
  'Nador',
  'Mohammedia',
  'Béni Mellal',
  'Khouribga',
  'Laâyoune',
  'Témara',
  'Autre ville (Maroc)'
];

export const PRODUCT_COLORS: ColorOption[] = [
  {
    id: 'beige',
    name: 'Beige Bouclé (Nude)',
    colorCode: '#E6DEC',
    image: sofaBeige,
    tagline: 'La teinte phare chic & intemporelle'
  },
  {
    id: 'orange-brique',
    name: 'Orange Brique',
    colorCode: '#C85A32',
    image: sofaOrange,
    tagline: 'Chaleureux et vibrant'
  },
  {
    id: 'jaune-moutarde',
    name: 'Jaune Moutarde',
    colorCode: '#D89E30',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Lumière et modernité'
  },
  {
    id: 'bleu-canard',
    name: 'Bleu Canard',
    colorCode: '#1A4D62',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Profondeur & élégance'
  },
  {
    id: 'vert-olive',
    name: 'Vert Olive',
    colorCode: '#4A5B43',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Inspiration végétale apaisante'
  },
  {
    id: 'taupe-chic',
    name: 'Taupe Chic',
    colorCode: '#8B7D72',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Sobriété feutrée'
  },
  {
    id: 'noir-intense',
    name: 'Noir Intense',
    colorCode: '#222222',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Contraste moderne sculptural'
  }
];

export const PRODUCT_DIMENSIONS: DimensionOption[] = [
  {
    id: 'fauteuil-solo',
    name: 'Fauteuil-Lit Comfy (1 Personne)',
    subtitle: 'Idéal pour petits espaces, coin lecture & studio',
    sofaDimensions: '90 cm (L) x 90 cm (P) x 70 cm (H)',
    bedDimensions: '90 cm (L) x 200 cm (P) x 50 cm (H)',
    price: 3200,
    originalPrice: 4500,
    popular: false
  },
  {
    id: 'canape-duo',
    name: 'Canapé-Lit Comfy Duo (2 Personnes)',
    subtitle: 'Le best-seller Mon Habitat - Grand confort convertible',
    sofaDimensions: '200 cm (L) x 90 cm (P) x 70 cm (H)',
    bedDimensions: '200 cm (L) x 180 cm (P) x 50 cm (H)',
    price: 5490,
    originalPrice: 7500,
    popular: true
  },
  {
    id: 'canape-xl',
    name: 'Canapé-Lit Comfy Family XL (3 Personnes)',
    subtitle: 'Espace généreux pour les grands salons',
    sofaDimensions: '220 cm (L) x 100 cm (P) x 70 cm (H)',
    bedDimensions: '220 cm (L) x 200 cm (P) x 50 cm (H)',
    price: 6800,
    originalPrice: 9200,
    popular: false
  }
];

export const PRODUCT_GALLERY_IMAGES = [
  {
    src: sofaBeige,
    alt: 'Canapé-Lit Comfy Beige Bouclé en mode canapé',
    title: 'Mode Canapé - Salon'
  },
  {
    src: sofaBedMode,
    alt: 'Canapé-Lit Comfy déplié en mode lit double',
    title: 'Mode Lit - Couchage 2 personnes'
  },
  {
    src: sofaOrange,
    alt: 'Canapé-Lit Comfy déclinaison Orange Brique',
    title: 'Tissu Bouclé Orange Brique'
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    alt: 'Détail de la texture du tissu bouclé haute qualité',
    title: 'Tissu Bouclé Ultra Doux'
  },
  {
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
    alt: 'Structure mousse haute densité ergonomique',
    title: 'Assise Mousse HR 35kg/m³'
  }
];

export const PRODUCT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Youssef Berrada',
    location: 'Casablanca',
    rating: 5,
    date: '12 Juillet 2026',
    verified: true,
    colorChosen: 'Beige Bouclé (Nude)',
    comment: 'Franchement impressionné par la qualité ! Reçu en 48h à Casablanca. Le tissu est magnifique, très doux et la mousse est super ferme, parfaite pour le dos. Quand on le déplie en lit, mes invités ont dormi comme des bébés.',
    images: [sofaBeige, sofaBedMode],
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    author: 'Amina El Mansouri',
    location: 'Rabat',
    rating: 5,
    date: '28 Juin 2026',
    verified: true,
    colorChosen: 'Orange Brique',
    comment: 'La couleur orange brique donne une touche super chaleureuse à mon salon à Rabat. Super facile à convertir sans mécanismes métalliques compliqués qui grincent. Et le livreur Mon Habitat m\'a aidé à le déballer.',
    images: [sofaOrange],
    helpfulCount: 18
  },
  {
    id: 'rev-3',
    author: 'Karim Kettani',
    location: 'Marrakech',
    rating: 5,
    date: '19 Juin 2026',
    verified: true,
    colorChosen: 'Beige Bouclé (Nude)',
    comment: 'Paiement à la livraison super rassurant ! Produit conforme à 100% aux photos et vidéos. La housse se nettoie facilement avec un chiffon humide en cas de petite tache.',
    helpfulCount: 15
  },
  {
    id: 'rev-4',
    author: 'Laila Tazi',
    location: 'Tanger',
    rating: 5,
    date: '04 Mai 2026',
    verified: true,
    colorChosen: 'Vert Olive',
    comment: 'Superbe acquisition pour mon appartement d\'hôte à Tanger. Mes clients adorent le style bouclé hyper tendance. Merci au service client très réactif sur WhatsApp !',
    helpfulCount: 11
  },
  {
    id: 'rev-5',
    author: 'Mehdi Benjelloun',
    location: 'Agadir',
    rating: 4,
    date: '22 Avril 2026',
    verified: true,
    colorChosen: 'Taupe Chic',
    comment: 'Très confortable, livraison en 4 jours à Agadir. La mousse est bien dense, on ne sent pas du tout le sol quand il est déplié. Excellent rapport qualité/prix.',
    helpfulCount: 8
  }
];

export const PRODUCT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Paiement & Commande',
    question: 'Le paiement se fait-il réellement à la livraison ?',
    answer: 'Oui, absolument ! Chez Mon Habitat, vous ne payez rien à la commande. Vous passez votre commande en ligne ou via WhatsApp, et vous payez en espèces (Cash on Delivery) directement au livreur après réception et vérification de votre colis.'
  },
  {
    id: 'faq-2',
    category: 'Livraison & Délais',
    question: 'Quels sont les délais de livraison au Maroc ?',
    answer: 'La livraison est gratuite dès 499 DH d\'achat. Les commandes sont expédiées sous 24h à 48h. Comptez 24h à 48h pour Grand Casablanca & Rabat, et 3 à 5 jours ouvrés pour les autres villes du Maroc (Marrakech, Tanger, Agadir, Fès, Oujda, etc.).'
  },
  {
    id: 'faq-3',
    category: 'Qualité & Matériaux',
    question: 'Quelle est la composition de la mousse et du tissu ?',
    answer: 'Le Canapé-Lit Comfy est composé à 100% de mousse Haute Résilience (HR) de densité 35 kg/m³, offrant un soutien ergonomique optimal. Son revêtement est en tissu bouclé chenille premium anti-taches, déhoussable grâce à une fermeture éclair renforcée.'
  },
  {
    id: 'faq-4',
    category: 'Utilisation & Mécanisme',
    question: 'Est-il facile de le transformer en lit ?',
    answer: 'Grâce à son architecture intelligente 100% mousse, il n\'y a aucun mécanisme métallique lourd ou dangereux. Le passage du mode canapé au mode lit se fait en moins de 3 secondes, simplement en dépliant les blocs modulaires.'
  },
  {
    id: 'faq-5',
    category: 'Garantie & Retour',
    question: 'Quelle est la garantie et comment fonctionne le retour ?',
    answer: 'Tous nos canapés Comfy bénéficient d\'une garantie constructeur de 10 ans sur l\'affaissement de la mousse. De plus, nous vous offrons la garantie "30 jours Satisfait ou Remboursé". Si le produit ne vous convient pas, notre équipe organise la reprise sans tracas.'
  }
];

export const RELATED_PRODUCTS: RelatedProduct[] = [
  {
    id: 'canape-lit-aro',
    name: 'Canapé-Lit Aro',
    tagline: 'Design scandinave minimaliste & accoudoirs rembourrés',
    price: 4990,
    originalPrice: 6800,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 18,
    colorsCount: 5,
    badge: 'NOUVEAU'
  },
  {
    id: 'canape-lit-sora',
    name: 'Canapé-Lit Sora',
    tagline: 'Lignes épurées et double coussin lombaire inclus',
    price: 5200,
    originalPrice: 7100,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 22,
    colorsCount: 6,
    badge: 'TENDANCE'
  },
  {
    id: 'fauteuil-comfy-solo',
    name: 'Fauteuil Comfy Solo',
    tagline: 'Version 1 place convertible en chauffeuse',
    price: 2900,
    originalPrice: 3900,
    image: sofaOrange,
    rating: 4.7,
    reviewsCount: 15,
    colorsCount: 7,
    badge: '-25%'
  },
  {
    id: 'pouf-boucle-comfy',
    name: 'Pouf Ergo Bouclé',
    tagline: 'Repose-pieds ou assise d\'appoint assortie',
    price: 890,
    originalPrice: 1300,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 31,
    colorsCount: 4,
    badge: 'ACCESSOIRE'
  }
];

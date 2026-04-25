export type Category = 'Aventura' | 'Gastronomía' | 'Cultura' | 'Naturaleza' | 'Comunidades';
export type Region = 'Costa' | 'Sierra' | 'Selva';

export interface Guide {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  specialty: Category[];
  whatsapp: string;
  phone: string;
  dniVerified: boolean;
  minceturId?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Destination {
  id: string;
  name: string;
  region: Region;
  description: string;
  imageUrl: string;
  gallery: string[];
  category: Category;
  rating: number;
  location: string;
  priceRange: string;
  duration: string;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  includes: string[];
  guideId: string;
  lat: number;
  lng: number;
  stats?: {
    views: number;
    contacts: number;
    favorites: number;
    shares: number;
  };
}

export interface Booking {
  id: string;
  destinationId: string;
  date: string;
  guests: number;
  totalPrice: string;
  status: 'Confirmado' | 'Pendiente' | 'Completado';
}

export type Role = 'tourist' | 'guide';
export type Screen = 'onboarding' | 'auth' | 'home' | 'search' | 'favorites' | 'profile' | 'detail' | 'map' | 'guide_dashboard' | 'guide_register' | 'guide_experience_form';

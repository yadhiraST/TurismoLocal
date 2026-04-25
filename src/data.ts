import { Destination, Guide, Review } from './types.ts';

export const guides: Guide[] = [
  {
    id: 'g1',
    name: 'Carlos Mendoza',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
    isVerified: true,
    rating: 4.9,
    reviewCount: 124,
    specialty: ['Aventura', 'Cultura'],
    whatsapp: '+51987654321',
    phone: '987 654 321',
    dniVerified: true,
    minceturId: 'GUIDE-2023-089'
  },
  {
    id: 'g2',
    name: 'Helena Quispe',
    avatar: 'https://images.pexels.com/photos/3820838/pexels-photo-3820838.jpeg?auto=compress&cs=tinysrgb&w=200',
    isVerified: true,
    rating: 4.8,
    reviewCount: 89,
    specialty: ['Gastronomía', 'Comunidades'],
    whatsapp: '+51912345678',
    phone: '912 345 678',
    dniVerified: true
  },
  {
    id: 'g3',
    name: 'Jorge Falcón',
    avatar: 'https://images.pexels.com/photos/2791870/pexels-photo-2791870.jpeg?auto=compress&cs=tinysrgb&w=200',
    isVerified: true,
    rating: 5.0,
    reviewCount: 45,
    specialty: ['Naturaleza'],
    whatsapp: '+51934567890',
    phone: '934 567 890',
    dniVerified: true
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'Sofía R.',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    comment: '¡Una experiencia increíble! Carlos nos llevó por caminos poco conocidos hacia Machu Picchu. Totalmente recomendado.',
    date: '15 Mar 2024'
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'Mateo G.',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4,
    comment: 'La comida en la comunidad de Helena fue exquisita. Muy auténtico.',
    date: '02 Abr 2024'
  }
];

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Machu Picchu Místico',
    region: 'Sierra',
    description: 'Explora la ciudadela inca con un enfoque espiritual. Incluye ritual de agradecimiento a la Pachamama.',
    // ✅ MEJOR LINK DE MACHU PICCHU (funciona en móvil)
    imageUrl: 'https://images.pexels.com/photos/2210281/pexels-photo-2210281.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/2210281/pexels-photo-2210281.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6457065/pexels-photo-6457065.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6353990/pexels-photo-6353990.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Cultura',
    rating: 4.9,
    location: 'Cusco',
    priceRange: 'S/ 250',
    duration: '6 horas',
    difficulty: 'Fácil',
    includes: ['Guía bilingüe', 'Entrada prioritaria', 'Box lunch', 'Ritual místico'],
    guideId: 'g1',
    lat: -13.1631,
    lng: -72.5450,
    stats: { views: 1240, contacts: 45, favorites: 230, shares: 12 }
  },
  {
    id: '2',
    name: 'Sandboarding en Huacachina',
    region: 'Costa',
    description: 'Siente la adrenalina deslizándote por las dunas más altas de América en tubulares profesionales.',
    imageUrl: 'https://images.pexels.com/photos/13924203/pexels-photo-13924203.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/13924203/pexels-photo-13924203.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/10759985/pexels-photo-10759985.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Aventura',
    rating: 4.7,
    location: 'Ica',
    priceRange: 'S/ 80',
    duration: '2.5 horas',
    difficulty: 'Moderado',
    includes: ['Equipo de sandboarding', 'Paseo en buggies', 'Fotos de acción', 'Seguro de aventura'],
    guideId: 'g3',
    lat: -14.0875,
    lng: -75.7633,
    stats: { views: 890, contacts: 32, favorites: 156, shares: 8 }
  },
  {
    id: '3',
    name: 'Ruta del Ceviche Ancestral',
    region: 'Costa',
    description: 'Aprende a preparar el ceviche auténtico con pescadores locales utilizando técnicas milenarias.',
    imageUrl: 'https://images.pexels.com/photos/3262781/pexels-photo-3262781.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/3262781/pexels-photo-3262781.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4398895/pexels-photo-4398895.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Gastronomía',
    rating: 5.0,
    location: 'Chorrillos, Lima',
    priceRange: 'S/ 120',
    duration: '4 horas',
    difficulty: 'Fácil',
    includes: ['Taller de cocina', 'Pesca demostrativa', 'Degustación completa', 'Bebidas típicas'],
    guideId: 'g2',
    lat: -12.1583,
    lng: -77.0283,
    stats: { views: 560, contacts: 28, favorites: 98, shares: 15 }
  }
];
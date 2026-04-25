import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, Trash2, ShoppingBag } from 'lucide-react';
import { destinations } from '../data.ts';
import { Destination } from '../types.ts';
import { Button } from './ui/button.tsx';

interface FavoritesScreenProps {
  onSelectDestination: (dest: Destination) => void;
}

// IMÁGENES QUE SÍ FUNCIONAN (actualizadas)
const WORKING_IMAGES: Record<string, string> = {
  'Machu Picchu Místico': 'https://images.pexels.com/photos/2210281/pexels-photo-2210281.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Sandboarding en Huacachina': 'https://images.pexels.com/photos/13924203/pexels-photo-13924203.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Ruta del Ceviche Ancestral': 'https://images.pexels.com/photos/3262781/pexels-photo-3262781.jpeg?auto=compress&cs=tinysrgb&w=800',
};

// Componente de imagen con fallback MULTIPLE
function FavoriteImage({ name, fallbackSrc }: { name: string; fallbackSrc: string }) {
  const [currentSrc, setCurrentSrc] = useState(fallbackSrc);
  const [attempts, setAttempts] = useState(0);
  
  // Lista de URLs de respaldo para Machu Picchu
  const getBackupUrls = (name: string): string[] => {
    if (name.includes('Machu Picchu')) {
      return [
        'https://images.pexels.com/photos/2210281/pexels-photo-2210281.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://cdn.pixabay.com/photo/2020/10/27/18/17/machu-picchu-5691269_640.jpg',
        'https://images.pexels.com/photos/6457065/pexels-photo-6457065.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://placehold.co/600x400/1a5d4a/white?text=Machu+Picchu'
      ];
    }
    if (name.includes('Sandboarding')) {
      return [
        'https://images.pexels.com/photos/13924203/pexels-photo-13924203.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://cdn.pixabay.com/photo/2022/09/01/00/28/sandboarding-7423658_640.jpg',
        'https://placehold.co/600x400/1a5d4a/white?text=Sandboarding'
      ];
    }
    if (name.includes('Ceviche')) {
      return [
        'https://images.pexels.com/photos/3262781/pexels-photo-3262781.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://cdn.pixabay.com/photo/2017/06/02/21/19/ceviche-2364889_640.jpg',
        'https://placehold.co/600x400/1a5d4a/white?text=Ceviche+Peruano'
      ];
    }
    return [fallbackSrc];
  };
  
  const backupUrls = getBackupUrls(name);
  
  const handleError = () => {
    if (attempts < backupUrls.length - 1) {
      setAttempts(attempts + 1);
      setCurrentSrc(backupUrls[attempts + 1]);
    }
  };
  
  return (
    <img
      src={currentSrc}
      alt={name}
      className="w-full h-full object-cover rounded-xl"
      onError={handleError}
    />
  );
}

export default function FavoritesScreen({ onSelectDestination }: FavoritesScreenProps) {
  const [favorites, setFavorites] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar favoritos
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favIds = JSON.parse(savedFavorites);
      const favDestinations = destinations.filter(d => favIds.includes(d.id));
      setFavorites(favDestinations);
    } else {
      // Mostrar destinos de ejemplo con imágenes corregidas
      const fixedDestinations = destinations.map(d => {
        if (d.name === 'Machu Picchu Místico') {
          return { ...d, imageUrl: WORKING_IMAGES['Machu Picchu Místico'] };
        }
        if (d.name === 'Sandboarding en Huacachina') {
          return { ...d, imageUrl: WORKING_IMAGES['Sandboarding en Huacachina'] };
        }
        if (d.name === 'Ruta del Ceviche Ancestral') {
          return { ...d, imageUrl: WORKING_IMAGES['Ruta del Ceviche Ancestral'] };
        }
        return d;
      });
      setFavorites([fixedDestinations[0], fixedDestinations[2]]);
    }
    setLoading(false);
  }, []);

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter(f => f.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites.map(f => f.id)));
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="h-6 w-6 text-emerald-600 fill-emerald-600" />
          <h1 className="text-2xl font-bold text-emerald-950">Mis Favoritos</h1>
        </div>
        <p className="text-gray-500 text-sm">
          {favorites.length} {favorites.length === 1 ? 'experiencia guardada' : 'experiencias guardadas'}
        </p>
      </div>

      {/* Lista de favoritos */}
      <div className="px-4 py-4 space-y-4">
        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No tienes favoritos aún</p>
            <p className="text-gray-300 text-sm mt-1">Explora y guarda tus experiencias favoritas</p>
          </div>
        ) : (
          favorites.map((dest, index) => {
            // Forzar imagen correcta según nombre
            let displayImage = dest.imageUrl;
            if (dest.name === 'Machu Picchu Místico') {
              displayImage = WORKING_IMAGES['Machu Picchu Místico'];
            } else if (dest.name === 'Sandboarding en Huacachina') {
              displayImage = WORKING_IMAGES['Sandboarding en Huacachina'];
            } else if (dest.name === 'Ruta del Ceviche Ancestral') {
              displayImage = WORKING_IMAGES['Ruta del Ceviche Ancestral'];
            }
            
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
              >
                <div className="flex gap-3 p-3">
                  {/* Imagen */}
                  <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-emerald-100">
                    <FavoriteImage 
                      name={dest.name}
                      fallbackSrc={displayImage}
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-emerald-900 text-base line-clamp-1">{dest.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{dest.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-emerald-600">{dest.priceRange}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => removeFavorite(dest.id)}
                          className="p-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <Button
                          size="sm"
                          onClick={() => onSelectDestination(dest)}
                          className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-xl"
                        >
                          Ver más
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Botón de explorar más */}
      {favorites.length > 0 && (
        <div className="px-4 pb-8">
          <Button 
            onClick={() => window.location.href = '/home'}
            className="w-full h-12 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl font-medium"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Explorar más experiencias
          </Button>
        </div>
      )}
    </div>
  );
}
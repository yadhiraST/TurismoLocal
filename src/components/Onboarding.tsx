import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button.tsx';
import { ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

// IMÁGENES CON URLS QUE SÍ FUNCIONAN EN MÓVIL (Cloudflare + HTTPS)
const slides = [
  {
    title: 'Explora lo Inexplorado',
    description: 'Descubre destinos ocultos y experiencias auténticas compartidas por guías locales en todo el Perú.',
    image: 'https://images.pexels.com/photos/6646952/pexels-photo-6646952.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Apoya a las Comunidades',
    description: 'Conecta directamente con guías de comunidades locales. El 100% de lo que pagas les llega a ellos.',
    image: 'https://images.pexels.com/photos/14864425/pexels-photo-14864425.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Viaja con Seguridad',
    description: 'Consulta perfiles verificados, reseñas de otros viajeros y badge de certificación MINCETUR.',
    image: 'https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<boolean[]>([]);

  // Inicializar estado de errores de imágenes
  useEffect(() => {
    setImageErrors(new Array(slides.length).fill(false));
  }, []);

  const next = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  // Fallback image en caso de error
  const fallbackImage = 'https://placehold.co/800x1200/1a5d4a/white?text=Turismo+Local+Perú';

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="relative h-2/3">
        {imageErrors[currentSlide] ? (
          // Fallback cuando la imagen no carga
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <div className="text-6xl mb-4">🇵🇪</div>
              <p className="text-sm font-medium">Turismo Local Perú</p>
              <p className="text-xs mt-2 opacity-70">Experiencias auténticas</p>
            </div>
          </div>
        ) : (
          <motion.img
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={slides[currentSlide].image}
            className="absolute inset-0 w-full h-full object-cover"
            alt={slides[currentSlide].title}
            loading="eager"
            onError={() => handleImageError(currentSlide)}
          />
        )}
        {/* Gradiente mejorado para móvil */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-black/20" />
      </div>
      
      <div className="flex-1 px-6 pt-6 pb-8 flex flex-col items-center text-center justify-between">
        <motion.div
          key={`text-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-3 text-emerald-900 leading-tight">
            {slides[currentSlide].title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            {slides[currentSlide].description}
          </p>
        </motion.div>

        <div className="w-full space-y-6">
          {/* Indicadores de slide */}
          <div className="flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-8 bg-emerald-600' : 'w-2 bg-emerald-200'
                }`}
              />
            ))}
          </div>
          
          {/* Botón principal */}
          <Button 
            onClick={next}
            className="w-full h-12 sm:h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold group shadow-lg shadow-emerald-600/20"
          >
            {currentSlide === slides.length - 1 ? '✨ Empezar ahora' : 'Siguiente →'}
            {currentSlide !== slides.length - 1 && (
              <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            )}
          </Button>

          {/* Skip button opcional */}
          {currentSlide < slides.length - 1 && (
            <button
              onClick={onComplete}
              className="text-gray-400 text-xs font-medium hover:text-emerald-600 transition-colors"
            >
              Omitir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
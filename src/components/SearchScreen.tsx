import { useState } from 'react';
import { Search, Compass, MapPin, Star, History, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { destinations } from '../data.ts';
import { Input } from './ui/input.tsx';
import { Badge } from './ui/badge.tsx';
import { Destination } from '../types.ts';

interface SearchScreenProps {
  onSelectDestination: (dest: Destination) => void;
}

export default function SearchScreen({ onSelectDestination }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Aventura', 'Cultura', 'Gastronomía', 'Naturaleza', 'Comunidades'];

  const filtered = destinations.filter(d => {
    const matchesCategory = activeCategory === 'Todos' || d.category === activeCategory;
    const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase()) || 
                         d.location.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="pb-32 pt-6 px-6 space-y-8 animate-in fade-in duration-500">
      <header className="space-y-1">
        <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-[0.3em]">Explorar</p>
        <h1 className="text-3xl font-bold text-emerald-950 tracking-tight font-serif">Encuentra una joya</h1>
      </header>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/30 group-focus-within:text-emerald-600 transition-colors" size={20} />
        <Input 
          placeholder="Busca por destino, guía o región..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-2xl text-base focus-visible:ring-emerald-500 transition-all shadow-xs"
        />
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
              activeCategory === cat ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-white border-gray-100 text-gray-500 hover:border-emerald-100'
            }`}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {query === '' && activeCategory === 'Todos' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Búsquedas recientes</h3>
          <div className="space-y-3">
             {['Cusco espiritual', 'Ceviche en Lima', 'Trekking Huaraz'].map((item, i) => (
               <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                 <History className="h-4 w-4 text-emerald-900/20" />
                 <span className="text-sm font-medium text-emerald-950">{item}</span>
                 <ArrowRight className="h-4 w-4 text-gray-300 ml-auto" />
               </div>
             ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {filtered.length > 0 && query !== '' && (
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Resultados ({filtered.length})</h3>
        )}

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => onSelectDestination(dest)}
                className="flex gap-4 p-4 bg-white rounded-3xl border border-gray-50 group cursor-pointer active:scale-95 transition-all shadow-xs hover:shadow-md hover:border-emerald-50"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                  <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h3 className="font-bold text-emerald-950 group-hover:text-emerald-600 transition-colors truncate">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                    <MapPin size={10} className="text-emerald-600" />
                    <span className="truncate">{dest.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-[10px]">
                      <Star size={10} fill="currentColor" />
                      <span>{dest.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-wider">{dest.category}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-24 bg-gray-50 rounded-[3rem] space-y-4 border-2 border-dashed border-gray-100 flex flex-col items-center">
              <Compass className="text-emerald-100 animate-spin-slow" size={64} />
              <div className="space-y-1">
                <p className="text-emerald-950 font-bold">No encontramos resultados</p>
                <p className="text-gray-400 text-xs px-10">Prueba con otras palabras o explora las categorías principales.</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

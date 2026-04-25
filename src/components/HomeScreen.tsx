import { useState } from 'react';
import { Search, Compass, Utensils, Landmark, TreePine, Users, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { destinations } from '../data.ts';
import DestinationCard from './DestinationCard.tsx';
import { Input } from './ui/input.tsx';
import { ScrollArea, ScrollBar } from './ui/scroll-area.tsx';
import { Destination, Category } from '../types.ts';

interface HomeScreenProps {
  onSelectDestination: (dest: Destination) => void;
}

const categories: { id: Category; icon: any; label: string; color: string }[] = [
  { id: 'Aventura', icon: Compass, label: 'Aventura', color: 'bg-orange-50 text-orange-600' },
  { id: 'Gastronomía', icon: Utensils, label: 'Sabor', color: 'bg-rose-50 text-rose-600' },
  { id: 'Cultura', icon: Landmark, label: 'Cultura', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'Naturaleza', icon: TreePine, label: 'Naturaleza', color: 'bg-sky-50 text-sky-600' },
  { id: 'Comunidades', icon: Users, label: 'Pueblos', color: 'bg-amber-50 text-amber-600' },
];

export default function HomeScreen({ onSelectDestination }: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDestinations = destinations.filter(d => {
    const matchesCategory = activeCategory === 'Todos' || d.category === activeCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-32 pt-6 px-6 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-[0.3em]">Perú Local</p>
          <h1 className="text-4xl font-bold text-emerald-950 tracking-tight font-serif leading-tight">
            Descubre tu <br /> próximo destino
          </h1>
        </div>
        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-50 shadow-sm">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="Profile" />
        </div>
      </header>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/30 group-focus-within:text-emerald-600 transition-colors" size={20} />
        <Input 
          placeholder="¿A dónde vas?" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-2xl text-base focus-visible:ring-emerald-500 transition-all shadow-xs placeholder:text-gray-400"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-emerald-950">Categorías</h2>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 p-1">
            <button
               onClick={() => setActiveCategory('Todos')}
               className={`flex flex-col items-center gap-2 group`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeCategory === 'Todos' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-gray-50 text-emerald-900/40 group-hover:bg-emerald-50 group-hover:text-emerald-600'}`}>
                <Star className="h-6 w-6" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${activeCategory === 'Todos' ? 'text-emerald-950' : 'text-gray-400'}`}>Todos</span>
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-gray-50 text-emerald-900/40 group-hover:bg-emerald-50 group-hover:text-emerald-600'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-emerald-950' : 'text-gray-400'}`}>{cat.label}</span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      {/* Featured Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-emerald-950">Experiencias Destacadas</h2>
          <button className="text-emerald-600 text-xs font-bold flex items-center gap-1 hover:underline">
            Ver todas <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <DestinationCard 
                  destination={dest} 
                  onClick={() => onSelectDestination(dest)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Community Callout */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-emerald-950 p-8 h-56 flex flex-col justify-center text-white shadow-2xl shadow-emerald-900/20">
        <div className="space-y-3 z-10">
          <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Impacto Social</span>
          <h3 className="text-2xl font-bold leading-tight font-serif">Turismo Sostenible <br /> en Comunidades</h3>
          <p className="text-emerald-100/50 text-xs max-w-[200px]">Tus viajes impulsan economías locales directas.</p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-linear-to-l from-emerald-800/20 to-transparent" />
        <Users className="w-40 h-40 absolute -right-10 -bottom-10 text-emerald-800/10 rotate-12" />
      </div>
    </div>
  );
}

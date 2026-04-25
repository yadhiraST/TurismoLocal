import { Star, MapPin, Clock, Gauge } from 'lucide-react';
import { motion } from 'motion/react';
import { Destination } from '../types.ts';
import { Badge } from './ui/badge.tsx';

interface DestinationCardProps {
  destination: Destination;
  onClick: () => void;
}

export default function DestinationCard({ destination, onClick }: DestinationCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative group cursor-pointer"
      id={`destination-${destination.id}`}
    >
      <div className="aspect-[3/4] relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-emerald-950/20">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-emerald-950/90 via-emerald-950/40 to-transparent" />
        
        {/* Top Info */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase">
            {destination.region}
          </Badge>
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 text-white">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute inset-x-6 bottom-8 text-white">
          <p className="text-emerald-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">{destination.category}</p>
          <h3 className="text-3xl font-bold font-serif leading-tight mb-4 group-hover:text-emerald-200 transition-colors">
            {destination.name}
          </h3>
          
          <div className="flex items-center gap-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-white/50" />
              <span className="text-xs font-medium">{destination.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-white/50" />
              <span className="text-xs font-medium">{destination.difficulty}</span>
            </div>
            <div className="ml-auto">
              <span className="text-lg font-bold font-serif">{destination.priceRange}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

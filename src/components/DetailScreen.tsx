import * as React from 'react';
import { ArrowLeft, MapPin, Star, Clock, Gauge, CheckCircle2, MessageCircle, Phone, Info, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Destination } from '../types.ts';
import { Badge } from './ui/badge.tsx';
import { Button } from './ui/button.tsx';
import { Separator } from './ui/separator.tsx';
import { guides } from '../data.ts';
import { toast } from 'sonner';

interface DetailScreenProps {
  destination: Destination;
  onBack: () => void;
}

export default function DetailScreen({ destination, onBack }: DetailScreenProps) {
  const guide = guides.find(g => g.id === destination.guideId);

  const handleContact = (method: 'whatsapp' | 'call') => {
    if (method === 'whatsapp') {
      toast.success('Abriendo WhatsApp...');
      // window.open(`https://wa.me/${guide?.whatsapp}`, '_blank');
    } else {
      toast.success('Iniciando llamada...');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Hero Gallery */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex w-full h-full snap-x snap-mandatory overflow-x-auto">
            {destination.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-full h-full object-cover shrink-0 snap-center"
                alt={`Gallery ${i}`}
              />
            ))}
          </div>
        </ScrollArea>
        
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
        
        <button 
          onClick={onBack}
          className="absolute top-12 left-6 p-4 bg-white/10 backdrop-blur-xl rounded-[1.5rem] text-white border border-white/20 z-50 shadow-2xl"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="absolute bottom-12 left-8 right-8 z-10">
           <div className="flex gap-2 mb-4">
            <Badge className="bg-emerald-600 text-white border-none uppercase tracking-[0.2em] text-[9px] px-3 py-1 font-bold">
              {destination.category}
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-md text-white border-none uppercase tracking-[0.2em] text-[9px] px-3 py-1 font-bold">
              {destination.region}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight font-serif mb-2 leading-tight">
            {destination.name}
          </h1>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <MapPin size={16} />
            <span>{destination.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 -mt-8 relative bg-white rounded-t-[3rem] pt-10 space-y-10">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatBox icon={Star} label="Rating" value={destination.rating.toString()} color="text-amber-500" />
          <StatBox icon={Clock} label="Duración" value={destination.duration} color="text-emerald-600" />
          <StatBox icon={Gauge} label="Dificultad" value={destination.difficulty} color="text-emerald-600" />
        </div>

        {/* Guide Profile */}
        <div className="bg-gray-50 rounded-[2.5rem] p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img src={guide?.avatar} className="w-16 h-16 rounded-2xl object-cover" />
              {guide?.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                  <CheckCircle2 size={12} fill="currentColor" className="text-emerald-500 bg-white rounded-full" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-emerald-950">{guide?.name}</h3>
                {guide?.minceturId && <Badge variant="outline" className="text-[8px] border-emerald-200 text-emerald-700 bg-emerald-50 py-0 h-4">MINCETUR</Badge>}
              </div>
              <p className="text-xs text-gray-500 font-medium">Guía Profesional Local</p>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-500 font-bold uppercase tracking-widest">
                <Award size={10} /> Verificado por TurismoLocal
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed italic border-l-2 border-emerald-100 pl-4">
            "Mi pasión es mostrar la verdadera cara de {destination.location}. Te prometo una experiencia que no encontrarás en guías convencionales."
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-serif text-emerald-950">Acerca de la experiencia</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            {destination.description}
          </p>
        </div>

        {/* What's Included */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-serif text-emerald-950">¿Qué incluye?</h2>
          <div className="grid grid-cols-1 gap-3">
            {destination.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={12} />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning / Cancellation Info */}
        <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <b>Nota:</b> La coordinación final y el pago se realizan directamente con el guía. Applet TurismoLocal no cobra comisiones.
          </p>
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pt-4 bg-white/90 backdrop-blur-xl border-t border-gray-100 z-[100] flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Precio Referencial</p>
            <p className="text-2xl font-bold text-emerald-950 font-serif">{destination.priceRange} <span className="text-xs font-sans text-gray-400">/ pers</span></p>
          </div>
          <Button variant="outline" className="rounded-full border-emerald-100 text-emerald-600 font-bold" onClick={() => handleContact('call')}>
            <Phone size={18} className="mr-2" /> Llamar
          </Button>
        </div>
        <Button 
          className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] text-lg font-bold shadow-2xl shadow-emerald-600/30 group"
          onClick={() => handleContact('whatsapp')}
        >
          <MessageCircle className="mr-2 h-6 w-6 transition-transform group-hover:scale-110" />
          Contactar por WhatsApp
        </Button>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-3xl text-center space-y-1">
      <div className={`flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="font-bold text-emerald-950 text-xs">{value}</p>
    </div>
  );
}

function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`overflow-auto ${className}`}>{children}</div>;
}

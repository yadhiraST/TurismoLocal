import * as React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input.tsx';
import { Textarea } from '../ui/textarea.tsx';
import { ArrowLeft, Camera, MapPin, Tag, Clock, Gauge, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ExperienceFormProps {
  onBack: () => void;
}

export default function ExperienceForm({ onBack }: ExperienceFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('¡Experiencia guardada exitosamente!');
    onBack();
  };

  return (
    <div className="p-6 bg-white min-h-full pb-32">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold font-serif text-emerald-950">Nueva Experiencia</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Fotos de la experiencia</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all cursor-pointer">
              <Camera className="h-8 w-8" />
              <span className="text-[10px] font-bold">Añadir foto</span>
            </div>
            <div className="aspect-square bg-gray-100 rounded-3xl" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Título</label>
          <Input placeholder="Ej: Atardecer en las dunas" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-emerald-600" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Descripción</label>
          <Textarea 
            placeholder="Describe qué hace especial a esta ruta..." 
            className="min-h-[120px] rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-emerald-600 p-4" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Precio (S/)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">S/</span>
              <Input placeholder="0.00" className="h-14 pl-10 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-emerald-600" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Duración</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Ej: 3 horas" className="h-14 pl-10 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-emerald-600" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Ubicación</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Ej: Huacachina, Ica" className="h-14 pl-10 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-emerald-600" />
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] text-lg font-bold shadow-xl shadow-emerald-600/20">
            <Save className="mr-2 h-5 w-5" />
            Publicar Experiencia
          </Button>
          <p className="text-center text-[10px] text-gray-400 mt-4 px-8">
            Tu experiencia será revisada por nuestro equipo antes de ser publicada para garantizar la calidad.
          </p>
        </div>
      </form>
    </div>
  );
}

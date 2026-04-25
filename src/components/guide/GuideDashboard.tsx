import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { 
  Plus, Eye, MessageCircle, Heart, Share2, Star,
  Settings, Award, TrendingUp, Phone, Mail, MapPin, Globe
} from 'lucide-react';
import { destinations } from '../../data.ts';
import { Badge } from '../ui/badge.tsx';

export default function GuideDashboard() {
  const guideDestinations = destinations.slice(0, 2);
  
  // Datos del guía
  const guide = {
    name: 'Carlos Mendoza',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
    verified: true,
    mincetur: true,
    rating: 4.9,
    reviews: 124,
    location: 'Cusco, Perú',
    languages: ['Español', 'Inglés', 'Quechua'],
    phone: '+51 987 654 321',
    email: 'carlos@turismolocal.pe'
  };

  const stats = [
    { icon: Eye, label: 'Vistas', value: '1,240', color: 'bg-blue-50 text-blue-600' },
    { icon: MessageCircle, label: 'WhatsApp', value: '45', color: 'bg-green-50 text-green-600' },
    { icon: Heart, label: 'Favoritos', value: '230', color: 'bg-rose-50 text-rose-600' },
    { icon: Share2, label: 'Compartidos', value: '12', color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header con perfil */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-b-3xl pt-8 pb-6 px-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={guide.avatar} className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-lg" 
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/1a5d4a/white?text=Guía'; }} />
            {guide.mincetur && (
              <div className="absolute -bottom-1 -right-1 bg-amber-500 p-1 rounded-full">
                <Award size={12} className="text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{guide.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-emerald-500/30 text-white text-[9px]">Guía Certificado</Badge>
              <Badge className="bg-amber-500/30 text-white text-[9px]">MINCETUR</Badge>
            </div>
            <div className="flex items-center gap-1 mt-1 text-emerald-200 text-xs">
              <Star size={12} fill="currentColor" />
              <span>{guide.rating}</span>
              <span className="text-emerald-300">({guide.reviews} reseñas)</span>
            </div>
          </div>
          <button className="p-2 bg-white/10 rounded-full">
            <Settings className="h-5 w-5 text-white" />
          </button>
        </div>
        
        {/* Ubicación e idiomas */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-white/20">
          <div className="flex items-center gap-1 text-emerald-200 text-xs">
            <MapPin size={12} /> {guide.location}
          </div>
          <div className="flex items-center gap-1 text-emerald-200 text-xs">
            <Globe size={12} /> {guide.languages.join(' • ')}
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="px-6 -mt-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, i) => (
            <Card key={i} className="p-4 border-none bg-white shadow-sm rounded-2xl">
              <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <p className="text-2xl font-bold text-emerald-950">{stat.value}</p>
              <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Contacto rápido */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-4 flex gap-3 shadow-sm">
          <Button className="flex-1 h-12 bg-green-600 hover:bg-green-700 rounded-xl gap-2">
            <Phone size={16} /> Llamar
          </Button>
          <Button className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl gap-2">
            <MessageCircle size={16} /> WhatsApp
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-gray-200">
            <Mail size={16} />
          </Button>
        </div>
      </div>

      {/* Mis Experiencias */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-emerald-950">🏔️ Mis Experiencias</h2>
          <Button variant="link" className="text-emerald-600 font-bold p-0">Ver todas</Button>
        </div>

        <div className="space-y-4">
          {guideDestinations.map((dest) => (
            <Card key={dest.id} className="p-4 border-none bg-white shadow-sm rounded-2xl flex gap-4">
              <img src={dest.imageUrl} className="w-20 h-20 rounded-xl object-cover" 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/1a5d4a/white?text=Experiencia'; }} />
              <div className="flex-1">
                <h4 className="font-bold text-emerald-950">{dest.name}</h4>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">{dest.rating}</span>
                  <span className="text-[10px] text-gray-400">({dest.stats?.contacts || 0} reservas)</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 rounded-lg text-[10px] border-gray-200">Editar</Button>
                  <Button size="sm" className="h-7 rounded-lg text-[10px] bg-emerald-600 text-white">Promocionar</Button>
                </div>
              </div>
            </Card>
          ))}
          
          <button className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center gap-2 hover:bg-gray-50">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold text-emerald-950">Nueva experiencia</span>
          </button>
        </div>
      </div>

      {/* Reseña reciente */}
      <div className="px-6 mt-8">
        <h2 className="text-lg font-bold text-emerald-950 mb-4">⭐ Reseña destacada</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100" 
              className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-bold text-emerald-900">Sofía Rodríguez</p>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic">
            "Increíble experiencia, Carlos nos mostró lugares únicos. Muy recomendado."
          </p>
          <Button variant="link" className="text-emerald-600 text-xs font-bold p-0 mt-2">Responder</Button>
        </div>
      </div>

      <p className="text-center text-[9px] text-gray-300 mt-8 pb-4">TurismoLocal • Programa de Guías Certificados</p>
    </div>
  );
}
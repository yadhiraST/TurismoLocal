import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, LogOut, ChevronRight, Award, Star, MapPin, 
  Phone, MessageCircle, Mail, CheckCircle2, Globe, 
  Calendar, Users, TrendingUp, Eye, Heart, Share2,
  Camera, Clock, DollarSign, FileText, ShieldCheck, Copy
} from 'lucide-react';
import { Button } from '../ui/button.tsx';
import { Badge } from '../ui/badge.tsx';
import { Separator } from '../ui/separator.tsx';
import { toast } from 'sonner';

interface GuideProfileProps {
  onEdit?: () => void;
  onLogout?: () => void;
}

export default function GuideProfile({ onEdit, onLogout }: GuideProfileProps) {
  const guide = {
    name: 'Carlos Mendoza',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
    role: 'Guía Oficial de Turismo',
    location: 'Cusco, Perú',
    bio: 'Apasionado por mostrar la verdadera esencia de los Andes. Con más de 10 años guiando viajeros de todo el mundo.',
    languages: ['Español', 'Inglés', 'Quechua básico'],
    experience: '10+ años',
    rating: 4.9,
    totalReviews: 124,
    verifications: {
      dni: true,
      location: true,
      mincetur: true,
      reviews: 124,
      level: 'Certificado'
    },
    stats: {
      views: 1240,
      contacts: 45,
      favorites: 230,
      shares: 12
    },
    whatsapp: '+51987654321',
    phone: '987654321',
    email: 'carlos@turismolocal.pe'
  };

  const getVerificationBadge = () => {
    if (guide.verifications.mincetur) {
      return { label: 'Certificado MINCETUR', color: 'bg-amber-500', icon: Award };
    }
    if (guide.verifications.location && guide.verifications.reviews >= 5) {
      return { label: 'Verificado', color: 'bg-emerald-500', icon: ShieldCheck };
    }
    return { label: 'Básico', color: 'bg-gray-500', icon: CheckCircle2 };
  };
  
  const verification = getVerificationBadge();
  const VerificationIcon = verification.icon;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado al portapapeles');
  };

  const menuItems = [
    { icon: Camera, label: 'Mis Experiencias', badge: '3 activas' },
    { icon: Calendar, label: 'Próximas Reservas', badge: '2 pendientes' },
    { icon: Users, label: 'Comunidad de Guías', badge: null },
    { icon: TrendingUp, label: 'Análisis y Métricas', badge: '+12%' },
    { icon: DollarSign, label: 'Mis Ganancias', badge: 'S/ 2,450' },
    { icon: FileText, label: 'Documentación', badge: 'Verificado' },
    { icon: Settings, label: 'Configuración', badge: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-800 pb-32">
      {/* Header */}
      <div className="relative pt-12 pb-8 px-6">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-amber-500/20 to-emerald-400/20 rounded-b-3xl" />
        
        <div className="relative z-10">
          <div className="flex justify-end mb-4">
            <button className="p-2 bg-white/10 rounded-full">
              <Settings className="h-5 w-5 text-white" />
            </button>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src={guide.avatar}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/1a5d4a/white?text=Guía'; }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-2 rounded-full border-2 border-white">
                <Award size={14} className="text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white font-serif">{guide.name}</h2>
            <p className="text-emerald-200 text-sm mt-1">{guide.role}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <div className={`${verification.color} text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg`}>
                <VerificationIcon size={10} />
                <span className="text-[9px] font-bold uppercase tracking-wider">{verification.label}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 mt-2 text-amber-400">
              <Star size={14} fill="currentColor" />
              <span className="text-white font-bold text-sm">{guide.rating}</span>
              <span className="text-emerald-300 text-xs">({guide.totalReviews} reseñas)</span>
            </div>
            
            <div className="flex items-center gap-1 mt-1 text-emerald-300 text-xs">
              <MapPin size={12} />
              <span>{guide.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 -mt-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <p className="text-white/80 text-sm italic leading-relaxed">
            "{guide.bio}"
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mt-6">
        <h3 className="text-white/50 text-[9px] font-bold uppercase tracking-wider mb-3">📊 Rendimiento</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Eye, label: 'Vistas', value: guide.stats.views.toLocaleString() },
            { icon: MessageCircle, label: 'Contactos', value: guide.stats.contacts },
            { icon: Heart, label: 'Favoritos', value: guide.stats.favorites },
            { icon: Share2, label: 'Compartidos', value: guide.stats.shares },
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
              <stat.icon size={16} className="mx-auto text-emerald-300 mb-1" />
              <p className="text-white font-bold text-lg">{stat.value}</p>
              <p className="text-white/40 text-[8px] font-medium uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contacto */}
      <div className="px-6 mt-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
          <p className="text-white/50 text-[9px] font-bold uppercase mb-3">📞 Contacto directo</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Phone size={14} /> <span>{guide.phone}</span>
              </div>
              <Button size="sm" className="h-7 bg-emerald-500 text-white text-[10px] rounded-lg">Llamar</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <MessageCircle size={14} /> <span>WhatsApp</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => copyToClipboard(guide.whatsapp)} className="p-1.5 bg-white/10 rounded-lg">
                  <Copy size={12} className="text-white/60" />
                </button>
                <Button size="sm" className="h-7 bg-green-600 text-white text-[10px] rounded-lg">Enviar</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Mail size={14} /> <span>{guide.email}</span>
              </div>
              <button onClick={() => copyToClipboard(guide.email)} className="p-1.5 bg-white/10 rounded-lg">
                <Copy size={12} className="text-white/60" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Idiomas */}
      <div className="px-6 mt-3">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
          <p className="text-white/50 text-[9px] font-bold uppercase mb-2">Idiomas</p>
          <div className="flex flex-wrap gap-2">
            {guide.languages.map(lang => (
              <Badge key={lang} className="bg-emerald-500/30 text-white border-none text-xs">
                <Globe size={10} className="mr-1" /> {lang}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Menú */}
      <div className="px-6 mt-6 space-y-2">
        <h3 className="text-white/40 text-[9px] font-bold uppercase mb-2">Configuración</h3>
        {menuItems.map((item, idx) => (
          <button key={idx} className="w-full p-3 flex items-center justify-between bg-white/10 backdrop-blur-md rounded-xl">
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-emerald-300" />
              <span className="text-white text-sm">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && <span className="text-emerald-300 text-[10px] font-medium">{item.badge}</span>}
              <ChevronRight size={14} className="text-white/40" />
            </div>
          </button>
        ))}
      </div>

      <Separator className="mx-6 my-6 w-auto bg-white/20" />

      {/* Logout */}
      <div className="px-6">
        <Button onClick={onLogout} variant="ghost" className="w-full h-12 rounded-xl text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 gap-2">
          <LogOut size={18} /> Cerrar Sesión
        </Button>
      </div>

      <p className="text-center text-[9px] text-white/30 mt-6 pb-4">TurismoLocal • Programa de Guías Certificados</p>
    </div>
  );
}
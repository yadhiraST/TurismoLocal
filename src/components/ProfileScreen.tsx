import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, Clock, LogOut, ChevronRight, Package, 
  ShieldCheck, Award, Heart, MapPin, Star, 
  Calendar, HelpCircle, FileText 
} from 'lucide-react';
import { Button } from './ui/button.tsx';
import { Separator } from './ui/separator.tsx';
import { Badge } from './ui/badge.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog.tsx';
import { Booking } from '../types.ts';
import { destinations } from '../data.ts';

interface ProfileScreenProps {
  bookings: Booking[];
}

function PoliciesModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full p-4 flex items-center justify-between bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
              <FileText size={20} />
            </div>
            <span className="font-bold text-emerald-800 text-sm">📋 Políticas de la Plataforma</span>
          </div>
          <ChevronRight size={18} className="text-emerald-400" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-emerald-900">📋 Políticas TurismoLocal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="bg-emerald-50 p-4 rounded-xl">
            <h4 className="font-bold text-emerald-800 mb-2">🌱 1. Comunidades Locales</h4>
            <p className="text-xs text-gray-600">100% de tu pago beneficia directamente a guías locales.</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl">
            <h4 className="font-bold text-amber-800 mb-2">🔄 2. Cancelación</h4>
            <p className="text-xs text-gray-600">Gratis hasta 48h antes. Después 30% del valor.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl">
            <h4 className="font-bold text-blue-800 mb-2">🔒 3. Seguridad</h4>
            <p className="text-xs text-gray-600">Guías verificados con DNI y MINCETUR.</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <h4 className="font-bold text-purple-800 mb-2">⭐ 4. Programa de Puntos</h4>
            <p className="text-xs text-gray-600">Acumula puntos y canjea por descuentos.</p>
          </div>
        </div>
        <Button className="w-full mt-4 bg-emerald-600 text-white rounded-xl">Entendido 🙌</Button>
      </DialogContent>
    </Dialog>
  );
}

export default function ProfileScreen({ bookings }: ProfileScreenProps) {
  // Datos actualizados: 5 viajes, viajera principiante
  const totalTrips = 5;
  const totalReviews = 5;
  const totalSpent = 800;
  const points = 450;

  // Imagen que funciona para Machu Picchu
  const machuPicchuImage = 'https://images.pexels.com/photos/2210281/pexels-photo-2210281.jpeg?auto=compress&cs=tinysrgb&w=800';

  const menuItems = [
    { icon: Heart, label: 'Mis Favoritos', color: 'text-rose-600', bg: 'bg-rose-50' },
    { icon: MapPin, label: 'Destinos Visitados', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Calendar, label: 'Próximos Viajes', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Star, label: 'Mis Reseñas', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Clock, label: 'Historial', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { icon: ShieldCheck, label: 'Privacidad', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Settings, label: 'Preferencias', color: 'text-gray-600', bg: 'bg-gray-50' },
    { icon: HelpCircle, label: 'Ayuda', color: 'text-gray-600', bg: 'bg-gray-50' },
  ];

  // Actividad reciente con Machu Picchu
  const recentActivities = [
    {
      id: '1',
      name: 'Machu Picchu Místico',
      location: 'Cusco',
      date: '15 Abr 2025',
      price: 'S/ 250',
      status: 'Completado',
      image: machuPicchuImage
    },
    {
      id: '2',
      name: 'Ruta del Ceviche Ancestral',
      location: 'Lima',
      date: '28 Mar 2025',
      price: 'S/ 120',
      status: 'Completado',
      image: 'https://images.pexels.com/photos/3262781/pexels-photo-3262781.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      name: 'Sandboarding en Huacachina',
      location: 'Ica',
      date: '10 Feb 2025',
      price: 'S/ 80',
      status: 'Completado',
      image: 'https://images.pexels.com/photos/13924203/pexels-photo-13924203.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-emerald-700 rounded-b-3xl pt-12 pb-8 px-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200" 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/1a5d4a/white?text=User'; }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 p-2 rounded-full">
              <Award size={16} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Sofía Rodríguez</h2>
          <Badge className="bg-emerald-500/30 text-white mt-1">⭐ Viajera Principiante • {points} pts</Badge>
          <p className="text-emerald-200 text-xs mt-2">Descubriendo el Perú paso a paso 🌄</p>
        </div>
      </div>

      {/* Stats - Actualizados: 5 viajes, 5 reseñas, S/800 */}
      <div className="px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-700">{totalTrips}</p>
            <p className="text-[10px] text-gray-500">Viajes</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-2xl font-bold text-amber-700">{totalReviews}</p>
            <p className="text-[10px] text-gray-500">Reseñas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-700">S/ {totalSpent}</p>
            <p className="text-[10px] text-gray-500">Invertido</p>
          </div>
        </div>
      </div>

      {/* Actividad Reciente - Con Machu Picchu como principal */}
      <div className="px-6 mt-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-bold text-emerald-900">📅 Actividad Reciente</h3>
          <Badge className="bg-emerald-100 text-emerald-700">{recentActivities.length} viajes</Badge>
        </div>
        
        <div className="space-y-3">
          {recentActivities.map((activity, idx) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-3 flex gap-3 shadow-sm border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-emerald-100 flex-shrink-0">
                <img 
                  src={activity.image} 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/1a5d4a/white?text=Perú';
                  }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-emerald-800 text-sm">{activity.name}</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-gray-400" />
                  <p className="text-[10px] text-gray-500">{activity.location}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs font-bold text-emerald-600">{activity.price}</span>
                  <Badge className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5">
                    {activity.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar size={12} className="text-gray-300" />
                <span className="text-[9px] text-gray-400 ml-1">{activity.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {recentActivities.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center border-2 border-dashed">
            <Package size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-400 text-sm">No hay reservas aún</p>
            <Button variant="link" className="text-emerald-600 text-xs mt-1">Explorar experiencias</Button>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="px-6 mt-6 space-y-2">
        {menuItems.map((item, idx) => (
          <motion.button 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="w-full p-3 flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`${item.bg} ${item.color} p-2 rounded-lg`}>
                <item.icon size={18} />
              </div>
              <span className="text-gray-700 text-sm">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </motion.button>
        ))}
      </div>

      {/* Políticas */}
      <div className="px-6 mt-4">
        <PoliciesModal />
      </div>

      <Separator className="mx-6 my-6 w-auto" />

      {/* Logout */}
      <div className="px-6">
        <Button variant="ghost" className="w-full h-12 rounded-xl text-rose-500 gap-2 hover:bg-rose-50 transition-all">
          <LogOut size={18} /> Cerrar Sesión
        </Button>
      </div>

      <p className="text-center text-[9px] text-gray-300 mt-6 pb-4">TurismoLocal v2.5 • Hecho en Perú 🇵🇪</p>
    </div>
  );
}

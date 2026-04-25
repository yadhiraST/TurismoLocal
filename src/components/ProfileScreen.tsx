import { Settings, CreditCard, Clock, LogOut, ChevronRight, User, Package, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx';
import { Button } from './ui/button.tsx';
import { Separator } from './ui/separator.tsx';
import { Badge } from './ui/badge.tsx';
import { Booking } from '../types.ts';
import { destinations } from '../data.ts';

interface ProfileScreenProps {
  bookings: Booking[];
}

export default function ProfileScreen({ bookings }: ProfileScreenProps) {
  const menuItems = [
    { icon: Clock, label: 'Historial de Rutas', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: CreditCard, label: 'Métodos de Pago', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: ShieldCheck, label: 'Privacidad y Seguridad', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { icon: Settings, label: 'Preferencias', color: 'text-gray-600', bg: 'bg-gray-50' },
  ];

  return (
    <div className="pb-32 pt-6 px-6 space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl rotate-3">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-600 p-3 rounded-2xl border-4 border-white text-white shadow-lg -rotate-12">
            <Award size={20} />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-emerald-950 font-serif">Sofía Rodríguez</h2>
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Viajera Experta • 1,240 Puntos</p>
        </div>
      </div>

      {/* Quick Actions / Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-4 rounded-3xl text-center">
          <p className="text-2xl font-bold text-emerald-900">12</p>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Viajes</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-3xl text-center">
          <p className="text-2xl font-bold text-amber-900">8</p>
          <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Reseñas</p>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-emerald-950">Actividad Reciente</h3>
          <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 font-bold">{bookings.length}</Badge>
        </div>
        
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const dest = destinations.find(d => d.id === booking.destinationId);
              return (
                <div key={booking.id} className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-100">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                    <img src={dest?.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-emerald-950 text-sm leading-tight">{dest?.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{booking.date}</p>
                    <div className="flex items-center justify-between mt-2">
                       <span className="text-xs font-bold text-emerald-600">{booking.totalPrice}</span>
                       <Badge variant="outline" className="text-[9px] uppercase border-emerald-100 text-emerald-700 bg-emerald-50 px-2 py-0 h-5 font-bold">{booking.status}</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-10 bg-gray-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-100">
            <div className="text-center space-y-2">
              <Package size={32} className="mx-auto text-gray-200" />
              <p className="text-xs text-gray-400 font-medium tracking-tight">No tienes reservas activas aún</p>
              <Button variant="link" className="text-emerald-600 text-xs font-bold p-0">Ver experiencias</Button>
            </div>
          </div>
        )}
      </div>

      {/* Menu Options */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-emerald-950 px-2">Configuración</h3>
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className="w-full p-4 flex items-center justify-between bg-white rounded-2xl hover:bg-emerald-50/50 transition-all group border border-gray-50 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className={`${item.bg} ${item.color} p-3 rounded-xl shadow-xs`}>
                <item.icon size={20} />
              </div>
              <span className="font-bold text-emerald-950 text-sm">{item.label}</span>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-emerald-600 transition-colors" size={18} />
          </button>
        ))}
      </div>

      <Separator className="bg-gray-100" />

      <Button variant="ghost" className="w-full h-16 rounded-[2rem] text-rose-500 font-bold hover:bg-rose-50 hover:text-rose-600 gap-3 border border-transparent hover:border-rose-100 transition-all">
        <LogOut size={20} />
        Cerrar Sesión
      </Button>

      <p className="text-center text-[10px] text-gray-300 font-medium">TurismoLocal v2.4.0 • Hecho en Perú 🇵🇪</p>
    </div>
  );
}

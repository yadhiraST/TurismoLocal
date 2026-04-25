import { Home, Search, Map as MapIcon, Heart, User, LayoutDashboard, PlusCircle } from 'lucide-react';
import { Screen, Role } from '../types.ts';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  role: Role;
}

export default function BottomNav({ currentScreen, onNavigate, role }: BottomNavProps) {
  if (role === 'guide') {
    return (
      <div className="absolute bottom-6 left-6 right-6 h-20 bg-white border border-gray-100 shadow-2xl rounded-[2rem] flex items-center justify-around px-2 z-50">
        <NavButton 
          active={currentScreen === 'guide_dashboard'} 
          onClick={() => onNavigate('guide_dashboard')} 
          icon={LayoutDashboard} 
          label="Panel"
        />
        <div className="relative -top-8">
          <button 
            onClick={() => onNavigate('guide_experience_form')} 
            className="h-16 w-16 bg-emerald-600 rounded-full shadow-lg shadow-emerald-600/30 flex items-center justify-center text-white border-4 border-white"
          >
            <PlusCircle className="h-8 w-8" />
          </button>
        </div>
        <NavButton 
          active={currentScreen === 'profile'} 
          onClick={() => onNavigate('profile')} 
          icon={User} 
          label="Perfil"
        />
      </div>
    );
  }

  return (
    <div className="absolute bottom-6 left-6 right-6 h-20 bg-emerald-950 shadow-2xl rounded-[2rem] flex items-center justify-around px-2 z-50">
      <NavButton 
        light
        active={currentScreen === 'home'} 
        onClick={() => onNavigate('home')} 
        icon={Home} 
        label="Explora"
      />
      <NavButton 
        light
        active={currentScreen === 'map'} 
        onClick={() => onNavigate('map')} 
        icon={MapIcon} 
        label="Mapa"
      />
      <NavButton 
        light
        active={currentScreen === 'favorites'} 
        onClick={() => onNavigate('favorites')} 
        icon={Heart} 
        label="Favoritos"
      />
      <NavButton 
        light
        active={currentScreen === 'profile'} 
        onClick={() => onNavigate('profile')} 
        icon={User} 
        label="Perfil"
      />
    </div>
  );
}

function NavButton({ 
  active, 
  onClick, 
  icon: Icon, 
  label,
  light = false
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: any; 
  label: string;
  light?: boolean;
}) {
  const activeColor = light ? 'text-emerald-400' : 'text-emerald-600';
  const inactiveColor = light ? 'text-emerald-800' : 'text-gray-400';

  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 transition-all"
    >
      <div className={`transition-all duration-300 ${active ? 'scale-110' : 'scale-100'}`}>
        <Icon className={`h-6 w-6 ${active ? activeColor : inactiveColor}`} />
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-widest ${active ? activeColor : inactiveColor}`}>
        {label}
      </span>
    </button>
  );
}

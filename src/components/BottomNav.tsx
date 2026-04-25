import { Home, Map as MapIcon, Heart, User, LayoutDashboard, PlusCircle } from 'lucide-react';
import { Screen, Role } from '../types.ts';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  role: Role;
}

export default function BottomNav({ currentScreen, onNavigate, role }: BottomNavProps) {
  if (role === 'guide') {
    return (
      <div className="w-full h-[72px] bg-white border-t border-gray-100 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] flex items-center justify-around px-4">
        <NavButton 
          active={currentScreen === 'guide_dashboard'} 
          onClick={() => onNavigate('guide_dashboard')} 
          icon={LayoutDashboard} 
          label="Panel"
        />

        <button 
          onClick={() => onNavigate('guide_experience_form')} 
          className="h-14 w-14 bg-emerald-600 rounded-full shadow-lg shadow-emerald-600/25 flex items-center justify-center text-white active:scale-95 transition-all"
        >
          <PlusCircle className="h-7 w-7" />
        </button>

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
    <div className="w-full h-[72px] bg-emerald-950 flex items-center justify-around px-2 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
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
  const activeColor = light ? 'text-emerald-300' : 'text-emerald-600';
  const inactiveColor = light ? 'text-emerald-700' : 'text-gray-400';

  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95 flex-1 h-full"
    >
      <Icon className={`h-5 w-5 ${active ? activeColor : inactiveColor}`} />
      <span className={`text-[9px] font-bold uppercase tracking-widest ${active ? activeColor : inactiveColor}`}>
        {label}
      </span>
    </button>
  );
}

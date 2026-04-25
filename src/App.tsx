import { useState, useMemo } from 'react';
import { Screen, Destination, Booking, Role } from './types.ts';
import BottomNav from './components/BottomNav.tsx';
import HomeScreen from './components/HomeScreen.tsx';
import DetailScreen from './components/DetailScreen.tsx';
import SearchScreen from './components/SearchScreen.tsx';
import FavoritesScreen from './components/FavoritesScreen.tsx';
import ProfileScreen from './components/ProfileScreen.tsx';
import Onboarding from './components/Onboarding.tsx';
import AuthScreen from './components/AuthScreen.tsx';
import MapScreen from './components/MapScreen.tsx';
import GuideDashboard from './components/guide/GuideDashboard.tsx';
import ExperienceForm from './components/guide/ExperienceForm.tsx';
import { ScrollArea } from './components/ui/scroll-area.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { toast } from 'sonner';
import GuideProfile from './components/guide/GuideProfile.tsx';
import GuideRegisterScreen from './components/guide/GuideRegisterScreen.tsx';
import GuideVerificationPending from './components/guide/GuideVerificationPending.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [prevScreen, setPrevScreen] = useState<Screen>('home');
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['1', '3']);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [guideStatus, setGuideStatus] = useState<'pending' | 'verified' | null>(null);

  const handleSelectDestination = (dest: Destination) => {
    setPrevScreen(currentScreen);
    setSelectedDestination(dest);
    setCurrentScreen('detail');
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      const isFav = prev.includes(id);
      if (isFav) {
        toast.info('Removido de favoritos');
        return prev.filter(fid => fid !== id);
      }
      toast.success('Agregado a favoritos');
      return [...prev, id];
    });
  };

  const handleLogin = (role: Role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    
    if (role === 'tourist') {
      setCurrentScreen('home');
      toast.success('Bienvenido Viajero');
    } else {
      // Guía: mostrar registro primero
      setGuideStatus(null);
      setCurrentScreen('guide_register');
    }
  };

  const handleGuideRegisterComplete = () => {
    setGuideStatus('pending');
    setCurrentScreen('guide_verification_pending');
  };

  const handleGuideLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setGuideStatus(null);
    setCurrentScreen('onboarding');
  };

  const renderScreen = useMemo(() => {
    // Flows before Login
    if (currentScreen === 'onboarding') {
      return <Onboarding onComplete={() => setCurrentScreen('auth')} />;
    }
    if (currentScreen === 'auth') {
      return <AuthScreen onBack={() => setCurrentScreen('onboarding')} onLogin={handleLogin} />;
    }

    // Registro de Guía (paso 1)
    if (currentScreen === 'guide_register') {
      return (
        <GuideRegisterScreen 
          onBack={() => setCurrentScreen('auth')} 
          onRegisterComplete={handleGuideRegisterComplete} 
        />
      );
    }

    // Pantalla de espera de verificación (paso 2)
    if (currentScreen === 'guide_verification_pending') {
      return <GuideVerificationPending onLogout={handleGuideLogout} />;
    }

    // Common Detail Screen
    if (currentScreen === 'detail' && selectedDestination) {
      return (
        <DetailScreen 
          destination={selectedDestination} 
          onBack={() => setCurrentScreen(prevScreen)}
        />
      );
    }

    // Guide Flow (solo para guías VERIFICADOS)
    if (userRole === 'guide') {
      // Si está pendiente, redirigir a pantalla de espera
      if (guideStatus === 'pending') {
        return <GuideVerificationPending onLogout={handleGuideLogout} />;
      }
      
      // Si está verificado, mostrar dashboard
      switch (currentScreen) {
        case 'guide_dashboard':
          return <GuideDashboard />;
        case 'guide_experience_form':
          return <ExperienceForm onBack={() => setCurrentScreen('guide_dashboard')} />;
        case 'profile':
          return <GuideProfile onLogout={handleGuideLogout} />;
        default:
          return <GuideDashboard />;
      }
    }

    // Tourist Flow
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onSelectDestination={handleSelectDestination} />;
      case 'search':
        return <SearchScreen onSelectDestination={handleSelectDestination} />;
      case 'map':
        return <MapScreen onSelectDestination={handleSelectDestination} />;
      case 'favorites':
        return (
          <FavoritesScreen 
            favoriteIds={favoriteIds} 
            onSelectDestination={handleSelectDestination}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'profile':
        return <ProfileScreen bookings={bookings} />;
      default:
        return <HomeScreen onSelectDestination={handleSelectDestination} />;
    }
  }, [currentScreen, selectedDestination, favoriteIds, bookings, prevScreen, userRole, isLoggedIn, guideStatus]);

  const showNav = isLoggedIn && userRole === 'tourist' && !['detail', 'onboarding', 'auth', 'guide_register', 'guide_verification_pending'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-0 md:p-4 font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Toaster position="top-center" richColors />
      
      <div className="w-full max-w-md bg-white min-h-screen md:min-h-[85vh] md:h-[90vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative flex flex-col overflow-hidden md:rounded-[3rem] md:border-[12px] md:border-black ring-1 ring-white/10">
        {/* Dynamic status bar for mobile feel */}
        {isLoggedIn && (
          <div className="h-6 w-full bg-white flex items-center justify-between px-8 pt-2">
            <span className="text-[10px] font-bold">9:41</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-3.5 h-2 border border-black rounded-xs" />
              <div className="w-3.5 h-3.5 bg-black rounded-full scale-50" />
            </div>
          </div>
        )}

        <ScrollArea className="flex-1 w-full bg-white">
          {renderScreen}
        </ScrollArea>
        
        {showNav && (
          <BottomNav 
            role={userRole || 'tourist'}
            currentScreen={currentScreen} 
            onNavigate={(screen) => setCurrentScreen(screen)} 
          />
        )}
      </div>
    </div>
  );
}
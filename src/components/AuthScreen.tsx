import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Mail, Chrome, ArrowLeft } from 'lucide-react';
import { Role } from '../types.ts';

interface AuthScreenProps {
  onBack: () => void;
  onLogin: (role: Role) => void;
}

export default function AuthScreen({ onBack, onLogin }: AuthScreenProps) {
  const [selectedRole, setSelectedRole] = useState<Role>('tourist');

  return (
    <div className="h-full bg-white flex flex-col p-8">
      <button onClick={onBack} className="p-2 -ml-2 mb-8 hover:bg-gray-100 rounded-full w-fit">
        <ArrowLeft className="h-6 w-6 text-gray-700" />
      </button>

      <div className="mb-10">
        <h1 className="text-4xl font-bold font-serif text-emerald-950 mb-2">Bienvenido</h1>
        <p className="text-gray-500">Únete a la mayor red de turismo local en Perú.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setSelectedRole('tourist')}
          className={`p-4 rounded-2xl border-2 transition-all text-left ${selectedRole === 'tourist' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-100 bg-gray-50'}`}
        >
          <div className={`w-8 h-8 rounded-full mb-3 flex items-center justify-center ${selectedRole === 'tourist' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            <span className="text-xs font-bold">T</span>
          </div>
          <p className="font-bold text-sm text-emerald-950">Soy Turista</p>
          <p className="text-[10px] text-gray-500">Quiero viajar y conocer.</p>
        </button>
        <button
          onClick={() => setSelectedRole('guide')}
          className={`p-4 rounded-2xl border-2 transition-all text-left ${selectedRole === 'guide' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-100 bg-gray-50'}`}
        >
          <div className={`w-8 h-8 rounded-full mb-3 flex items-center justify-center ${selectedRole === 'guide' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            <span className="text-xs font-bold">G</span>
          </div>
          <p className="font-bold text-sm text-emerald-950">Soy Guía</p>
          <p className="text-[10px] text-gray-500">Quiero ofrecer mis rutas.</p>
        </button>
      </div>

      <div className="space-y-4 flex-1">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Correo Electrónico</label>
          <Input 
            placeholder="ejemplo@gmail.com" 
            className="h-14 rounded-2xl border-gray-100 bg-gray-50"
          />
        </div>
        <Button 
          className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-lg"
          onClick={() => onLogin(selectedRole)}
        >
          Continuar con Correo
        </Button>
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">o</span></div>
        </div>
        <Button 
          variant="outline"
          className="w-full h-14 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl text-lg"
          onClick={() => onLogin(selectedRole)}
        >
          <Chrome className="mr-2 h-5 w-5 text-red-500" />
          Registrarse con Google
        </Button>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-8">
        Al continuar, aceptas nuestros Términos de Servicio y <br /> Política de Privacidad.
      </p>
    </div>
  );
}

import { motion } from 'motion/react';
import { Clock, Mail, CheckCircle2, Award } from 'lucide-react';
import { Button } from '../ui/button.tsx';  // ← Cambiado de ./ui a ../ui

interface GuideVerificationPendingProps {
  onLogout: () => void;
}

export default function GuideVerificationPending({ onLogout }: GuideVerificationPendingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md w-24 h-24 rounded-full flex items-center justify-center mb-6"
      >
        <Clock className="h-12 w-12 text-amber-400" />
      </motion.div>

      <h1 className="text-2xl font-bold text-white font-serif mb-2">¡Casi listo!</h1>
      <p className="text-emerald-200 text-sm mb-6">
        Tu solicitud está siendo revisada por nuestro equipo.
      </p>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 w-full">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <p className="text-white text-sm text-left">DNI verificado</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-amber-400" />
            <p className="text-white text-sm text-left">Revisión de datos personales</p>
          </div>
          <div className="flex items-center gap-3">
            <Award size={18} className="text-amber-400" />
            <p className="text-white text-sm text-left">Certificación MINCETUR (opcional)</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/20 rounded-xl p-4 mb-8 flex gap-3">
        <Mail size={18} className="text-amber-300" />
        <p className="text-xs text-amber-200 text-left">
          Te enviaremos un correo cuando tu cuenta esté verificada. <br />
          Por lo general, esto toma entre 24 y 48 horas.
        </p>
      </div>

      <Button onClick={onLogout} variant="outline" className="border-white/30 text-white hover:bg-white/10">
        Volver al inicio
      </Button>
    </div>
  );
}
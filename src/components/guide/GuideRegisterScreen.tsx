import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, CheckCircle2, AlertCircle, Award, Camera, FileText, Shield } from 'lucide-react';
import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input.tsx';
import { Label } from '../ui/label.tsx';
import { Textarea } from '../ui/textarea.tsx';
import { toast } from 'sonner';

interface GuideRegisterScreenProps {
  onBack: () => void;
  onRegisterComplete: () => void;
}

export default function GuideRegisterScreen({ onBack, onRegisterComplete }: GuideRegisterScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    phone: '',
    email: '',
    bio: '',
    location: '',
    languages: '',
    hasMincetur: false,
    minceturId: '',
  });
  const [dniPhoto, setDniPhoto] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [certificatePhoto, setCertificatePhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (setter: (url: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
      toast.success('Archivo subido correctamente');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simular envío a backend
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Registro enviado. Revisaremos tus datos en 24-48 horas.');
      onRegisterComplete();
    }, 1500);
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.fullName && formData.dni && formData.phone && formData.email && dniPhoto && profilePhoto;
    }
    if (step === 2) {
      return formData.bio && formData.location && formData.languages;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 pt-12 pb-8 px-6 rounded-b-3xl">
        <button onClick={onBack} className="p-2 -ml-2 mb-4 hover:bg-white/10 rounded-full">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-emerald-300" />
          <div>
            <h1 className="text-2xl font-bold text-white font-serif">Conviértete en Guía</h1>
            <p className="text-emerald-200 text-sm">Únete a la red de turismo local</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s ? <CheckCircle2 size={16} /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 mx-2 ${step > s ? 'bg-emerald-600' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>
          
          <p className="text-center text-xs text-gray-500">
            {step === 1 && 'Paso 1: Verificación de identidad'}
            {step === 2 && 'Paso 2: Perfil profesional'}
            {step === 3 && 'Paso 3: Certificación (opcional)'}
          </p>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* PASO 1: DNI + FOTO */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <div className="flex gap-2">
                <Shield size={18} className="text-amber-600" />
                <p className="text-xs text-amber-700">Tus datos están seguros. Solo los usamos para verificar tu identidad.</p>
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-500 uppercase">Nombre completo</Label>
              <Input 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="Ej: Carlos Alberto Mendoza"
                className="mt-1 h-12 rounded-xl border-gray-200"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-500 uppercase">Número de DNI</Label>
              <Input 
                value={formData.dni}
                onChange={(e) => setFormData({...formData, dni: e.target.value})}
                placeholder="Ej: 12345678"
                className="mt-1 h-12 rounded-xl border-gray-200"
                maxLength={8}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold text-gray-500 uppercase">Teléfono</Label>
                <Input 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="987654321"
                  className="mt-1 h-12 rounded-xl"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-500 uppercase">Correo</Label>
                <Input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="carlos@email.com"
                  className="mt-1 h-12 rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-500 uppercase">Foto de DNI (frontal)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                {dniPhoto ? (
                  <div className="relative">
                    <img src={dniPhoto} className="w-full h-40 object-cover rounded-lg" />
                    <button onClick={() => setDniPhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">✕</button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Haz clic para subir foto de tu DNI</p>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload(setDniPhoto)} />
                  </label>
                )}
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-500 uppercase">Foto de perfil</Label>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                {profilePhoto ? (
                  <div className="relative w-32 h-32 mx-auto">
                    <img src={profilePhoto} className="w-full h-full object-cover rounded-full" />
                    <button onClick={() => setProfilePhoto(null)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">✕</button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Sube una foto real tuya</p>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload(setProfilePhoto)} />
                  </label>
                )}
              </div>
            </div>

            <Button onClick={() => setStep(2)} disabled={!canProceed()} className="w-full h-12 bg-emerald-600 text-white rounded-xl">
              Continuar
            </Button>
          </motion.div>
        )}

        {/* PASO 2: BIografía y ubicación */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div>
              <Label className="text-xs font-bold text-gray-500 uppercase">Biografía</Label>
              <Textarea 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Cuéntanos sobre ti, tu experiencia como guía y por qué te apasiona mostrar tu tierra..."
                className="mt-1 min-h-[120px] rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-500 uppercase">Ubicación</Label>
              <Input 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Ej: Cusco, Perú"
                className="mt-1 h-12 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-500 uppercase">Idiomas que hablas</Label>
              <Input 
                value={formData.languages}
                onChange={(e) => setFormData({...formData, languages: e.target.value})}
                placeholder="Ej: Español, Inglés, Quechua"
                className="mt-1 h-12 rounded-xl"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 rounded-xl">Atrás</Button>
              <Button onClick={() => setStep(3)} disabled={!canProceed()} className="flex-1 h-12 bg-emerald-600 text-white rounded-xl">
                Siguiente
              </Button>
            </div>
          </motion.div>
        )}

        {/* PASO 3: Certificación MINCETUR (opcional) */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <div className="flex gap-2">
                <Award size={18} className="text-emerald-600" />
                <div>
                  <p className="text-sm font-bold text-emerald-800">Certificación MINCETUR (Opcional)</p>
                  <p className="text-xs text-emerald-600 mt-1">Los guías certificados aparecen destacados y generan más confianza.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.hasMincetur}
                  onChange={(e) => setFormData({...formData, hasMincetur: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm font-medium">Tengo certificación MINCETUR</span>
              </div>
            </div>

            {formData.hasMincetur && (
              <div>
                <Label className="text-xs font-bold text-gray-500 uppercase">Número de certificación</Label>
                <Input 
                  value={formData.minceturId}
                  onChange={(e) => setFormData({...formData, minceturId: e.target.value})}
                  placeholder="Ej: MINCETUR-2023-089"
                  className="mt-1 h-12 rounded-xl"
                />
              </div>
            )}

            {formData.hasMincetur && (
              <div>
                <Label className="text-xs font-bold text-gray-500 uppercase">Certificado (foto)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                  {certificatePhoto ? (
                    <div className="relative">
                      <img src={certificatePhoto} className="w-full h-40 object-cover rounded-lg" />
                      <button onClick={() => setCertificatePhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">✕</button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">Sube foto de tu certificado MINCETUR</p>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload(setCertificatePhoto)} />
                    </label>
                  )}
                </div>
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mt-4">
              <div className="flex gap-2">
                <AlertCircle size={18} className="text-amber-600" />
                <p className="text-xs text-amber-700">
                  <b>Verificación en 24-48 horas</b><br />
                  Nuestro equipo revisará tus datos. Recibirás un correo cuando tu cuenta esté verificada.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 rounded-xl">Atrás</Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 h-12 bg-emerald-600 text-white rounded-xl">
                {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
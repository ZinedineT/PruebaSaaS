import React, { useState } from 'react';
import { 
  UserPlus, Rocket, Building2, CheckCircle2, 
  ArrowRight, ArrowLeft, Globe, Shield, 
  Mail, Phone, CreditCard, Sparkles
} from 'lucide-react';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);

  // Pasos del Onboarding
  const steps = [
    { id: 1, label: 'Empresa', icon: <Building2 size={20} /> },
    { id: 2, label: 'Plan y Acceso', icon: <Shield size={20} /> },
    { id: 3, label: 'Finalizar', icon: <Rocket size={20} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* HEADER CON STEPS INDICATOR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <UserPlus className="text-blue-500" size={32} />
            Nuevo Onboarding
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-2 font-medium">
            Registra una nueva empresa y configura su entorno en segundos.
          </p>
        </div>

        {/* INDICADOR DE PASOS ESTILO BENTO */}
        <div className="flex bg-white dark:bg-[#161b22] p-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          {steps.map((s) => (
            <div 
              key={s.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                step === s.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {s.icon}
              <span className="text-sm font-bold hidden sm:block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LADO IZQUIERDO: FORMULARIO PRINCIPAL */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-6 lg:p-10 shadow-sm">
            
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black dark:text-white">Datos de la Empresa</h2>
                    <p className="text-sm text-gray-500">Información legal y contacto principal.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">RUC de la Empresa</label>
                    <input type="text" placeholder="20123456789" className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:text-white font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">Razón Social</label>
                    <input type="text" placeholder="Empresa S.A.C" className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:text-white font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">Correo Administrativo</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="email" placeholder="admin@empresa.com" className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:text-white font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">Teléfono</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" placeholder="+51 900 000 000" className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:text-white font-bold" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black dark:text-white">Plan y Dominio</h2>
                    <p className="text-sm text-gray-500">Configuración de acceso a la plataforma.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">Subdominio del Sistema</label>
                    <div className="flex items-center">
                      <input type="text" placeholder="mi-tienda" className="flex-1 px-5 py-4 rounded-l-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:text-white font-black text-right" />
                      <div className="px-5 py-4 bg-gray-200 dark:bg-gray-700 rounded-r-2xl text-gray-500 dark:text-gray-300 font-bold border border-transparent border-l-gray-300 dark:border-l-gray-600">
                        .tuplataforma.com
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">Plan Seleccionado</label>
                    <select className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white font-bold outline-none focus:ring-4 focus:ring-blue-500/10">
                      <option>Plan Emprendedor (S/ 99)</option>
                      <option>Plan Business (S/ 199)</option>
                      <option>Plan Enterprise (S/ 499)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">Ciclo de Facturación</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-4 rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black text-xs uppercase">Mensual</button>
                      <button className="py-4 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 font-bold text-xs uppercase hover:bg-gray-50">Anual (-20%)</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BOTONES DE NAVEGACIÓN */}
            <div className="mt-12 flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-8">
              <button 
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <ArrowLeft size={18} />
                Atrás
              </button>
              
              <button 
                onClick={() => setStep(Math.min(3, step + 1))}
                className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/25 transition-all hover:-translate-y-1 active:scale-95"
              >
                {step === 3 ? 'Crear Plataforma' : 'Siguiente Paso'}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: RESUMEN BENTO (SIDERBAR) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1e293b] dark:bg-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black flex items-center gap-2">
                <CheckCircle2 size={24} />
                Resumen
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-blue-100 text-sm font-medium">Empresa</span>
                  <span className="font-bold">--</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-blue-100 text-sm font-medium">Plan</span>
                  <span className="font-bold">Emprendedor</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-blue-100 text-sm font-medium">Total a pagar</span>
                  <span className="text-2xl font-black">S/ 99.00</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">Estado del Proceso</p>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
                </div>
              </div>
            </div>
            
            {/* Decoración geométrica */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                  <Globe size={20} />
                </div>
                <span className="font-black text-sm uppercase dark:text-white">Infraestructura</span>
             </div>
             <p className="text-xs text-gray-500 font-medium leading-relaxed">
               Al confirmar, se desplegará una nueva instancia de base de datos y almacenamiento en AWS para el cliente.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
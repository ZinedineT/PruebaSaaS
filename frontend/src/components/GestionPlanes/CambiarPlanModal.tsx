import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  CheckIcon, 
  ArrowsRightLeftIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

interface CambiarPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: { empresa: string; planActual: string; ruc: string } | null;
  onConfirm: (data: { nuevoPlan: string; monto: string; fechaInicio: string }) => void;
}

const planesDisponibles = [
  { id: 'Básico', precio: '100', color: 'text-gray-500', bg: 'bg-gray-50' },
  { id: 'Premium', precio: '300', color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'Ilimitado', precio: '500', color: 'text-purple-500', bg: 'bg-purple-50' },
];

const CambiarPlanModal: React.FC<CambiarPlanModalProps> = ({ isOpen, onClose, cliente, onConfirm }) => {
  const [nuevoPlan, setNuevoPlan] = useState('');
  const [monto, setMonto] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (cliente) {
      setNuevoPlan(cliente.planActual);
      const planInfo = planesDisponibles.find(p => p.id === cliente.planActual);
      setMonto(planInfo?.precio || '0');
    }
  }, [cliente, isOpen]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !cliente) return null;

  return (
    // Contenedor principal - MISMA ESTRUCTURA QUE TU MODAL FUNCIONAL
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      
      {/* Overlay con desenfoque real a pantalla completa */}
      <div 
        className="fixed inset-0 bg-gray-900/70 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* Contenedor del Modal - Con animación de zoom y centrado forzado */}
      <div className="relative bg-white dark:bg-[#0f1115] w-[95%] max-w-lg rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 flex flex-col my-auto">
        
        {/* Header con Decoración */}
        <div className="relative px-8 py-8 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f1115] shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                <RocketLaunchIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                  Cambiar Plan
                </h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-[0.2em] mt-2">
                  {cliente.empresa} • RUC: {cliente.ruc}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 rounded-xl transition-all"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body con Scroll Interno si es necesario */}
        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
          
          {/* Comparativa Visual */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="text-center flex-1">
              <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Actual</p>
              <span className="text-sm font-black text-gray-700 dark:text-gray-300 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl inline-block">
                {cliente.planActual}
              </span>
            </div>
            <ArrowsRightLeftIcon className="w-5 h-5 text-blue-500 animate-pulse" />
            <div className="text-center flex-1">
              <p className="text-[9px] font-black text-blue-500 uppercase mb-1">Nuevo</p>
              <span className="text-sm font-black text-blue-600 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl inline-block">
                {nuevoPlan || 'Seleccione'}
              </span>
            </div>
          </div>

          {/* Selector de Planes */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Selecciona el Nuevo Plan
            </label>
            <div className="grid grid-cols-3 gap-3">
              {planesDisponibles.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => { setNuevoPlan(plan.id); setMonto(plan.precio); }}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    nuevoPlan === plan.id 
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10 shadow-lg shadow-blue-500/10' 
                      : 'border-transparent bg-gray-50 dark:bg-gray-800/50 hover:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className={`text-[11px] font-black uppercase ${plan.color}`}>{plan.id}</span>
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">S/ {plan.precio}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Inputs de Configuración */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <CurrencyDollarIcon className="w-4 h-4" /> Monto (S/)
              </label>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none dark:text-white font-bold transition-all"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <CalendarIcon className="w-4 h-4" /> Fecha Inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none dark:text-white font-bold transition-all"
              />
            </div>
          </div>

          {/* Información Adicional */}
          <div className="p-4 bg-amber-50/30 dark:bg-amber-500/5 rounded-2xl border border-amber-200 dark:border-amber-500/20">
            <p className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              ⚡ Nota importante
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              El cambio de plan se aplicará desde la fecha seleccionada. El costo se prorrateará automáticamente.
            </p>
          </div>
        </div>

        {/* Footer de Acciones */}
        <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0f1115] flex gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm({ nuevoPlan, monto: `S/ ${monto}`, fechaInicio })}
            className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <CheckIcon className="w-4 h-4" />
            Confirmar Cambio
          </button>
        </div>
      </div>
    </div>
  );
};

export default CambiarPlanModal;
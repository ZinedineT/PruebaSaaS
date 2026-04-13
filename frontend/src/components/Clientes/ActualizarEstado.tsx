import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Trash2, Info, Receipt } from 'lucide-react';

interface ActualizarEstadoProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
}

const ActualizarEstado: React.FC<ActualizarEstadoProps> = ({ isOpen, onClose, cliente }) => {
  const [motivo, setMotivo] = useState('');
  const [voucher, setVoucher] = useState('');

  if (!isOpen || !cliente) return null;

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#161b22] w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/20">
              <AlertCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black dark:text-white uppercase tracking-tight">Actualizar Estado</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase">{cliente.nombre}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={18} className="dark:text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* ESTADO ACTUAL */}
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado Actual</span>
            <div className="flex justify-center">
              <span className="px-6 py-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-full text-xs font-black uppercase border border-blue-200 dark:border-blue-500/20">
                🔵 Registrado
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium px-4">
              El cliente completó su registro y está pendiente de validación.
            </p>
          </div>

          {/* ACCIONES PRINCIPALES */}
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 size={18} />
                  <span className="text-xs font-black uppercase">Habilitar Cliente</span>
                </div>
                <div className="relative">
                  <Receipt size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input 
                    type="text" 
                    placeholder="Voucher N.°"
                    className="pl-8 pr-4 py-2 bg-white dark:bg-gray-900 border-none rounded-lg text-[10px] font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-[10px] text-emerald-600/70 font-medium italic leading-tight">
                * Habilitar solo cuando el pago ya fue validado en las cuentas bancarias.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-amber-50 dark:hover:bg-amber-500/10 text-gray-500 hover:text-amber-600 rounded-2xl border border-transparent hover:border-amber-200 transition-all group">
                <AlertCircle size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase">Suspender</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-gray-500 hover:text-rose-600 rounded-2xl border border-transparent hover:border-rose-200 transition-all group">
                <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase">Cancelar</span>
              </button>
            </div>
          </div>

          {/* MOTIVO */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 ml-2 uppercase flex items-center gap-2">
              <Info size={14} /> Motivo del cambio (Obligatorio)
            </label>
            <textarea 
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-sm font-medium dark:text-white outline-none min-h-[80px] focus:ring-2 focus:ring-amber-500/20 transition-all"
              placeholder="Escriba el motivo aquí..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 text-[10px] font-black uppercase text-gray-500 hover:text-gray-700 transition-all">
            Descartar
          </button>
          <button className="px-10 py-4 bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/25">
            Confirmar Cambio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarEstado;
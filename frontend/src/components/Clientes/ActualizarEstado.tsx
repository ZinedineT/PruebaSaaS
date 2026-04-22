import React, { useState, useEffect,useRef } from 'react';
import { X, CheckCircle2, AlertCircle, Trash2, Info, Receipt, Ban, Eye, Save } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ActualizarEstadoProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
  onEstadoActualizado?: (ruc: string, nuevoEstado: string) => void;
}

type EstadoKey = 'REGISTRADO' | 'HABILITADO' | 'SUSPENDIDO' | 'OBSERVADO' | 'DE_BAJA';

const ActualizarEstado: React.FC<ActualizarEstadoProps> = ({ isOpen, onClose, cliente, onEstadoActualizado }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(isOpen, onClose, modalRef);
  const [motivo, setMotivo] = useState('');
  const [voucher, setVoucher] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState<EstadoKey | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMotivo('');
      setVoucher('');
      setNuevoEstado(null);
    }
  }, [isOpen]);

  if (!isOpen || !cliente) return null;

  const estadosConfig: Record<string, any> = {
    REGISTRADO: { label: 'Registrado', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: '🔵' },
    HABILITADO: { label: 'Habilitado', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: '🟢' },
    SUSPENDIDO: { label: 'Suspendido', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: '🟠' },
    OBSERVADO: { label: 'Observado', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20', icon: '🔍' },
    DE_BAJA: { label: 'De Baja', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20', icon: '🔴' },
  };

  const estadoActual: EstadoKey = cliente.estado || 'HABILITADO';

  const handleConfirmar = () => {
    if (!nuevoEstado) return;
    if (onEstadoActualizado) onEstadoActualizado(cliente.ruc, nuevoEstado);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
      <div ref={modalRef} className="bg-white dark:bg-[#0d1117] w-full max-w-lg rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
        
        {/* HEADER PREMIUM */}
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-[#161b22]/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-500/20">
              <AlertCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black dark:text-white tracking-tighter uppercase">Cambiar estado</h2>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{cliente.nombre}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-rose-500/10 text-gray-400 hover:text-rose-500 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* VISUALIZACIÓN DEL ESTADO ACTUAL */}
          <div className="flex flex-col items-center py-6 bg-gray-50/50 dark:bg-[#161b22]/30 rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3">Situación Actual</span>
            <div className={`px-6 py-2 rounded-full text-xs font-black uppercase border shadow-sm ${estadosConfig[estadoActual]?.color}`}>
              {estadosConfig[estadoActual]?.icon} {estadosConfig[estadoActual]?.label}
            </div>
          </div>

          {/* SELECTORES DE ACCIÓN */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-4 tracking-widest">Seleccionar nueva acción</label>
            
            {/* Habilitar - Card Grande */}
            <button 
              onClick={() => setNuevoEstado('HABILITADO')}
              className={`w-full p-5 rounded-[2rem] border-2 transition-all flex flex-col gap-3 group ${
                nuevoEstado === 'HABILITADO' 
                ? 'bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/10' 
                : 'bg-white dark:bg-[#161b22] border-transparent hover:border-emerald-500/30'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`flex items-center gap-3 ${nuevoEstado === 'HABILITADO' ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500'}`}>
                  <CheckCircle2 size={22} />
                  <span className="text-xs font-black uppercase tracking-tight">Habilitar y Activar Acceso</span>
                </div>
                {nuevoEstado === 'HABILITADO' && (
                  <div className="flex items-center gap-2 animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                    <Receipt size={14} className="text-emerald-500" />
                    <input 
                      autoFocus
                      placeholder="N° Voucher"
                      className="w-28 px-3 py-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] text-gray-400 dark:text-gray-100 font-black border border-emerald-500/30 outline-none focus:ring-2 focus:ring-emerald-500/20"
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </button>

            {/* Grid de acciones secundarias */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'SUSPENDIDO', icon: Ban, label: 'Suspender', color: 'amber' },
                { id: 'OBSERVADO', icon: Eye, label: 'Observar', color: 'indigo' },
                { id: 'DE_BAJA', icon: Trash2, label: 'Dar de baja', color: 'rose' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setNuevoEstado(item.id as EstadoKey)}
                  className={`flex flex-col items-center justify-center gap-3 p-5 rounded-[2rem] border-2 transition-all group ${
                    nuevoEstado === item.id 
                    ? `bg-${item.color}-500/10 border-${item.color}-500 text-${item.color}-500 shadow-lg shadow-${item.color}-500/10` 
                    : 'bg-white dark:bg-[#161b22] border-transparent text-gray-400 hover:border-gray-200 dark:hover:border-gray-700'
                  }`}
                >
                  <item.icon size={20} className={nuevoEstado === item.id ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
                  <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* MOTIVO OBLIGATORIO */}
          <div className="space-y-3">
            <div className="flex justify-between items-center ml-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Info size={14} /> Motivo del cambio
              </label>
              <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter">* Requerido</span>
            </div>
            <textarea 
              className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/40 border-2 border-transparent focus:border-amber-500/20 rounded-[2rem] text-sm font-medium dark:text-gray-200 outline-none min-h-[100px] transition-all"
              placeholder="Escriba el motivo técnico o administrativo del cambio..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-8 bg-gray-50 dark:bg-[#161b22]/80 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 hover:text-gray-600 transition-all">
            Cancelar
          </button>
          <button 
            disabled={!nuevoEstado || !motivo || (nuevoEstado === 'HABILITADO' && !voucher)}
            onClick={handleConfirmar}
            className={`px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
              !nuevoEstado || !motivo || (nuevoEstado === 'HABILITADO' && !voucher)
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
              : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/20 hover:-translate-y-1 active:scale-95'
            }`}
          >
            <Save size={18} />
            Confirmar Cambio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarEstado;
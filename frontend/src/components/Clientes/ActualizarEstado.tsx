import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Trash2, Info, Receipt, Ban } from 'lucide-react';

interface ActualizarEstadoProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
  onEstadoActualizado?: (ruc: string, nuevoEstado: string) => void;
}

// Tipos de estado admitidos
type EstadoKey = 'REGISTRADO' | 'HABILITADO' | 'SUSPENDIDO' | 'CANCELADO';

const ActualizarEstado: React.FC<ActualizarEstadoProps> = ({ isOpen, onClose, cliente, onEstadoActualizado }) => {
  const [motivo, setMotivo] = useState('');
  const [voucher, setVoucher] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState<EstadoKey | null>(null);

  // Reset al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setMotivo('');
      setVoucher('');
      setNuevoEstado(null);
    }
  }, [isOpen]);

  if (!isOpen || !cliente) return null;

  // Mapeo de estilos para el estado actual (viene del cliente)
  const estadosConfig: Record<string, any> = {
    REGISTRADO: { label: 'Registrado', color: 'bg-blue-100 text-blue-600 border-blue-200', icon: '🔵' },
    HABILITADO: { label: 'Habilitado', color: 'bg-emerald-100 text-emerald-600 border-emerald-200', icon: '🟢' },
    SUSPENDIDO: { label: 'Suspendido', color: 'bg-amber-100 text-amber-600 border-amber-200', icon: '🟠' },
    CANCELADO: { label: 'Cancelado', color: 'bg-rose-100 text-rose-600 border-rose-200', icon: '🔴' },
  };

  const estadoActual: EstadoKey = cliente.estado || 'HABILITADO';

  const handleConfirmar = () => {
    if (!nuevoEstado) return alert("Selecciona una acción primero");
    if (!motivo) return alert("El motivo es obligatorio");
    if (nuevoEstado === 'HABILITADO' && !voucher.trim()) {
      return alert("⚠️ Para HABILITAR un cliente, el número de voucher es obligatorio");
    }
    if (onEstadoActualizado && cliente.ruc) {
      onEstadoActualizado(cliente.ruc, nuevoEstado);
    }
    
    // Mostrar feedback y cerrar
    console.log(`✅ Cambio exitoso: ${cliente.nombre} → ${nuevoEstado}`);
    console.log(`📝 Motivo: ${motivo}`);
    if (voucher) console.log(`🎫 Voucher: ${voucher}`);
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
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
          {/* VISUALIZACIÓN DEL ESTADO ACTUAL */}
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado Actual</span>
            <div className="flex justify-center">
              <span className={`px-6 py-2 rounded-full text-xs font-black uppercase border transition-all ${estadosConfig[estadoActual]?.color || estadosConfig.REGISTRADO.color}`}>
                {estadosConfig[estadoActual]?.icon || '⚪'} {estadosConfig[estadoActual]?.label || estadoActual}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium px-4 leading-tight italic">
              Indica en qué etapa del ciclo de vida se encuentra la cuenta.
            </p>
          </div>

          {/* ACCIONES - FUNCIONAMIENTO REAL */}
          <div className="grid grid-cols-1 gap-4">
            
            {/* Botón Habilitar (Con input de Voucher) */}
            <button 
              onClick={() => setNuevoEstado('HABILITADO')}
              className={`p-4 rounded-2xl border transition-all space-y-4 text-left ${nuevoEstado === 'HABILITADO' ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' : 'bg-emerald-50/30 border-emerald-100 dark:bg-emerald-500/5 dark:border-emerald-500/10 hover:border-emerald-300'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 size={18} />
                  <span className="text-xs font-black uppercase tracking-tight">Habilitar Cliente</span>
                </div>
                {nuevoEstado === 'HABILITADO' && (
                  <div className="relative animate-in slide-in-from-right-2" onClick={(e) => e.stopPropagation()}>
                    <Receipt size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input 
                      type="text" 
                      placeholder="Voucher N.°"
                      className="pl-8 pr-4 py-2 bg-white dark:bg-gray-900 border-none rounded-lg text-[10px] font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 w-32 shadow-sm"
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <p className="text-[10px] text-emerald-600/70 font-medium italic leading-tight">
                * Activa el acceso del cliente (requiere verificación de pago).
              </p>
            </button>

            {/* Fila de Suspendido y Cancelado */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setNuevoEstado('SUSPENDIDO')}
                className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all group ${nuevoEstado === 'SUSPENDIDO' ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500 text-amber-600' : 'bg-gray-50 dark:bg-gray-800/50 border-transparent text-gray-500 hover:border-amber-200 hover:text-amber-600'}`}
              >
                <Ban size={18} className={nuevoEstado === 'SUSPENDIDO' ? '' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-[10px] font-black uppercase">Suspender</span>
              </button>

              <button 
                onClick={() => setNuevoEstado('CANCELADO')}
                className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all group ${nuevoEstado === 'CANCELADO' ? 'bg-rose-50 border-rose-500 ring-1 ring-rose-500 text-rose-600' : 'bg-gray-50 dark:bg-gray-800/50 border-transparent text-gray-500 hover:border-rose-200 hover:text-rose-600'}`}
              >
                <Trash2 size={18} className={nuevoEstado === 'CANCELADO' ? '' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-[10px] font-black uppercase">Cancelar</span>
              </button>
            </div>
          </div>

          {/* MOTIVO (OBLIGATORIO) */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 ml-2 uppercase flex items-center gap-2">
              <Info size={14} /> Motivo del cambio <span className="text-rose-500">* Obligatorio</span>
            </label>
            <textarea 
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-sm font-medium dark:text-white outline-none min-h-[80px] focus:ring-2 focus:ring-amber-500/20 transition-all border border-transparent focus:border-amber-100"
              placeholder="Escriba aquí por qué realiza este cambio..."
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
          <button 
            disabled={!nuevoEstado || !motivo}
            onClick={handleConfirmar}
            className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase transition-all shadow-xl ${!nuevoEstado || !motivo ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/25 active:scale-95'}`}
          >
            Confirmar {nuevoEstado ? nuevoEstado : 'Cambio'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarEstado;
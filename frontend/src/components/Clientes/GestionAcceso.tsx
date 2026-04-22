import React, { useState, useEffect,useRef } from 'react';
import { 
  X, Lock, Unlock, Clock,Settings, CheckCircle2, FileText, CreditCard, Calendar, AlertCircle, Ban, 
} from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface GestionAccesoProps {
  isOpen: boolean;
  onClose: () => void;
  onAccesoActualizado?: (ruc: string, nuevoEstadoAcceso: string, detalles: any) => void;
  cliente: {
    nombre: string;
    ruc: string;
    subdominio?: string;
    alias?: string;
    nombreComercial?: string;
    estadoAcceso?: 'ACTIVO' | 'BLOQUEADO_PAGO' | 'BLOQUEADO_MANUAL' | 'CORTE_TECNICO' | 'DESACTIVADO';
    periodoAdeudado?: string;
  } | null;
}

type EstadoAcceso = 'ACTIVO' | 'BLOQUEADO_PAGO' | 'BLOQUEADO_MANUAL' | 'CORTE_TECNICO' | 'DESACTIVADO';

const GestionAcceso: React.FC<GestionAccesoProps> = ({ 
  isOpen, 
  onClose, 
  onAccesoActualizado, 
  cliente 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(isOpen, onClose, modalRef);
  const [justificacion, setJustificacion] = useState('');
  const [prorrogaDias, setProrrogaDias] = useState('');
  const [voucher, setVoucher] = useState('');
  const [accionSeleccionada, setAccionSeleccionada] = useState<string | null>(null);
  const [estadoActual, setEstadoActual] = useState<EstadoAcceso>('ACTIVO');

  useEffect(() => {
    if (cliente && cliente.estadoAcceso) {
      setEstadoActual(cliente.estadoAcceso);
    }
  }, [cliente]);

  if (!isOpen || !cliente) return null;
  const handleClose = () => {
    setJustificacion('');
    setProrrogaDias('');
    setVoucher('');
    setAccionSeleccionada(null);
    onClose();
  };

  const getEstadoConfig = () => {
    switch (estadoActual) {
      case 'ACTIVO':
        return {
          icon: Unlock,
          label: 'Activo',
          color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
        };
      case 'BLOQUEADO_PAGO':
        return {
          icon: CreditCard,
          label: 'Bloqueado por pago',
          color: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10',
        };
      case 'BLOQUEADO_MANUAL':
        return {
          icon: Lock,
          label: 'Bloqueado manual',
          color: 'text-orange-600 bg-orange-50 dark:bg-orange-500/10',
        };
      case 'CORTE_TECNICO':
        return {
          icon: Settings,
          label: 'Bloqueado técnico',
          color: 'text-purple-600 bg-purple-50 dark:bg-purple-500/10',
        };
      case 'DESACTIVADO':
        return {
          icon: Ban,
          label: 'Desactivado',
          color: 'text-gray-600 bg-gray-50 dark:bg-gray-500/10',
        };
      default:
        return {
          icon: Unlock,
          label: 'Activo',
          color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
        };
    }
  };

  const estadoConfig = getEstadoConfig();
  const EstadoIcon = estadoConfig.icon;
  const isActivo = estadoActual === 'ACTIVO';
  const isBloqueadoPago = estadoActual === 'BLOQUEADO_PAGO';
  const isBloqueadoManual = estadoActual === 'BLOQUEADO_MANUAL';
  const isBloqueadoTecnico = estadoActual === 'CORTE_TECNICO';

  // ACCIONES SEGÚN EL ESTADO ACTUAL (basado en wireframe)
  const getAccionesDisponibles = () => {
    // CASO 1: Acceso actual = Activo
    if (isActivo) {
      return [
        { id: 'confirmar_pago', icon: CheckCircle2, label: 'Confirmar pago', description: 'Registrar el pago del siguiente periodo antes del bloqueo automático.', color: 'blue', requiereVoucher: true, requiereDias: false, nuevoEstado: 'ACTIVO' },
        { id: 'dar_prorroga', icon: Clock, label: 'Dar prórroga', description: 'Extiende el acceso temporalmente - Máximo 7 días.', color: 'amber', requiereVoucher: false, requiereDias: true, maxDias: 7, nuevoEstado: 'ACTIVO' },
        { id: 'bloqueo_manual', icon: Lock, label: 'Bloqueado manual', description: 'Bloqueo por gestión administrativa.', color: 'rose', requiereVoucher: false, requiereDias: false, nuevoEstado: 'BLOQUEADO_MANUAL' },
        { id: 'corte_tecnico', icon: Settings, label: 'Corte técnico', description: 'Corte por incidencia o revisión técnica.', color: 'purple', requiereVoucher: false, requiereDias: false, nuevoEstado: 'CORTE_TECNICO' }
      ];
    }
    
    // CASO 2: Acceso actual = Bloqueado por pago
    if (isBloqueadoPago) {
      return [
        { id: 'restablecer_acceso', icon: Unlock, label: 'Restablecer acceso', description: 'Usar cuando el pago ya fue validado después del bloqueo.', color: 'green', requiereVoucher: true, requiereDias: false, nuevoEstado: 'ACTIVO' },
        { id: 'dar_prorroga', icon: Clock, label: 'Dar prórroga', description: 'Extiende el acceso temporalmente - Máximo 7 días.', color: 'amber', requiereVoucher: false, requiereDias: true, maxDias: 7, nuevoEstado: 'ACTIVO' },
        { id: 'bloqueo_manual', icon: Lock, label: 'Bloqueado manual', description: 'Bloqueo por gestión administrativa.', color: 'rose', requiereVoucher: false, requiereDias: false, nuevoEstado: 'BLOQUEADO_MANUAL' },
        { id: 'corte_tecnico', icon: Settings, label: 'Corte técnico', description: 'Corte por incidencia o revisión técnica.', color: 'purple', requiereVoucher: false, requiereDias: false, nuevoEstado: 'CORTE_TECNICO' }
      ];
    }
    
    // CASO 3: Acceso actual = Bloqueado manual
    if (isBloqueadoManual) {
      return [
        { id: 'restablecer_acceso', icon: Unlock, label: 'Restablecer acceso', description: 'Habilita nuevamente el acceso al sistema.', color: 'green', requiereVoucher: false, requiereDias: false, nuevoEstado: 'ACTIVO' },
        { id: 'bloqueo_pago', icon: CreditCard, label: 'Bloqueado por pago', description: 'Cambia la causa del bloqueo a pago.', color: 'rose', requiereVoucher: false, requiereDias: false, nuevoEstado: 'BLOQUEADO_PAGO' },
        { id: 'corte_tecnico', icon: Settings, label: 'Corte técnico', description: 'Cambia la causa del bloqueo a técnica.', color: 'purple', requiereVoucher: false, requiereDias: false, nuevoEstado: 'CORTE_TECNICO' }
      ];
    }
    
    // CASO 4: Acceso actual = Bloqueado técnico
    if (isBloqueadoTecnico) {
      return [
        { id: 'restablecer_acceso', icon: Unlock, label: 'Restablecer acceso', description: 'Habilita nuevamente el acceso al sistema.', color: 'green', requiereVoucher: false, requiereDias: false, nuevoEstado: 'ACTIVO' },
        { id: 'bloqueo_pago', icon: CreditCard, label: 'Bloqueado por pago', description: 'Cambia la causa del bloqueo a pago.', color: 'rose', requiereVoucher: false, requiereDias: false, nuevoEstado: 'BLOQUEADO_PAGO' },
        { id: 'bloqueo_manual', icon: Lock, label: 'Bloqueado manual', description: 'Cambia la causa del bloqueo a manual.', color: 'orange', requiereVoucher: false, requiereDias: false, nuevoEstado: 'BLOQUEADO_MANUAL' }
      ];
    }
    
    return [];
  };

  const accionesDisponibles = getAccionesDisponibles();
  const accionSeleccionadaData = accionesDisponibles.find(a => a.id === accionSeleccionada);

  const isAplicarDisabled = () => {
    if (!justificacion.trim()) return true;
    if (!accionSeleccionada) return true;
    if (accionSeleccionadaData?.requiereVoucher && !voucher.trim()) return true;
    if (accionSeleccionadaData?.requiereDias) {
      const dias = parseInt(prorrogaDias);
      if (isNaN(dias) || dias <= 0 || dias > (accionSeleccionadaData.maxDias || 7)) return true;
    }
    return false;
  };

  const handleAplicarCambio = () => {
    if (isAplicarDisabled()) return;
    
    const nuevoEstadoAcceso = accionSeleccionadaData?.nuevoEstado || estadoActual;
    
    if (onAccesoActualizado && cliente.ruc) {
      onAccesoActualizado(cliente.ruc, nuevoEstadoAcceso, {
        accion: accionSeleccionada,
        prorrogaDias: accionSeleccionadaData?.requiereDias ? prorrogaDias : null,
        voucher: accionSeleccionadaData?.requiereVoucher ? voucher : null,
        justificacion,
        estadoAnterior: estadoActual,
        timestamp: new Date().toISOString()
      });
    }
    
    handleClose();
  };

  const renderDynamicInputs = () => {
    if (!accionSeleccionadaData) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        {accionSeleccionadaData.requiereDias && (
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-2">
              <Calendar size={12} /> Días de prórroga (Máx {accionSeleccionadaData.maxDias} días)
            </label>
            <input 
              type="number" 
              min="1"
              max={accionSeleccionadaData.maxDias}
              placeholder="Ej. 3"
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-amber-500/10 outline-none transition-all"
              value={prorrogaDias}
              onChange={(e) => setProrrogaDias(e.target.value)}
            />
            <p className="text-[9px] text-gray-400 ml-2">Extiende el acceso temporalmente. Días se ingresan manualmente.</p>
          </div>
        )}
        
        {accionSeleccionadaData.requiereVoucher && (
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-2">
              <FileText size={12} /> Voucher N.°
            </label>
            <input 
              type="text" 
              placeholder="123456"
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div ref={modalRef} className="bg-white dark:bg-[#161b22] w-full max-h-[90vh] max-w-5xl rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative flex flex-col">
        
        {/* HEADER */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20 sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black dark:text-white">Gestión de acceso al sistema</h2>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">
              {cliente.nombre} (CLI-000245)
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-[10px] font-bold text-gray-400">
              <span>Nombre comercial: {cliente.nombreComercial || '—'}</span>
              <span>RUC: {cliente.ruc}</span>
              <span>Alias: {cliente.alias || '—'}</span>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={20} className="dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* ACCESO ACTUAL */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">ACCESO ACTUAL:</span>
            <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase flex items-center gap-2 ${estadoConfig.color}`}>
              <EstadoIcon size={14} /> {estadoConfig.label}
            </span>
          </div>

          {/* DATOS DEL PAGO */}
          <div className="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <CreditCard size={14} /> DATOS DEL PAGO
              </h3>
              <button className="text-[10px] font-black text-blue-500 uppercase flex items-center gap-1 hover:underline">
                ✎ Corregir
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Mes:</p>
                <p className="text-sm font-bold dark:text-white">Mayo 2026</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black">BCP</div>
                <span className="text-xs font-bold dark:text-gray-300">BCP/Interbank</span>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Método de pago:</p>
                <p className="text-sm font-bold dark:text-white">Transferencia bancaria</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Monto pagado:</p>
                <p className="text-sm font-bold dark:text-white">S/ 150.00</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Nro. de operación:</p>
                <p className="text-sm font-bold dark:text-white">123456</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Fecha de pago:</p>
                <p className="text-sm font-bold dark:text-white">15/03/2026</p>
              </div>
            </div>
          </div>

          {/* SELECCIONE LA ACCIÓN */}
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-4">SELECCIONE LA ACCIÓN</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accionesDisponibles.map((accion) => {
                const Icon = accion.icon;
                const isActive = accionSeleccionada === accion.id;
                const colorMap: Record<string, string> = {
                  blue: 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600',
                  green: 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600',
                  amber: 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-600',
                  rose: 'border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-600',
                  purple: 'border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-purple-600',
                  orange: 'border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-600',
                  gray: 'border-gray-500 bg-gray-50 dark:bg-gray-500/10 text-gray-600'
                };
                
                return (
                  <button 
                    key={accion.id}
                    onClick={() => {
                      setAccionSeleccionada(accion.id);
                      setProrrogaDias('');
                      setVoucher('');
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      isActive 
                        ? colorMap[accion.color]
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 text-gray-500 dark:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={18} />
                      <span className="text-xs font-black uppercase">{accion.label}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-white leading-tight">{accion.description}</p>
                    {accion.requiereDias && (
                      <p className="text-[9px] text-gray-400 mt-1">___ días</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* INPUTS DINÁMICOS */}
          {renderDynamicInputs()}

          {/* MOTIVO DEL CAMBIO */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle size={12} /> MOTIVO DEL CAMBIO
            </label>
            <textarea 
              rows={3}
              placeholder="Escriba el motivo del cambio de acceso..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl text-sm font-medium dark:text-white outline-none min-h-[80px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              value={justificacion}
              onChange={(e) => setJustificacion(e.target.value)}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
          <button onClick={handleClose} className="px-8 py-3 text-[10px] font-black uppercase text-gray-500 hover:text-gray-700 transition-all">
            Cancelar
          </button>
          <button 
            disabled={isAplicarDisabled()}
            onClick={handleAplicarCambio}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${
              isAplicarDisabled()
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25'
            }`}
          >
            <CheckCircle2 size={14} />
            Confirmar cambio
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestionAcceso;
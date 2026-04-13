import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Unlock, Clock, AlertTriangle, 
  Settings, CheckCircle2, FileText, CreditCard,
  Shield, Power, Calendar, AlertCircle
} from 'lucide-react';

interface GestionAccesoProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: {
    nombre: string;
    ruc: string;
    subdominio?: string;
    alias?: string;
    nombreComercial?: string;
    estadoAcceso?: 'ACTIVO' | 'BLOQUEADO_PAGO' | 'BLOQUEADO_MANUAL' | 'CORTE_TECNICO';
    periodoAdeudado?: string;
  } | null;
}

// Tipos de estado de acceso
type EstadoAcceso = 'ACTIVO' | 'BLOQUEADO_PAGO' | 'BLOQUEADO_MANUAL' | 'CORTE_TECNICO';

const GestionAcceso: React.FC<GestionAccesoProps> = ({ isOpen, onClose, cliente }) => {
  const [justificacion, setJustificacion] = useState('');
  const [prorrogaDias, setProrrogaDias] = useState('');
  const [voucher, setVoucher] = useState('');
  const [accionSeleccionada, setAccionSeleccionada] = useState<string | null>(null);
  const [estadoActual, setEstadoActual] = useState<EstadoAcceso>('ACTIVO');

  // Simular estado del cliente (esto vendría de la API)
  useEffect(() => {
    if (cliente && cliente.estadoAcceso) {
        // Usar el estado que viene del padre directamente
        setEstadoActual(cliente.estadoAcceso);
    }
  }, [cliente]);

  if (!isOpen || !cliente) return null;

  // Resetear estado al abrir
  const handleClose = () => {
    setJustificacion('');
    setProrrogaDias('');
    setVoucher('');
    setAccionSeleccionada(null);
    onClose();
  };

  // Configuración según el estado actual
  const getEstadoConfig = () => {
    switch (estadoActual) {
      case 'ACTIVO':
        return {
          icon: Unlock,
          iconBg: 'bg-emerald-500',
          label: 'ACTIVO',
          labelClass: 'text-emerald-600 dark:text-emerald-400',
          bgClass: 'bg-emerald-50 dark:bg-emerald-500/5',
          borderClass: 'border-emerald-100 dark:border-emerald-500/10',
          mensaje: 'El cliente tiene acceso activo al sistema.'
        };
      case 'BLOQUEADO_PAGO':
        return {
          icon: CreditCard,
          iconBg: 'bg-rose-500',
          label: 'BLOQUEADO POR PAGO',
          labelClass: 'text-rose-600 dark:text-rose-400',
          bgClass: 'bg-rose-50 dark:bg-rose-500/5',
          borderClass: 'border-rose-100 dark:border-rose-500/10',
          mensaje: 'Acceso bloqueado automáticamente por falta de pago del periodo.'
        };
      case 'BLOQUEADO_MANUAL':
        return {
          icon: Lock,
          iconBg: 'bg-orange-500',
          label: 'BLOQUEADO MANUAL',
          labelClass: 'text-orange-600 dark:text-orange-400',
          bgClass: 'bg-orange-50 dark:bg-orange-500/5',
          borderClass: 'border-orange-100 dark:border-orange-500/10',
          mensaje: 'Acceso bloqueado manualmente por el administrador.'
        };
      case 'CORTE_TECNICO':
        return {
          icon: Settings,
          iconBg: 'bg-purple-500',
          label: 'CORTE TÉCNICO',
          labelClass: 'text-purple-600 dark:text-purple-400',
          bgClass: 'bg-purple-50 dark:bg-purple-500/5',
          borderClass: 'border-purple-100 dark:border-purple-500/10',
          mensaje: 'Acceso suspendido por mantenimiento o incidencias técnicas.'
        };
      default:
        return {
          icon: Unlock,
          iconBg: 'bg-emerald-500',
          label: 'ACTIVO',
          labelClass: 'text-emerald-600',
          bgClass: 'bg-emerald-50',
          borderClass: 'border-emerald-100',
          mensaje: 'Estado desconocido.'
        };
    }
  };

  const estadoConfig = getEstadoConfig();
  const EstadoIcon = estadoConfig.icon;
  const isBloqueadoPago = estadoActual === 'BLOQUEADO_PAGO';
  const isActivo = estadoActual === 'ACTIVO';

  // Definir acciones disponibles según el estado
  const getAccionesDisponibles = () => {
    if (isActivo) {
      return [
        { 
          id: 'confirmar_pago', 
          icon: CheckCircle2, 
          label: 'Confirmar pago', 
          description: 'Confirmar pago - Abril',
          color: 'blue',
          requiereVoucher: true,
          requiereDias: false
        },
        { 
          id: 'dar_prorroga', 
          icon: Clock, 
          label: 'Dar prórroga', 
          description: 'Extiende el acceso temporalmente',
          color: 'amber',
          requiereVoucher: false,
          requiereDias: true,
          maxDias: 7
        },
        { 
          id: 'bloqueo_manual', 
          icon: Lock, 
          label: 'Bloqueo manual', 
          description: 'Corte preventivo manual',
          color: 'rose',
          requiereVoucher: false,
          requiereDias: false
        },
        { 
          id: 'corte_tecnico', 
          icon: Settings, 
          label: 'Corte técnico', 
          description: 'Mantenimiento o errores',
          color: 'purple',
          requiereVoucher: false,
          requiereDias: false
        }
      ];
    }
    
    if (isBloqueadoPago) {
      return [
        { 
          id: 'restablecer_acceso', 
          icon: Unlock, 
          label: 'Restablecer acceso', 
          description: 'Restablece solo si se verificó el pago',
          color: 'green',
          requiereVoucher: true,
          requiereDias: false
        },
        { 
          id: 'dar_prorroga', 
          icon: Clock, 
          label: 'Dar prórroga', 
          description: 'Extiende el acceso temporalmente',
          color: 'amber',
          requiereVoucher: false,
          requiereDias: true,
          maxDias: 7
        },
        { 
          id: 'bloqueo_manual', 
          icon: Lock, 
          label: 'Bloqueo manual', 
          description: 'Corte preventivo manual',
          color: 'rose',
          requiereVoucher: false,
          requiereDias: false
        },
        { 
          id: 'corte_tecnico', 
          icon: Settings, 
          label: 'Corte técnico', 
          description: 'Mantenimiento o errores',
          color: 'purple',
          requiereVoucher: false,
          requiereDias: false
        }
      ];
    }
    
    // Para otros estados
    return [
      { 
        id: 'restablecer_acceso', 
        icon: Power, 
        label: 'Restablecer acceso', 
        description: 'Reactivar el acceso',
        color: 'green',
        requiereVoucher: false,
        requiereDias: false
      }
    ];
  };

  const accionesDisponibles = getAccionesDisponibles();
  const accionSeleccionadaData = accionesDisponibles.find(a => a.id === accionSeleccionada);

  // Validar si el botón de aplicar debe estar habilitado
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
    
    // Aquí iría la llamada a la API
    console.log('Aplicando cambio:', {
      cliente: cliente.nombre,
      estadoActual,
      accion: accionSeleccionada,
      prorrogaDias: accionSeleccionadaData?.requiereDias ? prorrogaDias : null,
      voucher: accionSeleccionadaData?.requiereVoucher ? voucher : null,
      justificacion,
      timestamp: new Date().toISOString()
    });
    
    // Cerrar modal después de aplicar
    handleClose();
  };

  // Renderizar inputs dinámicos según acción seleccionada
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
              <FileText size={12} /> Voucher / Operación
            </label>
            <input 
              type="text" 
              placeholder="N° de operación"
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
            />
            {isBloqueadoPago && accionSeleccionada === 'restablecer_acceso' && (
              <p className="text-[9px] text-gray-400 ml-2">Confirmar solo si se verificó el pago</p>
            )}
            {isActivo && accionSeleccionada === 'confirmar_pago' && (
              <p className="text-[9px] text-gray-400 ml-2">Confirmar solo si se verificó el pago</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white dark:bg-[#161b22] w-full max-w-4xl rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-y-auto max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-6 sm:p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-start sticky top-0 bg-white dark:bg-[#161b22] z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="text-blue-600" size={20} />
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                Gestión de Acceso al Sistema
              </h2>
            </div>
            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
              {cliente.nombre} • <span className="text-blue-500">RUC: {cliente.ruc}</span>
            </p>
            {cliente.nombreComercial && (
              <p className="text-[10px] text-gray-400 mt-1">
                Nombre comercial: {cliente.nombreComercial} • Alias: {cliente.alias || cliente.nombreComercial?.split(' ')[0]} • Subdominio: {cliente.subdominio || 'minegocio'}
              </p>
            )}
          </div>
          <button 
            onClick={handleClose} 
            className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-2xl hover:scale-110 transition-transform"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* ESTADO ACTUAL */}
          <div className={`flex items-center justify-between ${estadoConfig.bgClass} p-6 rounded-[2rem] border ${estadoConfig.borderClass}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${estadoConfig.iconBg} rounded-full flex items-center justify-center text-white shadow-lg`}>
                <EstadoIcon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado de Acceso Actual</p>
                <p className={`text-lg font-black uppercase ${estadoConfig.labelClass}`}>
                  {estadoConfig.label}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  {estadoConfig.mensaje}
                </p>
              </div>
            </div>
            {isBloqueadoPago && (
              <div className="text-right">
                <p className="text-[9px] font-bold text-gray-400 uppercase italic">
                  Nota: Bloqueado por pago es automático (no se aplica manualmente).
                </p>
              </div>
            )}
          </div>

          {/* ACCIONES DISPONIBLES */}
          <div className="space-y-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
              {isBloqueadoPago ? 'Acciones para desbloquear o gestionar acceso:' : 'Acciones de gestión de acceso:'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {accionesDisponibles.map((accion) => {
                const Icon = accion.icon;
                const isActive = accionSeleccionada === accion.id;
                const colorMap: Record<string, string> = {
                  blue: 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600',
                  amber: 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-600',
                  rose: 'border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-600',
                  purple: 'border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-purple-600',
                  green: 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600'
                };
                
                return (
                  <button 
                    key={accion.id}
                    onClick={() => {
                      setAccionSeleccionada(accion.id);
                      // Resetear campos específicos cuando cambia la acción
                      setProrrogaDias('');
                      setVoucher('');
                    }}
                    className={`flex flex-col items-center p-5 rounded-[2rem] border-2 transition-all group ${
                      isActive 
                        ? colorMap[accion.color]
                        : 'border-gray-100 dark:border-gray-800 hover:border-blue-500/50'
                    }`}
                  >
                    <div className={`p-3 rounded-full mb-3 transition-all ${
                      isActive 
                        ? `bg-${accion.color}-500 text-white` 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-blue-500'
                    }`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      isActive ? `text-${accion.color}-600` : 'text-gray-500'
                    }`}>
                      {accion.label}
                    </span>
                    <p className="text-[9px] text-gray-400 mt-1 text-center font-medium leading-tight">
                      {accion.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* INPUTS DINÁMICOS SEGÚN ACCIÓN SELECCIONADA */}
          {renderDynamicInputs()}

          {/* JUSTIFICACIÓN (OBLIGATORIA) */}
          <div className="space-y-2 mt-4">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-2">
              <AlertCircle size={12} />
              Justificación del cambio <span className="text-rose-500">*</span>
            </label>
            <textarea 
              rows={3}
              placeholder="Escriba aquí el motivo detallado del cambio de acceso..."
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-none rounded-[1.5rem] text-sm font-medium dark:text-gray-200 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
              value={justificacion}
              onChange={(e) => setJustificacion(e.target.value)}
            />
          </div>
        </div>

        {/* FOOTER ACCIONES */}
        <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 sticky bottom-0">
          <div className="flex items-center gap-2 text-rose-500">
            <AlertTriangle size={16} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Esta acción será registrada en el historial</span>
          </div>
          <div className="flex gap-3 sm:ml-auto">
            <button 
              onClick={handleClose}
              className="px-6 py-3 text-[10px] font-black uppercase text-gray-500 hover:text-gray-700 transition-all"
            >
              Cancelar
            </button>
            <button 
              disabled={isAplicarDisabled()}
              onClick={handleAplicarCambio}
              className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-[10px] font-black uppercase hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg"
            >
              Aplicar cambio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GestionAcceso;
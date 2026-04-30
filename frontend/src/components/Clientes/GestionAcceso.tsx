import React, { useState, useEffect,useRef } from 'react';
import { 
  X, Lock, Unlock, Clock,Settings, CheckCircle2, FileText, CreditCard, Calendar, AlertCircle, Ban,
  Loader2, 
} from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { 
  getPagosCliente, 
  confirmarPago, 
  darProrroga, 
  bloqueoManual, 
  bloqueoPago,
  corteTecnico,
  restablecerAcceso,
  PagosResponse 
} from '../../services/clientsService';
import { EstadosAcceso, EstadoAcceso, EstadoToDB, EstadoDisplay, EstadoColors } from '../../constants/estadosAcceso';
interface Accion {
  id: string;
  icon: any;
  label: string;
  description: string;
  color: string;
  requiereVoucher?: boolean;
  requiereDias?: boolean;
  requiereMonto?: boolean;
  requiereFecha?: boolean;
  requierePeriodo?: boolean;  // 👈 NUEVO
  maxDias?: number;
  nuevoEstado: EstadoAcceso;
}
interface GestionAccesoProps {
  isOpen: boolean;
  onClose: () => void;
  onAccesoActualizado?: (clienteId: number, nuevoEstadoAcceso: string, detalles: any) => void;
  cliente: {
    id: number;
    nombre: string;
    ruc: string;
    subdominio?: string;
    alias?: string;
    nombreComercial?: string;
    estadoAcceso?: EstadoAcceso;
    periodoAdeudado?: string;
  } | null;
}

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
  const [montoPago, setMontoPago] = useState('');
  const [fechaRestauracion, setFechaRestauracion] = useState('');
  const [accionSeleccionada, setAccionSeleccionada] = useState<string | null>(null);
  const [estadoActual, setEstadoActual] = useState<EstadoAcceso>('ACTIVO');
  const [cargando, setCargando] = useState(false);
  const [datosPago, setDatosPago] = useState<PagosResponse | null>(null);
  const [cargandoPagos, setCargandoPagos] = useState(false);
  // Cargar datos de pago cuando se abre el modal
  useEffect(() => {
    if (isOpen && cliente?.id) {
      cargarDatosPago();
    }
  }, [isOpen, cliente?.id]);

  useEffect(() => {
    if (cliente && cliente.estadoAcceso) {
      setEstadoActual(cliente.estadoAcceso);
    }
  }, [cliente]);

  const cargarDatosPago = async () => {
    if (!cliente?.id) return;
    
    setCargandoPagos(true);
    try {
      const data = await getPagosCliente(cliente.id);
        if (data) {
          setDatosPago(data);
          // Normalizar el estado que viene de la API
          const estadoFromAPI = data.estado_acceso?.toUpperCase() || 'ACTIVO';
          let estadoNormalizado: EstadoAcceso = EstadosAcceso.ACTIVO;
          
          if (estadoFromAPI === 'BLOQUEADO_TECNICO') estadoNormalizado = EstadosAcceso.CORTE_TECNICO;
          else if (estadoFromAPI === 'DESACTIVADO_BAJA') estadoNormalizado = EstadosAcceso.DESACTIVADO;
          else if (estadoFromAPI === 'ACTIVO') estadoNormalizado = EstadosAcceso.ACTIVO;
          else if (estadoFromAPI === 'BLOQUEADO_PAGO') estadoNormalizado = EstadosAcceso.BLOQUEADO_PAGO;
          else if (estadoFromAPI === 'BLOQUEADO_MANUAL') estadoNormalizado = EstadosAcceso.BLOQUEADO_MANUAL;
          
          setEstadoActual(estadoNormalizado);
          
          if (data.precio_plan) {
            setMontoPago(data.precio_plan);
          }
        }
    } catch (error) {
      console.error('Error al cargar datos de pago:', error);
    } finally {
      setCargandoPagos(false);
    }
  };

  if (!isOpen || !cliente) return null;
  const handleClose = () => {
    setJustificacion('');
    setProrrogaDias('');
    setVoucher('');
    setMontoPago('');
    setFechaRestauracion('');
    setAccionSeleccionada(null);
    setDatosPago(null);
    onClose();
  };

  const getEstadoConfig = () => {
    switch (estadoActual) {
      case EstadosAcceso.ACTIVO:
        return {
          icon: Unlock,
          label: EstadoDisplay[EstadosAcceso.ACTIVO],
          color: EstadoColors[EstadosAcceso.ACTIVO],
        };
      case EstadosAcceso.BLOQUEADO_PAGO:
        return {
          icon: CreditCard,
          label: EstadoDisplay[EstadosAcceso.BLOQUEADO_PAGO],
          color: EstadoColors[EstadosAcceso.BLOQUEADO_PAGO],
        };
      case EstadosAcceso.BLOQUEADO_MANUAL:
        return {
          icon: Lock,
          label: EstadoDisplay[EstadosAcceso.BLOQUEADO_MANUAL],
          color: EstadoColors[EstadosAcceso.BLOQUEADO_MANUAL],
        };
      case EstadosAcceso.CORTE_TECNICO:
        return {
          icon: Settings,
          label: EstadoDisplay[EstadosAcceso.CORTE_TECNICO],
          color: EstadoColors[EstadosAcceso.CORTE_TECNICO],
        };
      case EstadosAcceso.DESACTIVADO:
        return {
          icon: Ban,
          label: EstadoDisplay[EstadosAcceso.DESACTIVADO],
          color: EstadoColors[EstadosAcceso.DESACTIVADO],
        };
      default:
        return {
          icon: Unlock,
          label: EstadoDisplay[EstadosAcceso.ACTIVO],
          color: EstadoColors[EstadosAcceso.ACTIVO],
        };
    }
  };

  const estadoConfig = getEstadoConfig();
  const EstadoIcon = estadoConfig.icon;
  const isActivo = estadoActual === EstadosAcceso.ACTIVO;
  const isBloqueadoPago = estadoActual === EstadosAcceso.BLOQUEADO_PAGO;
  const isBloqueadoManual = estadoActual === EstadosAcceso.BLOQUEADO_MANUAL;
  const isBloqueadoTecnico = estadoActual === EstadosAcceso.CORTE_TECNICO;

  // ACCIONES SEGÚN EL ESTADO ACTUAL (basado en wireframe)
  const getAccionesDisponibles = () => {
    if (isActivo) {
      return [
        { id: 'confirmar_pago', icon: CheckCircle2, label: 'Confirmar pago', description: 'Registrar el pago del siguiente periodo.', color: 'blue', requiereVoucher: true, requiereDias: false, requiereMonto: true, nuevoEstado: EstadosAcceso.ACTIVO },
        { id: 'dar_prorroga', icon: Clock, label: 'Dar prórroga', description: 'Extiende el acceso temporalmente - Máximo 7 días.', color: 'amber', requiereVoucher: false, requiereDias: true, maxDias: 7, nuevoEstado: EstadosAcceso.ACTIVO },
        { id: 'bloqueo_manual', icon: Lock, label: 'Bloqueo manual', description: 'Bloqueo por gestión administrativa.', color: 'rose', requiereVoucher: false, requiereDias: false, nuevoEstado: EstadosAcceso.BLOQUEADO_MANUAL },
        { id: 'corte_tecnico', icon: Settings, label: 'Corte técnico', description: 'Corte por incidencia o revisión técnica.', color: 'purple', requiereVoucher: false, requiereDias: false, requiereFecha: true, nuevoEstado: EstadosAcceso.CORTE_TECNICO }
      ];
    }
    
    if (isBloqueadoPago) {
      return [
        { id: 'restablecer_acceso', icon: Unlock, label: 'Restablecer acceso', description: 'Usar cuando el pago ya fue validado.', color: 'green', requiereVoucher: true, requiereMonto: true, nuevoEstado: EstadosAcceso.ACTIVO },
        { id: 'dar_prorroga', icon: Clock, label: 'Dar prórroga', description: 'Extiende el acceso temporalmente - Máximo 7 días.', color: 'amber', requiereVoucher: false, requiereDias: true, maxDias: 7, nuevoEstado: EstadosAcceso.ACTIVO },
        { id: 'bloqueo_manual', icon: Lock, label: 'Bloqueo manual', description: 'Bloqueo por gestión administrativa.', color: 'rose', requiereVoucher: false, requiereDias: false, nuevoEstado: EstadosAcceso.BLOQUEADO_MANUAL },
        { id: 'corte_tecnico', icon: Settings, label: 'Corte técnico', description: 'Corte por incidencia.', color: 'purple', requiereVoucher: false, requiereDias: false, requiereFecha: true, nuevoEstado: EstadosAcceso.CORTE_TECNICO }
      ];
    }
    
    if (isBloqueadoManual) {
      return [
        { id: 'restablecer_acceso', icon: Unlock, label: 'Restablecer acceso', description: 'Habilita nuevamente el acceso.', color: 'green', requiereVoucher: false, requiereDias: false, nuevoEstado: EstadosAcceso.ACTIVO },
        { id: 'bloqueo_pago', icon: CreditCard, label: 'Cambiar a bloqueo por pago', description: 'Cambia la causa del bloqueo.', color: 'rose', requiereVoucher: false, requiereDias: false, nuevoEstado: EstadosAcceso.BLOQUEADO_PAGO },
        { id: 'corte_tecnico', icon: Settings, label: 'Cambiar a corte técnico', description: 'Cambia la causa del bloqueo.', color: 'purple', requiereVoucher: false, requiereDias: false, requiereFecha: true, nuevoEstado: EstadosAcceso.CORTE_TECNICO }
      ];
    }
    
    if (isBloqueadoTecnico) {
      return [
        { id: 'restablecer_acceso', icon: Unlock, label: 'Restablecer acceso', description: 'Habilita nuevamente el acceso.', color: 'green', requiereVoucher: false, requiereDias: false, nuevoEstado: EstadosAcceso.ACTIVO },
        { id: 'bloqueo_pago', icon: CreditCard, label: 'Cambiar a bloqueo por pago', description: 'Cambia la causa del bloqueo.', color: 'rose', requiereVoucher: false, requiereDias: false, nuevoEstado: EstadosAcceso.BLOQUEADO_PAGO },
        { id: 'bloqueo_manual', icon: Lock, label: 'Cambiar a bloqueo manual', description: 'Cambia la causa del bloqueo.', color: 'orange', requiereVoucher: false, requiereDias: false, nuevoEstado: EstadosAcceso.BLOQUEADO_MANUAL }
      ];
    }
    
    return [];
  };
  const accionesDisponibles = getAccionesDisponibles();
  const accionSeleccionadaData = accionesDisponibles.find(a => a.id === accionSeleccionada) as Accion | undefined;  const isAplicarDisabled = () => {
    if (!justificacion.trim()) return true;
    if (!accionSeleccionada) return true;
    if (accionSeleccionadaData?.requiereVoucher && !voucher.trim()) return true;
    if (accionSeleccionadaData?.requiereMonto) {
      const monto = parseFloat(montoPago);
      if (isNaN(monto) || monto <= 0) return true;
    }
    if (accionSeleccionadaData?.requiereDias) {
      const dias = parseInt(prorrogaDias);
      if (isNaN(dias) || dias <= 0 || dias > (accionSeleccionadaData.maxDias || 7)) return true;
    }
    if (accionSeleccionadaData?.requiereFecha && !fechaRestauracion) return true;
    return false;
  };
  const handleAplicarCambio = async () => {
    if (isAplicarDisabled() || !cliente?.id) return;
    
    setCargando(true);
    let resultado;
    
    try {
      switch (accionSeleccionada) {
        case 'confirmar_pago':
          resultado = await confirmarPago(cliente.id, {
            n_operacion_voucher: voucher,
            motivo: justificacion,
            monto: parseFloat(montoPago)
          });
          break;
        
        case 'dar_prorroga':
          resultado = await darProrroga(cliente.id, {
            dias_prorroga: parseInt(prorrogaDias),
            motivo: justificacion
          });
          break;
        
        case 'bloqueo_manual':
          resultado = await bloqueoManual(cliente.id, {
            motivo: justificacion
          });
          break;
        
        case 'corte_tecnico':
          resultado = await corteTecnico(cliente.id, {
            motivo: justificacion,
            fecha_restauracion: fechaRestauracion
          });
          break;
        
        case 'restablecer_acceso':
          resultado = await restablecerAcceso(cliente.id, {
            motivo: justificacion
          });
          break;
        
        case 'bloqueo_pago':
          // Validar que se haya ingresado el período adeudado
          const periodoAdeudado = prompt('Ingrese el período adeudado (ej: Abril 2026):');
          if (!periodoAdeudado) {
            alert('Debe ingresar el período adeudado');
            setCargando(false);
            return;
          }
          
          resultado = await bloqueoPago(cliente.id, {
            motivo: justificacion,
            periodo_adeudado: periodoAdeudado
          });
          break;
        
        default:
          console.log('Acción no implementada:', accionSeleccionada);
      }
      
      if (resultado?.success !== false) {
        const nuevoEstado = accionSeleccionadaData?.nuevoEstado || estadoActual;
        
        if (onAccesoActualizado && cliente.id) {
          onAccesoActualizado(cliente.id, nuevoEstado, {
            accion: accionSeleccionada,
            prorrogaDias: accionSeleccionadaData?.requiereDias ? prorrogaDias : null,
            voucher: accionSeleccionadaData?.requiereVoucher ? voucher : null,
            justificacion,
            estadoAnterior: estadoActual,
            timestamp: new Date().toISOString()
          });
        }
        
        // Recargar datos de pago para mostrar actualización
        await cargarDatosPago();
      }
      
      handleClose();
    } catch (error) {
      console.error('Error al aplicar cambio:', error);
      alert('Error al procesar la solicitud');
    } finally {
      setCargando(false);
    }
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
            {/* <p className="text-[9px] text-gray-400 ml-2">Extiende el acceso temporalmente. Días se ingresan manualmente.</p> */}
          </div>
        )}
        
        {accionSeleccionadaData.requiereVoucher && (
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-2">
              <FileText size={12} /> Voucher N.°
            </label>
            <input 
              type="text" 
              placeholder="VCH-XXXXX"
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
            />
          </div>
        )}
        {accionSeleccionadaData.requiereMonto && (
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-2">
              <CreditCard size={12} /> Monto Pagado (S/)
            </label>
            <input 
              type="number" 
              step="0.01"
              placeholder={datosPago?.precio_plan || "99.99"}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              value={montoPago}
              onChange={(e) => setMontoPago(e.target.value)}
            />
          </div>
        )}
        {accionSeleccionadaData.requiereFecha && (
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-2">
              <Calendar size={12} /> Fecha de restauración
            </label>
            <input 
              type="date" 
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
              value={fechaRestauracion}
              onChange={(e) => setFechaRestauracion(e.target.value)}
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
              {cliente.nombre} ({cliente.id ? `ID: ${cliente.id}` : ''})
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

          {/* DATOS DEL PAGO - CON BANCO Y VOUCHER */}
          <div className="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <CreditCard size={14} /> DATOS DEL PAGO
              </h3>
            </div>
            {cargandoPagos ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-blue-500" size={32} />
              </div>
            ) : datosPago ? (
              <div className="grid grid-cols-2 gap-4">
                {/* Último pago - si existe */}
                {datosPago.ultimo_pago && (
                  <>
                    <div className="col-span-2 mb-2">
                      <p className="text-[9px] font-black text-emerald-600 uppercase">📌 ÚLTIMO PAGO</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Fecha de pago:</p>
                      <p className="text-sm font-bold dark:text-white">{datosPago.ultimo_pago.fecha?.split(' ')[0] || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Monto pagado:</p>
                      <p className="text-sm font-bold dark:text-white">S/ {datosPago.ultimo_pago.monto}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Voucher N°:</p>
                      <p className="text-sm font-bold text-blue-600">{datosPago.ultimo_pago.voucher || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Método de pago:</p>
                      <p className="text-sm font-bold dark:text-white">{datosPago.ultimo_pago.metodo_pago || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Banco / Billetera:</p>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[8px] font-black">
                          {datosPago.ultimo_pago.banco?.substring(0, 2) || 'N/A'}
                        </div>
                        <span className="text-sm font-bold dark:text-white">{datosPago.ultimo_pago.banco || datosPago.ultimo_pago.billetera || '—'}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Vence el:</p>
                      <p className="text-sm font-bold text-amber-600">{datosPago.ultimo_pago.fecha_vencimiento || '—'}</p>
                    </div>
                  </>
                )}

                {/* Próximo vencimiento */}
                <div className="col-span-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-[9px] font-black text-gray-400 uppercase">📅 PRÓXIMO VENCIMIENTO</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Fecha:</p>
                  <p className="text-sm font-bold dark:text-white">{datosPago.proximo_vencimiento || '—'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Días restantes:</p>
                  <p className={`text-sm font-bold ${datosPago.dias_restantes <= 7 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {datosPago.dias_restantes || 0} días
                  </p>
                </div>
                
                {/* Información del plan */}
                <div className="col-span-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-[9px] font-black text-gray-400 uppercase">📋 INFORMACIÓN DEL PLAN</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Plan:</p>
                  <p className="text-sm font-bold dark:text-white">{datosPago.plan_nombre}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Ciclo:</p>
                  <p className="text-sm font-bold dark:text-white">{datosPago.ciclo}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Monto mensual:</p>
                  <p className="text-sm font-bold dark:text-white">S/ {datosPago.precio_plan}</p>
                </div>
                
                {datosPago.periodo_adeudado && (
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase">Periodo adeudado:</p>
                    <p className="text-sm font-bold text-rose-500">{datosPago.periodo_adeudado}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500">No se pudieron cargar los datos</p>
            )}
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
                };
                
                return (
                  <button 
                    key={accion.id}
                    onClick={() => {
                      setAccionSeleccionada(accion.id);
                      setProrrogaDias('');
                      setVoucher('');
                      setMontoPago(datosPago?.precio_plan || '');
                      setFechaRestauracion('');
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      isActive 
                        ? colorMap[accion.color] || 'border-gray-500 bg-gray-50'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 text-gray-500 dark:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={18} />
                      <span className="text-xs font-black uppercase">{accion.label}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">{accion.description}</p>
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
              <AlertCircle size={12} /> MOTIVO DEL CAMBIO *
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
            disabled={isAplicarDisabled() || cargando}
            onClick={handleAplicarCambio}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${
              isAplicarDisabled() || cargando
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25'
            }`}
          >
            {cargando ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
            {cargando ? 'Procesando...' : 'Confirmar cambio'}
          </button>
        </div>
      </div>
    </div>
  );
};


export default GestionAcceso;
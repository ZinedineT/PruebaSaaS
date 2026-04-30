// src/components/Clientes/HabilitarCliente.tsx
import React, { useState } from 'react';
import { 
  X, CheckCircle2, Eye, Ban, Building2, User, CreditCard, Hash, FileText, Pencil, AlertCircle, Shield
} from 'lucide-react';
import { RegistradoAPI } from '../../services/registradosService';

interface HabilitarClienteProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: RegistradoAPI | null;  // 👈 Cambiado a tipo real de API
  onHabilitar: (clienteId: string, observaciones: string, data: any) => void;
  onObservar: (clienteId: string, observaciones: string) => void;
  onRechazar: (clienteId: string, observaciones: string) => void;
}

const HabilitarCliente: React.FC<HabilitarClienteProps> = ({ 
  isOpen, 
  onClose, 
  cliente, 
  onHabilitar,
  onObservar,
  onRechazar
}) => {
  const [observaciones, setObservaciones] = useState('');
  const [accionSeleccionada, setAccionSeleccionada] = useState<string | null>(null);

  if (!isOpen || !cliente) return null;

  const handleConfirmar = () => {
    if (!accionSeleccionada) return alert("Selecciona una acción primero");
    if (!observaciones.trim()) return alert("Las observaciones son obligatorias");
    
    if (accionSeleccionada === 'habilitar') {
      // Body para aprobar según API 109
      const approveBody = {
        cliente_estado: "habilitado",
        onboarding_estado: "completado",
        suscripcion_estado: "vigente",
        acceso_estado: "activo",
        observaciones: observaciones,
        acceso: "activo"
      };
      onHabilitar(cliente.id.toString(), observaciones, approveBody);
    } else if (accionSeleccionada === 'observar') {
      const observeBody = {
        cliente_estado: "observado",
        observaciones: observaciones
      };
      onObservar(cliente.id.toString(), observaciones);
    } else if (accionSeleccionada === 'rechazar') {
      const rejectBody = {
        cliente_estado: "rechazado",
        observaciones: observaciones
      };
      onRechazar(cliente.id.toString(), observaciones);
    }
    
    onClose();
  };

  const handleClose = () => {
    setObservaciones('');
    setAccionSeleccionada(null);
    onClose();
  };

  // Formatear código de registro
  const codigoRegistro = cliente.code_registro || `REG-${String(cliente.id).padStart(6, '0')}`;
  
  // Datos del método de pago y banco
  const metodoPagoNombre = cliente.metodo_pago_id === 1 ? 'Transferencia' : 
                          cliente.metodo_pago_id === 2 ? 'Tarjeta' : 'No especificado';
  const bancoNombre = cliente.banco_id === 5 ? 'BanBif' : 
                      cliente.banco_id === 1 ? 'BCP' : 'No especificado';
  const montoPagado = cliente.precio_plan || '0';
  
  // Estado del pago
  const estadoPago = cliente.estado_pago || 'pendiente';
  const isPagoCompleto = estadoPago === 'completo';

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="bg-white dark:bg-[#0d1117] w-full max-w-5xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-gray-800 overflow-hidden relative flex flex-col max-h-[95vh]">
        
        {/* HEADER */}
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-2xl ${isPagoCompleto ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
                <Shield className={isPagoCompleto ? 'text-emerald-500' : 'text-amber-500'} size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black dark:text-white tracking-tight">Habilitar Cliente</h2>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Validación de registro
                </p>
              </div>
            </div>
          </div>
          <button onClick={handleClose} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all text-gray-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          
          {/* SOLICITUD DE REGISTRO */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gray-50 dark:bg-gray-800/30 rounded-[2rem] border border-gray-100 dark:border-gray-800">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Solicitud de registro</p>
              <h3 className="text-lg font-black dark:text-white">{codigoRegistro}</h3>
              <p className="text-xs font-bold text-blue-500">
                Fecha de registro: {cliente.fecha_registro?.split('T')[0] || 'No disponible'}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${isPagoCompleto ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
              {isPagoCompleto ? 'Pago completado' : 'Pago pendiente'}
            </div>
          </div>

          {/* DATOS DEL NEGOCIO + CONTACTO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* DATOS DEL NEGOCIO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-wider flex items-center gap-2">
                  <Building2 size={14} /> DATOS DEL NEGOCIO
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">RUC</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.ruc}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Razón social</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.razon_social}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Nombre comercial</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.nombre_comercial}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Dirección Fiscal</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.direccion_fiscal || 'No registrada'}</p>
                </div>
              </div>
            </div>

            {/* CONTACTO PRINCIPAL */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black text-purple-500 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> CONTACTO PRINCIPAL
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Nombre</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.nombre_contacto}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Teléfono</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.telefono_contacto}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Correo</p>
                  <p className="text-sm font-bold text-blue-500">{cliente.correo_contacto}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Cargo</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.cargo_contacto}</p>
                </div>
              </div>
            </div>
          </div>

          {/* DATOS COMERCIALES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <CreditCard size={14} /> DATOS COMERCIALES
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Plan</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.plan?.name || 'No asignado'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Ciclo</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.ciclo || 'Mensual'}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Hash size={14} /> SUBDOMINIO
                </h3>
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white">{cliente.subdominio}.cistcorfact.com</p>
              </div>
            </div>
          </div>

          {/* DATOS DEL PAGO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-gray-100 dark:border-gray-800">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black text-amber-500 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard size={14} /> DATOS DEL PAGO
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-black">
                    {bancoNombre.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold dark:text-white">{bancoNombre}</span>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Método de pago</p>
                  <p className="text-sm font-bold dark:text-white">{metodoPagoNombre}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Monto pagado</p>
                  <p className="text-sm font-bold dark:text-white">S/ {montoPagado}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Nro. de operación</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.n_operacion_voucher || 'No registrado'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Fecha de pago</p>
                  <p className="text-sm font-bold dark:text-white">{cliente.fecha_pago?.split('T')[0] || 'No registrado'}</p>
                </div>
              </div>
            </div>

            {/* ACCIONES */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle size={14} /> ACCIONES
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setAccionSeleccionada('habilitar')}
                  disabled={!isPagoCompleto}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                    !isPagoCompleto ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    accionSeleccionada === 'habilitar'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                      : 'border-gray-100 dark:border-gray-800 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${accionSeleccionada === 'habilitar' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className={`text-xs font-black uppercase ${accionSeleccionada === 'habilitar' ? 'text-emerald-600' : 'dark:text-white'}`}>
                        Habilitar cliente
                      </p>
                      <p className="text-[9px] text-gray-500">Activa el acceso del cliente al sistema.</p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setAccionSeleccionada('observar')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                    accionSeleccionada === 'observar'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                      : 'border-gray-100 dark:border-gray-800 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${accionSeleccionada === 'observar' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                      <Eye size={18} />
                    </div>
                    <div>
                      <p className={`text-xs font-black uppercase ${accionSeleccionada === 'observar' ? 'text-blue-600' : 'dark:text-white'}`}>
                        Observar registro
                      </p>
                      <p className="text-[9px] text-gray-500">Requiere revisión adicional antes de habilitar.</p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setAccionSeleccionada('rechazar')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                    accionSeleccionada === 'rechazar'
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10'
                      : 'border-gray-100 dark:border-gray-800 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${accionSeleccionada === 'rechazar' ? 'bg-rose-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                      <Ban size={18} />
                    </div>
                    <div>
                      <p className={`text-xs font-black uppercase ${accionSeleccionada === 'rechazar' ? 'text-rose-600' : 'dark:text-white'}`}>
                        Rechazar registro
                      </p>
                      <p className="text-[9px] text-gray-500">Rechaza la solicitud de registro.</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* OBSERVACIONES */}
          <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <FileText size={12} /> Observaciones *
            </label>
            <textarea 
              rows={3}
              placeholder={accionSeleccionada === 'habilitar' ? "Pago validado y datos correctos..." : "Indique el motivo de la observación o rechazo..."}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-blue-500/20 rounded-[1.5rem] text-sm font-medium dark:text-white outline-none transition-all resize-none"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-8 bg-gray-50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800 flex justify-end items-center gap-4">
          <button 
            onClick={handleClose} 
            className="px-6 py-3 text-[11px] font-black uppercase text-gray-400 hover:text-gray-600 transition-all"
          >
            Cancelar
          </button>
          <button 
            disabled={!accionSeleccionada || !observaciones.trim() || (accionSeleccionada === 'habilitar' && !isPagoCompleto)}
            onClick={handleConfirmar}
            className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase transition-all flex items-center gap-2 shadow-xl ${
              !accionSeleccionada || !observaciones.trim() || (accionSeleccionada === 'habilitar' && !isPagoCompleto)
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none'
                : accionSeleccionada === 'habilitar'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
                : accionSeleccionada === 'observar'
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                : 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-500/20'
            }`}
          >
            {accionSeleccionada === 'habilitar' && <CheckCircle2 size={14} />}
            {accionSeleccionada === 'observar' && <Eye size={14} />}
            {accionSeleccionada === 'rechazar' && <Ban size={14} />}
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabilitarCliente;
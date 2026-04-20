import React, { useState, useEffect } from 'react';
import { X, Save, Building2, User, CreditCard, Lock, FileText, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditarClienteProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
  onClienteActualizado?: (ruc: string, datosActualizados: any) => void;
}

const EditarCliente: React.FC<EditarClienteProps> = ({ isOpen, onClose, cliente, onClienteActualizado }) => {
  const navigate = useNavigate();
  
  // MANTENER LA MISMA ESTRUCTURA ORIGINAL del formData
  const [formData, setFormData] = useState({
    // Datos del negocio
    ruc: '',
    razonSocial: '',
    nombreComercial: '',
    alias: '',
    // Estados de la cuenta (se mantienen aunque no se vean en el wireframe)
    estadoCliente: 'HABILITADO',
    estadoAcceso: 'ACTIVO',
    estadoSuscripcion: 'VIGENTE',
    estadoOnboarding: 'COMPLETADO',
    // Plan y ciclo
    plan: 'Profesional',
    ciclo: 'MENSUAL',
    // Contacto
    contactoPrincipal: '',
    telefono: '',
    emailAdmin: '',
    // Subdominio
    subdominio: '',
    // Observaciones
    observaciones: '',
    // Campos adicionales del wireframe
    direccionFiscal: '',
    cargo: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        ruc: cliente.ruc || '',
        razonSocial: cliente.nombre || '',
        nombreComercial: cliente.nombreComercial || '',
        alias: cliente.alias || '',
        estadoCliente: cliente.estado || 'HABILITADO',
        estadoAcceso: cliente.estadoAcceso || 'ACTIVO',
        estadoSuscripcion: cliente.suscripcion === 'Vigente' ? 'VIGENTE' : 'POR_VENCER',
        estadoOnboarding: cliente.estadoOnboarding || 'COMPLETADO',
        plan: cliente.plan || 'Profesional',
        ciclo: cliente.ciclo || 'MENSUAL',
        contactoPrincipal: cliente.contactoPrincipal || '',
        telefono: cliente.telefono || '',
        emailAdmin: cliente.emailAdmin || '',
        subdominio: cliente.subdominio || '',
        observaciones: cliente.observaciones || 'Se cambio de número telefónico de contacto',
        direccionFiscal: cliente.direccionFiscal || 'Av. Primavera 123, Lima, Lima',
        cargo: cliente.cargo || 'Administradora'
      });
    }
  }, [cliente]);

  const handleGuardar = () => {
    if (onClienteActualizado && cliente?.ruc) {
      // MANTENER EL MISMO FORMATO QUE ESPERA onClienteActualizado
      onClienteActualizado(cliente.ruc, {
        // Datos del negocio
        razonSocial: formData.razonSocial,
        nombreComercial: formData.nombreComercial,
        alias: formData.alias,
        // Estados
        estadoCliente: formData.estadoCliente,
        estadoAcceso: formData.estadoAcceso,
        estadoSuscripcion: formData.estadoSuscripcion,
        estadoOnboarding: formData.estadoOnboarding,
        // Plan y ciclo
        plan: formData.plan,
        ciclo: formData.ciclo,
        // Contacto
        contactoPrincipal: formData.contactoPrincipal,
        telefono: formData.telefono,
        emailAdmin: formData.emailAdmin,
        // Subdominio
        subdominio: formData.subdominio,
        // Observaciones
        observaciones: formData.observaciones
      });
    }
    onClose();
  };

  const handleIrSuscripciones = () => {
    navigate('/suscripciones');
    onClose();
  };

  if (!isOpen || !cliente) return null;

  // Opciones para selects
  const planes = [
    { value: 'Profesional', label: 'Profesional' },
    { value: 'Emprendedor', label: 'Emprendedor' },
    { value: 'Estandar', label: 'Estandar' }
  ];

  const ciclos = [
    { value: 'MENSUAL', label: 'Mensual' },
    { value: 'TRIMESTRAL', label: 'Trimestral' },
    { value: 'SEMESTRAL', label: 'Semestral' },
    { value: 'ANUAL', label: 'Anual' }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#161b22] w-full max-w-5xl rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
          <div>
            <h2 className="text-xl font-black dark:text-white">Editar cliente</h2>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">
              ✏️ {cliente.nombre} (CLI-000245)
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={20} className="dark:text-gray-400" />
          </button>
        </div>

        {/* FORMULARIO SCROLLABLE */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* COLUMNA IZQUIERDA - DATOS DEL NEGOCIO */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                  <Building2 size={14} /> DATOS DEL NEGOCIO
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-28 uppercase">RUC:</label>
                    <input 
                      type="text" 
                      disabled
                      value={formData.ruc}
                      className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed"
                    />
                    <Lock size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-28 uppercase">Razón social:</label>
                    <input 
                      type="text" 
                      value={formData.razonSocial}
                      onChange={(e) => setFormData({...formData, razonSocial: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-28 uppercase">Nombre comercial:</label>
                    <input 
                      type="text" 
                      value={formData.nombreComercial}
                      onChange={(e) => setFormData({...formData, nombreComercial: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Lock size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-28 uppercase">Dirección fiscal:</label>
                    <input 
                      type="text" 
                      value={formData.direccionFiscal}
                      onChange={(e) => setFormData({...formData, direccionFiscal: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Lock size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-28 uppercase">Alias (opcional):</label>
                    <input 
                      type="text" 
                      value={formData.alias}
                      onChange={(e) => setFormData({...formData, alias: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA - CONTACTO PRINCIPAL */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[11px] font-black text-purple-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                  <User size={14} /> CONTACTO PRINCIPAL
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-24 uppercase">Nombre:</label>
                    <input 
                      type="text" 
                      value={formData.contactoPrincipal}
                      onChange={(e) => setFormData({...formData, contactoPrincipal: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-24 uppercase">Teléfono:</label>
                    <input 
                      type="text" 
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-24 uppercase">Correo:</label>
                    <div className="flex-1 flex items-center gap-2">
                      <input 
                        type="email" 
                        value={formData.emailAdmin}
                        onChange={(e) => setFormData({...formData, emailAdmin: e.target.value})}
                        className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-3 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-xl text-[9px] font-black uppercase hover:bg-blue-100 transition whitespace-nowrap">
                        Validar
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-24 uppercase">Cargo:</label>
                    <input 
                      type="text" 
                      value={formData.cargo}
                      onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN: RESUMEN COMERCIAL (Fila completa) */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <CreditCard size={14} /> RESUMEN COMERCIAL
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-gray-400 w-28 uppercase">Plan:</label>
                  <select 
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {planes.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-gray-400 w-28 uppercase">Ciclo:</label>
                  <select 
                    value={formData.ciclo}
                    onChange={(e) => setFormData({...formData, ciclo: e.target.value})}
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {ciclos.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black text-amber-500 uppercase tracking-wider mb-4 opacity-0">.</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-gray-400 w-28 uppercase">Suscripción:</label>
                  <select 
                    value={formData.estadoSuscripcion === 'VIGENTE' ? 'Vigente' : formData.estadoSuscripcion === 'POR_VENCER' ? 'Por vencer' : 'Vencida'}
                    onChange={(e) => {
                      let nuevoEstado = 'VIGENTE';
                      if (e.target.value === 'Por vencer') nuevoEstado = 'POR_VENCER';
                      if (e.target.value === 'Vencida') nuevoEstado = 'VENCIDA';
                      setFormData({...formData, estadoSuscripcion: nuevoEstado});
                    }}
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Vigente">Vigente</option>
                    <option value="Por vencer">Por vencer</option>
                    <option value="Vencida">Vencida</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-gray-400 w-28 uppercase">Acceso:</label>
                  <select 
                    value={formData.estadoAcceso === 'ACTIVO' ? 'Activo' : 'Bloqueado'}
                    onChange={(e) => setFormData({...formData, estadoAcceso: e.target.value === 'Activo' ? 'ACTIVO' : 'BLOQUEADO_PAGO'})}
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Bloqueado">Bloqueado</option>
                  </select>
                  <button 
                    onClick={handleIrSuscripciones}
                    className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl text-[10px] font-black uppercase hover:bg-gray-200 transition flex items-center gap-1 whitespace-nowrap"
                  >
                    <ExternalLink size={12} /> Ir a suscripciones
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN: OBSERVACIONES */}
          <div className="mt-8">
            <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
              <FileText size={14} /> OBSERVACIONES
            </h3>
            <textarea 
              rows={3}
              value={formData.observaciones}
              onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-medium dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* FOOTER ACCIONES */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-8 py-3 text-[10px] font-black uppercase text-gray-500 hover:text-gray-700 transition-all"
          >
            Cancelar
          </button>
          <button 
            onClick={handleGuardar}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
          >
            <Save size={16} />
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarCliente;
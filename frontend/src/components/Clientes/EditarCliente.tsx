import React, { useState, useEffect } from 'react';
import { 
  X, Save, Building2, Globe, User, CreditCard,CheckCircle, Lock, AlertCircle,Edit, FileText
} from 'lucide-react';

interface EditarClienteProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
}

const EditarCliente: React.FC<EditarClienteProps> = ({ isOpen, onClose, cliente }) => {
  const [formData, setFormData] = useState({
    // Datos del negocio
    ruc: '',
    razonSocial: '',
    nombreComercial: '',
    alias: '',
    // Estados de la cuenta
    estadoCliente: 'HABILITADO',
    estadoAcceso: 'ACTIVO',
    estadoSuscripcion: 'VIGENTE',
    estadoOnboarding: 'COMPLETADO',
    // Plan y ciclo
    plan: 'PRO',
    ciclo: 'MENSUAL',
    // Contacto
    contactoPrincipal: '',
    telefono: '',
    emailAdmin: '',
    // Subdominio
    subdominio: '',
    // Observaciones
    observaciones: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        ruc: cliente.ruc || '',
        razonSocial: cliente.nombre || '',
        nombreComercial: cliente.nombreComercial || '',
        alias: cliente.alias || '',
        estadoCliente: cliente.estadoCliente || 'HABILITADO',
        estadoAcceso: cliente.estadoAcceso || 'ACTIVO',
        estadoSuscripcion: cliente.estadoSuscripcion || 'VIGENTE',
        estadoOnboarding: cliente.estadoOnboarding || 'COMPLETADO',
        plan: cliente.plan || 'PRO',
        ciclo: cliente.ciclo || 'MENSUAL',
        contactoPrincipal: cliente.contactoPrincipal || '',
        telefono: cliente.telefono || '',
        emailAdmin: cliente.emailAdmin || '',
        subdominio: cliente.subdominio || '',
        observaciones: cliente.observaciones || ''
      });
    }
  }, [cliente]);

  if (!isOpen || !cliente) return null;

  // Opciones para selects
  const estadosCliente = [
    { value: 'HABILITADO', label: 'Habilitado', icon: CheckCircle, color: 'emerald' },
    { value: 'SUSPENDIDO', label: 'Suspendido', icon: AlertCircle, color: 'amber' },
    { value: 'BLOQUEADO', label: 'Bloqueado', icon: Lock, color: 'rose' }
  ];

  const estadosAcceso = [
    { value: 'ACTIVO', label: 'Activo', icon: CheckCircle, color: 'emerald' },
    { value: 'BLOQUEADO_PAGO', label: 'Bloqueado por pago', icon: Lock, color: 'rose' },
    { value: 'BLOQUEADO_MANUAL', label: 'Bloqueado manual', icon: Lock, color: 'orange' },
    { value: 'CORTE_TECNICO', label: 'Corte técnico', icon: AlertCircle, color: 'purple' }
  ];

  const estadosSuscripcion = [
    { value: 'VIGENTE', label: 'Vigente', color: 'emerald' },
    { value: 'POR_VENCER', label: 'Por vencer', color: 'amber' },
    { value: 'VENCIDA', label: 'Vencida', color: 'rose' }
  ];

  const estadosOnboarding = [
    { value: 'PENDIENTE', label: 'Pendiente', color: 'amber' },
    { value: 'EN_PROCESO', label: 'En proceso', color: 'blue' },
    { value: 'COMPLETADO', label: 'Completado', color: 'emerald' }
  ];

  const planes = [
    { value: 'BASICO', label: 'Plan Básico' },
    { value: 'PRO', label: 'Plan Pro' },
    { value: 'EMPRESARIAL', label: 'Plan Empresarial' }
  ];

  const ciclos = [
    { value: 'MENSUAL', label: 'Mensual' },
    { value: 'TRIMESTRAL', label: 'Trimestral' },
    { value: 'SEMESTRAL', label: 'Semestral' },
    { value: 'ANUAL', label: 'Anual' }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#161b22] w-full max-w-5xl rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <Edit size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black dark:text-white uppercase tracking-tight">Editar Información del Cliente</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                {cliente.nombre} • <span className="text-blue-500">ID: {cliente.ruc}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={20} className="dark:text-gray-400" />
          </button>
        </div>

        {/* FORMULARIO SCROLLABLE - GRID DE 2 COLUMNAS */}
        <div className="p-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* COLUMNA IZQUIERDA */}
            <div className="space-y-6">
              
              {/* SECCIÓN: DATOS DEL NEGOCIO */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Building2 size={14} /> Datos del Negocio
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">RUC:</label>
                    <input 
                      type="text" 
                      disabled
                      value={formData.ruc}
                      className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed"
                    />
                    <Lock size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Razón social:</label>
                    <input 
                      type="text" 
                      value={formData.razonSocial}
                      onChange={(e) => setFormData({...formData, razonSocial: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Nombre comercial:</label>
                    <input 
                      type="text" 
                      value={formData.nombreComercial}
                      onChange={(e) => setFormData({...formData, nombreComercial: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    />
                    <Lock size={14} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Alias (opcional):</label>
                    <input 
                      type="text" 
                      value={formData.alias}
                      onChange={(e) => setFormData({...formData, alias: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN: INFORMACIÓN DE CONTACTO */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <User size={14} /> Información de Contacto
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Contacto principal:</label>
                    <input 
                      type="text" 
                      value={formData.contactoPrincipal}
                      onChange={(e) => setFormData({...formData, contactoPrincipal: e.target.value})}
                      placeholder="María Torres"
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Teléfono:</label>
                    <input 
                      type="text" 
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      placeholder="999 888 777"
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Correo administrativo:</label>
                    <input 
                      type="email" 
                      value={formData.emailAdmin}
                      onChange={(e) => setFormData({...formData, emailAdmin: e.target.value})}
                      placeholder="admin@abc.com"
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN: SUBDOMINIO */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Globe size={14} /> Subdominio
                </h3>
                <div className="space-y-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">
                        Subdominio:
                      </label>
                      <div className="flex-1 flex items-center gap-1 min-w-[200px]">
                        <input 
                          type="text" 
                          value={formData.subdominio}
                          onChange={(e) => setFormData({...formData, subdominio: e.target.value})}
                          className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                        />
                        <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">.cistcorfact.com</span>
                      </div>
                    </div>
                    <div className="flex justify-end sm:justify-start">
                      <button className="px-4 py-2 text-[10px] font-black uppercase text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-all">
                        Cambiar subdominio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="space-y-6">
              
              {/* SECCIÓN: ESTADOS DE LA CUENTA */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <AlertCircle size={14} /> Estados de la Cuenta
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Cliente:</label>
                    <select 
                      value={formData.estadoCliente}
                      onChange={(e) => setFormData({...formData, estadoCliente: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    >
                      {estadosCliente.map(est => (
                        <option key={est.value} value={est.value}>{est.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Acceso:</label>
                    <select 
                      value={formData.estadoAcceso}
                      onChange={(e) => setFormData({...formData, estadoAcceso: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    >
                      {estadosAcceso.map(est => (
                        <option key={est.value} value={est.value}>{est.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Suscripción:</label>
                    <select 
                      value={formData.estadoSuscripcion}
                      onChange={(e) => setFormData({...formData, estadoSuscripcion: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    >
                      {estadosSuscripcion.map(est => (
                        <option key={est.value} value={est.value}>{est.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Onboarding:</label>
                    <select 
                      value={formData.estadoOnboarding}
                      onChange={(e) => setFormData({...formData, estadoOnboarding: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    >
                      {estadosOnboarding.map(est => (
                        <option key={est.value} value={est.value}>{est.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECCIÓN: PLAN Y CICLO */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <CreditCard size={14} /> Plan y Ciclo
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Plan:</label>
                    <select 
                      value={formData.plan}
                      onChange={(e) => setFormData({...formData, plan: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    >
                      {planes.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-400 w-32 uppercase">Ciclo:</label>
                    <select 
                      value={formData.ciclo}
                      onChange={(e) => setFormData({...formData, ciclo: e.target.value})}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-bold dark:text-white outline-none"
                    >
                      {ciclos.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECCIÓN: OBSERVACIONES INTERNAS */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText size={14} /> Observaciones Internas
                </h3>
                <textarea 
                  rows={6}
                  value={formData.observaciones}
                  onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                  placeholder="Cliente con dos unidades de negocio. Requiere reportes personalizados de ventas a fin de mes."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm font-medium dark:text-gray-200 outline-none resize-none"
                />
              </div>

            </div>
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
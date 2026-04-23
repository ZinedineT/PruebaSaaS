import React ,{useRef} from 'react';
import { 
  X, Pencil,  Copy, Mail, Phone, User,  ShieldCheck, Activity, CreditCard, Rocket, Info, History, Building, MapPin, Briefcase,
  CheckCircle, Clock
} from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface DetallesClienteProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
}

const DetallesCliente: React.FC<DetallesClienteProps> = ({ isOpen, onClose, cliente }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(isOpen, onClose, modalRef);

  if (!isOpen || !cliente) return null;
  // Badge Component para estados
  const StateBadge = ({ icon: Icon, label, value, colorClass }: any) => (
    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon size={14} />
        <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <span className={`text-xs font-black uppercase ${colorClass}`}>{value}</span>
    </div>
  );

  // InfoRow component para datos
  const InfoRow = ({ label, value, icon: Icon, copyable = false }: any) => (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
        {Icon && <Icon size={11} />} {label}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold dark:text-gray-200">{value || '-'}</p>
        {copyable && (
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Copy size={12} className="text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white dark:bg-[#161b22] w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 relative flex flex-col">
        
        {/* HEADER */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#161b22]/95 backdrop-blur-md z-10 p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                Detalle del cliente - <span className="text-blue-500">{cliente.codigoInterno || `CLI-${cliente.id.padStart(6, '0')}`}</span>
              </h2>
            </div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
              {cliente.nombre}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-[10px] font-black uppercase hover:bg-gray-200 transition-all">
              <Pencil size={14} /> Editar
            </button>
            <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-xl hover:bg-gray-200 transition-all">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CONTENIDO SCROLLABLE */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* SECCIÓN: INFORMACIÓN GENERAL + CONTACTO PRINCIPAL (2 columnas) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* INFORMACIÓN GENERAL */}
            <div className="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-5">
                <Building size={18} className="text-blue-500" />
                <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">Información General</h3>
              </div>
              <div className="space-y-4">
                <InfoRow label="Razón Social" value={cliente.nombre} copyable />
                <InfoRow label="RUC" value={cliente.ruc} copyable />
                <InfoRow label="Nombre comercial" value={cliente.nombreComercial} />
                <InfoRow label="Dirección Fiscal" value={cliente.direccionFiscal || 'No registrada'} icon={MapPin} />
                <InfoRow label="Subdominio" value={cliente.subdominio} copyable />
                <InfoRow label="Alias" value={cliente.alias} />
              </div>
            </div>

            {/* CONTACTO PRINCIPAL */}
            <div className="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-5">
                <User size={18} className="text-blue-500" />
                <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">Contacto Principal</h3>
              </div>
              <div className="space-y-4">
                <InfoRow label="Nombre" value={cliente.contactoPrincipal} icon={User} />
                <InfoRow label="Teléfono" value={cliente.telefono} icon={Phone} />
                <InfoRow label="Correo" value={cliente.emailAdmin} icon={Mail} />
                <InfoRow label="Cargo" value={cliente.cargoContacto || 'No especificado'} icon={Briefcase} />
              </div>
            </div>
          </div>

          {/* SECCIÓN: RESUMEN COMERCIAL (4 badges) */}
          <div className="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard size={18} className="text-emerald-500" />
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">Resumen Comercial</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-gray-400 uppercase">Plan</p>
                <p className="text-sm font-black text-blue-600">{cliente.plan}</p>
                <p className="text-[10px] text-gray-500">{cliente.ciclo}</p>
              </div>
              <StateBadge icon={Activity} label="Acceso" value={cliente.estadoAcceso === 'ACTIVO' ? 'Activo' : 'Bloqueado'} colorClass={cliente.estadoAcceso === 'ACTIVO' ? 'text-emerald-500' : 'text-rose-500'} />
              <div className="space-y-1">
                <p className="text-[9px] font-black text-gray-400 uppercase">Suscripción</p>
                <p className="text-sm font-black text-emerald-600">{cliente.suscripcion}</p>
                <p className="text-[10px] text-gray-500">Desde: {cliente.fechaInicio}</p>
                <p className="text-[10px] text-gray-500">Hasta: {cliente.fechaVence}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-gray-400 uppercase">Monto</p>
                <p className="text-sm font-black text-gray-900 dark:text-white">{cliente.moneda || 'S/'} {cliente.montoPlan || 0}.00</p>
                <p className="text-[10px] text-gray-500">/ mes</p>
              </div>
            </div>
          </div>

          {/* SECCIÓN: PROCESO DE ACTIVACIÓN (2 columnas) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Estado del Cliente */}
            <div className="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-5">
                <ShieldCheck size={18} className="text-purple-500" />
                <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">Estado del Cliente</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-xl">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Estado actual:</span>
                  <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg text-[10px] font-black uppercase">
                    {cliente.estado || 'Habilitado'}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2">
                    <Clock size={10} /> Se inició
                  </p>
                  <p className="text-xs font-bold dark:text-gray-200 pl-4 border-l-2 border-blue-500">
                    15/03/2026 - 04:22:12pm
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2">
                    <CheckCircle size={10} /> Se completó
                  </p>
                  <p className="text-xs font-bold dark:text-gray-200 pl-4 border-l-2 border-emerald-500">
                    15/03/2026 - 04:56:39pm
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Observaciones</p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800/50 p-3 rounded-xl">
                    {cliente.observaciones || 'No se registraron observaciones durante el proceso de activación.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Onboarding */}
            <div className="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-5">
                <Rocket size={18} className="text-amber-500" />
                <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">Onboarding</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-xl">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Estado:</span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg text-[10px] font-black uppercase">
                    Completado
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2">
                    <Clock size={10} /> Se inició
                  </p>
                  <p className="text-xs font-bold dark:text-gray-200 pl-4 border-l-2 border-amber-500">
                    15/03/2026 - 06:22:12pm
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2">
                    <CheckCircle size={10} /> Se completó
                  </p>
                  <p className="text-xs font-bold dark:text-gray-200 pl-4 border-l-2 border-emerald-500">
                    15/03/2026 - 07:29:19pm
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Observaciones</p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800/50 p-3 rounded-xl">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN: HISTORIAL RESUMIDO */}
          <div className="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <History size={18} className="text-gray-500" />
                <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">Historial Resumido</h3>
              </div>
              <button className="text-[10px] font-black text-blue-500 uppercase hover:underline flex items-center gap-1">
                Ver historial completo <Info size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { date: '15/03/2026 09:00', action: 'Registro recibido', user: 'sistema' },
                { date: '16/03/2026 10:15', action: 'Cliente habilitado', user: 'Admin_Carlos' },
                { date: '18/03/2026 14:20', action: 'Onboarding iniciado', user: 'Ana Ruiz' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-xs font-black dark:text-gray-200">{log.action}</p>
                    <p className="text-[9px] text-gray-400 font-medium">{log.date} • por {log.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-5 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 rounded-b-[2rem]">
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase transition-all shadow-lg shadow-blue-500/20">
            Ver historial completo
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetallesCliente;
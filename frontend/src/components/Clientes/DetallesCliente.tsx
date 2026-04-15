import React from 'react';
import { 
  X, Pencil, Globe, Copy, Mail, Phone, User, Tag, 
  FileText, ShieldCheck, Activity, CreditCard, Rocket, 
  Calendar, Info, History,
} from 'lucide-react';

interface DetallesClienteProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any; // Aquí luego integrarás tu interfaz real
}

const DetallesCliente: React.FC<DetallesClienteProps> = ({ isOpen, onClose, cliente }) => {
  if (!isOpen || !cliente) return null;

  // Badge Component para estados
  const StateBadge = ({ icon: Icon, label, value, colorClass }: any) => (
    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <span className={`text-xs font-black uppercase ${colorClass}`}>{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#161b22] w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 relative flex flex-col">
        
        {/* HEADER FIJO */}
        <div className="sticky top-0 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md z-10 p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                {cliente.nombre} <span className="text-blue-500 font-medium text-lg">(CLI-000245)</span>
              </h2>
              <button className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-400 hover:text-blue-500 transition-colors">
                <Copy size={14} />
              </button>
            </div>
            <div className="flex flex-wrap gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Tag size={12} className="text-blue-500"/> RUC: {cliente.ruc}</span>
              <span className="flex items-center gap-1.5"><Globe size={12} className="text-blue-500"/> Subdominio: {cliente.subdominio}</span>
              <span className="flex items-center gap-1.5 text-gray-500 italic font-medium">Comercial: ABC Tienda</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl text-[10px] font-black uppercase hover:bg-gray-200 transition-all">
              <Pencil size={14} /> Editar
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
              <Globe size={14} /> Acceso
            </button>
            <button onClick={onClose} className="p-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-2xl hover:scale-110 transition-transform">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="p-8 space-y-8 overflow-y-auto">
          {/* SECCIÓN ESTADOS (Fila de 4) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StateBadge icon={ShieldCheck} label="Cliente" value="Habilitado" colorClass="text-emerald-500" />
            <StateBadge icon={Activity} label="Acceso" value="Activo" colorClass="text-emerald-500" />
            <StateBadge icon={CreditCard} label="Suscripción" value="Vigente" colorClass="text-blue-500" />
            <StateBadge icon={Rocket} label="Onboarding" value="Completado" colorClass="text-purple-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* IZQUIERDA: DATOS Y PLAN (8 Columnas) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Bloque: Datos Administrativos */}
              <div className="bg-gray-50 dark:bg-gray-900/30 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <User className="text-blue-500" size={20} />
                  <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Datos Administrativos</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Contacto Principal</p>
                    <p className="text-sm font-bold dark:text-gray-200">María Torres</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Correo Administrativo</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-500">
                      <Mail size={14} /> admin@abc.com
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Teléfono</p>
                    <div className="flex items-center gap-2 text-sm font-bold dark:text-gray-200">
                      <Phone size={14} /> 999 888 777
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Canal Adquisición</p>
                    <p className="text-sm font-bold dark:text-gray-200">Referido</p>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Observaciones Internas</p>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                      Cliente con dos unidades de negocio operando bajo el mismo RUC. Requiere soporte prioritario.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloque: Plan y Suscripción */}
              <div className="bg-white dark:bg-gray-900/20 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-emerald-500" size={20} />
                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Plan y Suscripción</h3>
                  </div>
                  <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase border border-emerald-100 dark:border-emerald-800">
                    S/ 150.00 / Mes
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Plan Actual</p>
                    <p className="text-sm font-black text-blue-600 uppercase">Pro</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Ciclo</p>
                    <p className="text-sm font-bold dark:text-gray-200 uppercase tracking-tighter">Mensual</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Inicio</p>
                    <div className="flex items-center gap-2 text-sm font-bold dark:text-gray-200">
                      <Calendar size={14} className="text-gray-400" /> 15/03/2026
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Próximo Vencimiento</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-rose-500">
                      <Calendar size={14} /> 14/04/2026
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DERECHA: ONBOARDING E HISTORIAL (4 Columnas) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Bloque: Onboarding */}
              <div className="bg-purple-50/30 dark:bg-purple-500/5 p-8 rounded-[2.5rem] border border-purple-100/50 dark:border-purple-500/10">
                <div className="flex items-center gap-3 mb-6">
                  <Rocket className="text-purple-500" size={20} />
                  <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Onboarding</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Fecha Activación</p>
                      <p className="text-xs font-bold dark:text-gray-200">18/03/2026 14:20</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Activado por</p>
                      <p className="text-xs font-bold dark:text-gray-200 underline decoration-purple-500/30">Ana Ruiz</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Observación</p>
                      <p className="text-xs font-bold dark:text-gray-200 underline decoration-purple-500/30">Activación completada sin inconvenientes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque: Historial Corto */}
              <div className="bg-white dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <History className="text-gray-400" size={20} />
                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest text-[11px]">Actividad</h3>
                  </div>
                  <button className="text-[9px] font-black text-blue-500 uppercase hover:underline">Ver Todo</button>
                </div>
                <div className="space-y-4">
                  {[
                    { date: '15/03', action: 'Cliente creado', user: 'admin01' },
                    { date: '18/03', action: 'Plan actualizado', user: 'aruiz' },
                    { date: '02/04', action: 'Acceso bloqueado', user: 'sistema' },
                  ].map((log, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] border-b border-gray-50 dark:border-gray-800 pb-3 last:border-0">
                      <div className="flex flex-col">
                        <span className="font-black text-gray-900 dark:text-gray-200 uppercase">{log.action}</span>
                        <span className="text-gray-400">{log.date} • por {log.user}</span>
                      </div>
                      <Info size={12} className="text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
     
        {/* FOOTER */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 rounded-b-[3rem]">
          <button className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-[10px] font-black uppercase hover:scale-105 transition-all">
            Ver Historial Completo
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetallesCliente;
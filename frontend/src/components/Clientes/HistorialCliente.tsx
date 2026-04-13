import React from 'react';
import { X, History, Download, Filter, Calendar, User, Tag, Search, Clock, Smartphone, CreditCard, ShieldCheck, PlusCircle, Edit3 } from 'lucide-react';

interface HistorialClienteProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
}

const HistorialCliente: React.FC<HistorialClienteProps> = ({ isOpen, onClose, cliente }) => {
  if (!isOpen || !cliente) return null;

  // Mock de datos basado en tu wireframe
  const eventos = [
    { fecha: '11/04/2026', hora: '09:15 AM', cat: 'Acceso', evento: 'Restablecer acceso', motivo: 'Pago verificado BCP', usuario: 'Admin_Carlos', icon: <ShieldCheck size={14}/>, color: 'text-emerald-500 bg-emerald-500/10' },
    { fecha: '01/04/2026', hora: '00:01 AM', cat: 'Acceso', evento: 'Bloqueado por pago (automático)', motivo: 'Falta de pago verificado', usuario: 'Sistema', icon: <Clock size={14}/>, color: 'text-rose-500 bg-rose-500/10' },
    { fecha: '15/03/2026', hora: '02:30 PM', cat: 'Suscripción', evento: 'Cambio de plan: Básico → Pro', motivo: null, usuario: 'Maria_Ventas', icon: <CreditCard size={14}/>, color: 'text-purple-500 bg-purple-500/10' },
    { fecha: '25/03/2026', hora: '04:40 PM', cat: 'Onboarding', evento: 'Pendiente → Completado', motivo: null, usuario: 'Ana Ruiz', icon: <PlusCircle size={14}/>, color: 'text-blue-500 bg-blue-500/10' },
    { fecha: '20/03/2026', hora: '11:10 AM', cat: 'Edición', evento: 'Cambio de teléfono', motivo: null, usuario: 'Admin_Carlos', icon: <Edit3 size={14}/>, color: 'text-amber-500 bg-amber-500/10' },
    { fecha: '18/03/2026', hora: '02:20 PM', cat: 'Cliente', evento: 'Registrado → Habilitado', motivo: null, usuario: 'Admin_Carlos', icon: <ShieldCheck size={14}/>, color: 'text-emerald-500 bg-emerald-500/10' },
    { fecha: '10/01/2026', hora: '10:00 AM', cat: 'Registro', evento: 'Creación de cuenta', motivo: null, usuario: 'Registro_Web', icon: <Smartphone size={14}/>, color: 'text-gray-500 bg-gray-500/10' },
  ];

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#161b22] w-full max-w-5xl rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header con Exportar */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gray-900 dark:bg-white rounded-xl text-white dark:text-black shadow-lg">
              <History size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">Historial del Cliente</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Consulta los cambios y eventos registrados</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase rounded-xl transition-all shadow-lg shadow-blue-500/20">
              <Download size={14} /> Exportar Historial
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <X size={20} className="dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Info del Cliente */}
        <div className="px-8 py-4 bg-gray-50/30 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <div>
              <span className="text-[9px] font-black text-gray-400 uppercase block">Razón Social</span>
              <span className="text-sm font-black dark:text-white uppercase">{cliente.nombre}</span>
            </div>
            <div>
              <span className="text-[9px] font-black text-gray-400 uppercase block">RUC</span>
              <span className="text-sm font-bold dark:text-gray-300">{cliente.ruc}</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 hidden md:block"></div>
            <div className="flex gap-4">
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">Comercial: {cliente.nombreComercial || 'N/A'}</span>
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">Alias: {cliente.alias || 'N/A'}</span>
              <span className="text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-lg font-black">Subdominio: {cliente.subdominio}</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="p-6 flex flex-wrap items-center gap-4 bg-white dark:bg-[#161b22]">
          <span className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2">
            <Filter size={14} /> Filtrar por:
          </span>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
            <Calendar size={14} className="text-gray-400" />
            <select className="bg-transparent text-[10px] font-black uppercase outline-none dark:text-gray-300 cursor-pointer">
              <option>Últimos 30 días</option>
              <option>Este año</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
            <Tag size={14} className="text-gray-400" />
            <select className="bg-transparent text-[10px] font-black uppercase outline-none dark:text-gray-300 cursor-pointer">
              <option>Todas las categorías</option>
              <option>Acceso</option>
              <option>Suscripción</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
            <User size={14} className="text-gray-400" />
            <select className="bg-transparent text-[10px] font-black uppercase outline-none dark:text-gray-300 cursor-pointer">
              <option>Todos los usuarios</option>
              <option>Sistema</option>
            </select>
          </div>
          <button className="text-[10px] font-black text-blue-500 uppercase hover:underline">Limpiar</button>
        </div>

        {/* Tabla de Historial */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <table className="w-full">
            <thead className="sticky top-0 bg-white dark:bg-[#161b22] z-10">
              <tr className="border-b border-gray-100 dark:border-gray-800 text-left">
                <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fecha y Hora</th>
                <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Categoría</th>
                <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Acción / Evento</th>
                <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Usuario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {eventos.map((item, idx) => (
                <tr key={idx} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                  <td className="py-5">
                    <p className="text-xs font-black dark:text-white">{item.fecha}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{item.hora}</p>
                  </td>
                  <td className="py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase ${item.color}`}>
                      {item.icon} {item.cat}
                    </span>
                  </td>
                  <td className="py-5">
                    <p className="text-xs font-bold dark:text-gray-200">{item.evento}</p>
                    {item.motivo && (
                      <p className="text-[10px] text-gray-500 italic mt-0.5">Motivo: {item.motivo}</p>
                    )}
                  </td>
                  <td className="py-5 text-right">
                    <span className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                      {item.usuario}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistorialCliente;
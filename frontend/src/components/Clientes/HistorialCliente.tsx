import React, { JSX, useRef } from 'react';
import { X, History, Download, Filter, Calendar, User, Tag, Clock, CreditCard, ShieldCheck, PlusCircle, Edit3 } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { HistorialRegistrado, RegistradoWithHistory } from '../../services/registradosService';

interface HistorialClienteProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: RegistradoWithHistory | null;  // 👈 Actualizado al nuevo tipo
}

const HistorialCliente: React.FC<HistorialClienteProps> = ({ isOpen, onClose, cliente }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(isOpen, onClose, modalRef);
  if (!isOpen || !cliente) return null;
    const getColorByTipo = (tipo: string): string => {
    switch (tipo) {
      case 'registro':
        return 'text-blue-500 bg-blue-500/10';
      case 'exito':
        return 'text-emerald-500 bg-emerald-500/10';
      case 'error':
        return 'text-rose-500 bg-rose-500/10';
      case 'proceso':
        return 'text-amber-500 bg-amber-500/10';
      case 'cambio':
        return 'text-purple-500 bg-purple-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Función para obtener ícono según tipo
  const getIconByTipo = (tipo: string): JSX.Element => {
    switch (tipo) {
      case 'registro':
        return <ShieldCheck size={14} />;
      case 'exito':
        return <ShieldCheck size={14} />;
      case 'error':
        return <ShieldCheck size={14} />;
      case 'proceso':
        return <Clock size={14} />;
      case 'cambio':
        return <Edit3 size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  // 🔥 USAR DATOS REALES DEL CLIENTE en lugar de hardcodeados
  const eventos = cliente.historial && cliente.historial.length > 0 
    ? cliente.historial.map((evento: any) => {
        // Determinar categoría y color según la acción
        let categoria = 'General';
        let color = 'text-gray-500 bg-gray-500/10';
        let icon = <Clock size={14} />;
        
        if (evento.accion.toLowerCase().includes('acceso') || evento.accion.toLowerCase().includes('bloqueado')) {
          categoria = 'Acceso';
          color = 'text-rose-500 bg-rose-500/10';
          icon = <ShieldCheck size={14} />;
        } else if (evento.accion.toLowerCase().includes('plan') || evento.accion.toLowerCase().includes('suscripción')) {
          categoria = 'Suscripción';
          color = 'text-purple-500 bg-purple-500/10';
          icon = <CreditCard size={14} />;
        } else if (evento.accion.toLowerCase().includes('onboarding')) {
          categoria = 'Onboarding';
          color = 'text-blue-500 bg-blue-500/10';
          icon = <PlusCircle size={14} />;
        } else if (evento.accion.toLowerCase().includes('registro') || evento.accion.toLowerCase().includes('habilitado')) {
          categoria = 'Cliente';
          color = 'text-emerald-500 bg-emerald-500/10';
          icon = <ShieldCheck size={14} />;
        } else if (evento.accion.toLowerCase().includes('edit') || evento.accion.toLowerCase().includes('cambio')) {
          categoria = 'Edición';
          color = 'text-amber-500 bg-amber-500/10';
          icon = <Edit3 size={14} />;
        }
        
        // Formatear fecha
        let fechaFormateada = evento.fecha;
        let horaFormateada = '';
        
        if (evento.fecha && evento.fecha.includes(' ')) {
          const [fecha, hora] = evento.fecha.split(' ');
          fechaFormateada = fecha;
          horaFormateada = hora;
        }
        
        return {
          fecha: fechaFormateada,
          hora: horaFormateada,
          cat: categoria,
          evento: evento.accion,
          // motivo: evento.observaciones || null,
          usuario: evento.usuario,
          icon: icon,
          color: color
        };
      })
    : []; // Si no hay historial, array vacío

  // Si no hay eventos, mostrar mensaje
  const tieneEventos = eventos.length > 0;

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white dark:bg-[#161b22] w-full max-w-5xl rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header con Exportar */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-transparent rounded-xl text-black dark:text-white shadow-lg">
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

        {/* Filtros (opcionales, puedes mantenerlos o eliminarlos) */}
        <div className="p-6 flex flex-wrap items-center gap-4 bg-white dark:bg-[#161b22]">
          <span className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2">
            <Filter size={14} /> Filtrar por:
          </span>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
            <Calendar size={14} className="text-gray-400" />
            <select className="bg-gray-50 dark:bg-gray-800 text-[10px] font-black uppercase outline-none dark:text-gray-300 cursor-pointer">
              <option>Todos</option>
              <option>Últimos 30 días</option>
              <option>Este año</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
            <Tag size={14} className="text-gray-400" />
            <select className="bg-gray-50 dark:bg-gray-800 text-[10px] font-black uppercase outline-none dark:text-gray-300 cursor-pointer">
              <option>Todas las categorías</option>
              <option>Acceso</option>
              <option>Suscripción</option>
              <option>Cliente</option>
              <option>Edición</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
            <User size={14} className="text-gray-400" />
            <select className="bg-gray-50 dark:bg-gray-800 text-[10px] font-black uppercase outline-none dark:text-gray-300 cursor-pointer">
              <option>Todos los usuarios</option>
              <option>Sistema</option>
            </select>
          </div>
          <button className="text-[10px] font-black text-blue-500 uppercase hover:underline">Limpiar</button>
        </div>

        {/* Tabla de Historial */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {tieneEventos ? (
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
                {cliente.historial.map((evento: HistorialRegistrado, idx) => (
                  <tr key={idx}>
                    <td className="py-5">
                      <p className="text-xs font-black dark:text-white">{evento.fecha?.split(' ')[0]}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{evento.fecha?.split(' ')[1]}</p>
                    </td>
                    <td className="py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase ${getColorByTipo(evento.tipo)}`}>
                        {getIconByTipo(evento.tipo)} {evento.tipo}
                      </span>
                    </td>
                    <td className="py-5">
                      <p className="text-xs font-bold dark:text-gray-200">{evento.accion}</p>  {/* ← accion, no evento */}
                      {evento.descripcion && (
                        <p className="text-[10px] text-gray-500 italic mt-0.5">{evento.descripcion}</p>
                      )}
                    </td>
                    <td className="py-5 text-right">
                      <span className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        {evento.usuario}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-20">
              <History size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400">No hay eventos en el historial</p>
              <p className="text-xs text-gray-400 mt-1">Los cambios realizados al cliente aparecerán aquí</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorialCliente;
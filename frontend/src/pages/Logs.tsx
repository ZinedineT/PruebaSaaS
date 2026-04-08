import React, { useState } from 'react';
import { 
  ExclamationTriangleIcon, CheckCircleIcon,MagnifyingGlassIcon,ArrowDownTrayIcon,TrashIcon,CpuChipIcon,ClockIcon
} from '@heroicons/react/24/outline';
import { CommandIcon } from 'lucide-react';

interface LogEntry {
  id: string;
  fecha: string;
  nivel: 'error' | 'warning' | 'success' | 'info';
  servicio: 'SUNAT' | 'AUTH' | 'API' | 'SISTEMA';
  mensaje: string;
  usuario: string;
  ip: string;
}

const logsData: LogEntry[] = [
  { id: '1', fecha: '2024-05-20 14:30:05', nivel: 'error', servicio: 'SUNAT', mensaje: 'Error 1033: El comprobante ya fue informado anteriormente', usuario: 'Admin @ Soluciones Tech', ip: '192.168.1.1' },
  { id: '2', fecha: '2024-05-20 14:35:10', nivel: 'success', servicio: 'AUTH', mensaje: 'Login exitoso - Token JWT generado', usuario: 'j.perez@cliente.com', ip: '181.176.45.10' },
  { id: '3', fecha: '2024-05-20 14:40:00', nivel: 'warning', servicio: 'API', mensaje: 'Latencia alta detectada en endpoint /v1/invoice/send (1500ms)', usuario: 'Sistema', ip: '10.0.0.5' },
  { id: '4', fecha: '2024-05-20 14:45:22', nivel: 'info', servicio: 'SISTEMA', mensaje: 'Copia de seguridad programada completada', usuario: 'CronJob', ip: 'localhost' },
];

const Logs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getNivelStyle = (nivel: string) => {
    switch (nivel) {
      case 'error': return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
      case 'warning': return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      default: return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 space-y-8 bg-gray-50/50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-500">
            <CommandIcon className="text-blue-500" size={24}/>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Logs del Sistema</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Auditoría técnica y trazabilidad de operaciones</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm">
            <ArrowDownTrayIcon className="w-4 h-4" /> Exportar
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 dark:hover:bg-red-500/20 transition-all border border-red-100 dark:border-red-900/30">
            <TrashIcon className="w-4 h-4" /> Limpiar
          </button>
        </div>
      </div>

      {/* FILTROS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 relative group">
          <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text"
            placeholder="Buscar por mensaje, usuario o IP..."
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold transition-all shadow-sm text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="lg:col-span-4 flex gap-2">
           <select 
            className="w-full px-5 py-4 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-[1.5rem] outline-none font-black text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-300 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
           >
             <option value="todos">Todos los Niveles</option>
             <option value="error">Solo Errores</option>
             <option value="warning">Advertencias</option>
             <option value="success">Éxitos</option>
           </select>
        </div>
      </div>

      {/* TABLA PRINCIPAL */}
      <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm transition-all">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-900/50">
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Timestamp</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Nivel</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Servicio</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Detalle del Evento</th>
                <th className="px-6 py-5 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Origen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
              {logsData.map((log) => (
                <tr key={log.id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
                      <ClockIcon className="w-3.5 h-3.5" />
                      {log.fecha}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-tight ${getNivelStyle(log.nivel)}`}>
                      {log.nivel === 'error' && <ExclamationTriangleIcon className="w-3 h-3" />}
                      {log.nivel === 'success' && <CheckCircleIcon className="w-3 h-3" />}
                      {log.nivel}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <CpuChipIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <span className="text-[11px] font-black text-gray-700 dark:text-gray-200 tracking-wider">{log.servicio}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 max-w-md">
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 line-clamp-1 group-hover:line-clamp-none transition-all">
                      {log.mensaje}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-tighter">{log.usuario}</div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500 font-mono mt-0.5">{log.ip}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* FOOTER */}
        <div className="px-8 py-6 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Monitoreo activo • 1,240 registros
            </span>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2.5 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-indigo-600 dark:hover:text-white transition-all shadow-sm">Anterior</button>
            <button className="px-5 py-2.5 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-indigo-600 dark:hover:text-white transition-all shadow-sm">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
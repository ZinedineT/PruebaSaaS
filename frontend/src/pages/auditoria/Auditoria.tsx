import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  User, 
  Clock, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Download,
  Terminal,
  ChevronRight
} from 'lucide-react';

const Auditoria: React.FC = () => {
  const [filter, setFilter] = useState('todos');

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* HEADER: TÍTULO Y BÚSQUEDA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <History className="text-blue-500" size={32} />
            Registro de Auditoría
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-2 font-medium">
            Historial completo de eventos, cambios de estado y acciones del sistema.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar acción o usuario..." 
              className="pl-12 pr-6 py-3 bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all w-full sm:w-64"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase shadow-xl transition-all hover:scale-105 active:scale-95">
            <Download size={16} />
            Exportar Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LADO IZQUIERDO: TIMELINE DE EVENTOS */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-6 lg:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Terminal size={20} className="text-blue-500" />
                <h2 className="text-lg font-black dark:text-white uppercase tracking-tight">Logs del Sistema</h2>
              </div>
              <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl">
                {['todos', 'seguridad', 'ventas'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                      filter === t ? 'bg-white dark:bg-gray-700 text-blue-500 shadow-sm' : 'text-gray-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* LISTA DE EVENTOS */}
            <div className="space-y-6 relative before:absolute before:left-[21px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 dark:before:bg-gray-800">
              {[1, 2, 3, 4, 5].map((item, i) => (
                <div key={i} className="relative pl-12 group">
                  {/* Indicador circular */}
                  <div className="absolute left-0 top-1 w-[44px] h-[44px] bg-white dark:bg-[#161b22] border-4 border-gray-50 dark:border-[#0f1115] rounded-2xl flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`}></div>
                  </div>

                  <div className="bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-[1.5rem] border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-black dark:text-white flex items-center gap-2">
                          Actualización de Plan Empresarial
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[8px] uppercase rounded-md font-black">Success</span>
                        </p>
                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1.5 text-[10px] font-bold">
                            <User size={12} /> admin_root
                          </span>
                          <span className="flex items-center gap-1.5 text-[10px] font-bold">
                            <Globe size={12} /> 192.168.1.45 (Lima, PE)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <div className="hidden md:block">
                          <p className="text-[11px] font-black dark:text-gray-300">10:45 AM</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-nowrap">Hace 5 min</p>
                        </div>
                        <button className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:text-blue-500 transition-all shadow-sm">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl text-[10px] font-black text-gray-400 uppercase hover:border-blue-500 hover:text-blue-500 transition-all">
              Cargar registros anteriores
            </button>
          </div>
        </div>

        {/* LADO DERECHO: ANALÍTICA DE AUDITORÍA (SIDEBAR) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* BLOQUE ESTADO DE SEGURIDAD */}
          <div className="bg-[#1e293b] dark:bg-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
                <ShieldCheck size={24} />
                Estado Global
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-2xl font-black">1.2k</p>
                  <p className="text-[9px] font-bold uppercase text-blue-100 opacity-70">Eventos hoy</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-2xl font-black text-rose-300">0</p>
                  <p className="text-[9px] font-bold uppercase text-blue-100 opacity-70">Alertas Críticas</p>
                </div>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase">Sistema Activo</p>
                  <p className="text-[9px] font-bold text-blue-100">Uptime: 99.99%</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          {/* BLOQUE FILTROS RÁPIDOS */}
          <div className="bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                  <Filter size={20} />
                </div>
                <span className="font-black text-sm uppercase dark:text-white tracking-tight">Filtros por Entidad</span>
             </div>
             
             <div className="space-y-3">
                {[
                  { label: 'Facturas', color: 'bg-blue-500' },
                  { label: 'Usuarios', color: 'bg-purple-500' },
                  { label: 'Configuración', color: 'bg-amber-500' },
                  { label: 'Accesos', color: 'bg-emerald-500' },
                ].map((tag) => (
                  <label key={tag.label} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${tag.color}`}></div>
                      <span className="text-xs font-bold dark:text-gray-300">{tag.label}</span>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shadow-sm" />
                  </label>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auditoria;
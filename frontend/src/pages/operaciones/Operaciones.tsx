import React from 'react';
import { 
  ShieldAlert, 
  FileWarning, 
  History, 
  AlertTriangle, 
  Users, 
  ExternalLink, 
  RefreshCcw,
  MessageSquare,
  Zap
} from 'lucide-react';

const Operaciones: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* HEADER PRINCIPAL */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2 sm:gap-3">
            <Zap className="text-blue-500" size={32} />
            Centro de Operaciones
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 font-medium">
            Monitoreo en tiempo real de comprobantes, alertas de facturación y límites.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-2xl font-black text-[10px] uppercase text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-50 transition-all">
            <History size={16} />
            Historial
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-blue-500/25 hover:-translate-y-1 transition-all">
            <RefreshCcw size={16} />
            Sincronizar SUNAT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LADO IZQUIERDO: GESTIÓN DE COMPROBANTES (EXPANDIDO) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-6 lg:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-2xl flex items-center justify-center">
                  <FileWarning size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black dark:text-white tracking-tight">Salud de Comprobantes</h2>
                  <p className="text-sm text-gray-500 font-medium">Documentos que requieren atención inmediata.</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800">
                    <th className="pb-4">Cliente / Documento</th>
                    <th className="pb-4">Motivo del Error</th>
                    <th className="pb-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {[1, 2, 3].map((_, i) => (
                    <tr key={i} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="py-5">
                        <p className="font-black text-sm dark:text-white uppercase">Corporación Nova S.A.C</p>
                        <p className="text-[10px] text-gray-400 font-bold">F001-0000{450 + i} • S/ 1,200.00</p>
                      </td>
                      <td className="py-5">
                        <span className="flex items-center gap-1.5 text-rose-500 font-bold text-[11px]">
                          <AlertTriangle size={14} />
                          Error de validación RUC receptor
                        </span>
                      </td>
                      <td className="py-5 text-right">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
                          <ExternalLink size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* GRID INFERIOR: ACCIONES RÁPIDAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-5">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-2xl flex items-center justify-center">
                <ShieldAlert size={28} />
              </div>
              <div>
                <p className="text-2xl font-black dark:text-white">11</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pendientes de Anulación</p>
              </div>
            </div>
            <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center">
                <RefreshCcw size={28} />
              </div>
              <div>
                <p className="text-2xl font-black dark:text-white">57</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pendientes de Envío</p>
              </div>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: ALERTAS Y LÍMITES (SIDERBAR) */}
        <div className="lg:col-span-4 space-y-6">
          {/* BLOQUE VENCIMIENTOS - ESTILO AZUL BENTO */}
          <div className="bg-[#1e293b] dark:bg-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
                <Users size={24} />
                Vencimientos
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Inversiones G&M', days: 'En 3 días' },
                  { name: 'Logística Express', days: 'Hoy' }
                ].map((cli, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10">
                    <div>
                      <p className="font-black text-sm">{cli.name}</p>
                      <p className="text-blue-200 text-[10px] font-bold uppercase">{cli.days}</p>
                    </div>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-[11px] uppercase shadow-lg hover:bg-blue-50 transition-all">
                Ver todos los vencimientos
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          {/* BLOQUE LÍMITES */}
          <div className="bg-white dark:bg-[#161b22] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                  <AlertTriangle size={20} />
                </div>
                <span className="font-black text-sm uppercase dark:text-white tracking-tight">Límites Críticos</span>
             </div>
             
             <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase">Market San José</span>
                    <span className="text-[10px] font-black dark:text-white">98%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[98%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase">Tiendas Oro</span>
                    <span className="text-[10px] font-black dark:text-white">85%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[85%]"></div>
                  </div>
                </div>
             </div>

             <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl text-[10px] font-black text-gray-400 uppercase hover:border-blue-500 hover:text-blue-500 transition-all">
               Gestionar Cuotas
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Operaciones;
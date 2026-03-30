import React, { useState, useMemo } from 'react';
import { 
  RocketLaunchIcon, ClockIcon, ChevronRightIcon, MagnifyingGlassIcon,
  FunnelIcon, ArrowPathIcon, CheckBadgeIcon, CalendarDaysIcon,
  PencilSquareIcon, PauseCircleIcon, PlayCircleIcon, NoSymbolIcon
} from '@heroicons/react/24/outline';
import CambiarPlanModal from '../../components/GestionPlanes/CambiarPlanModal';

// --- INTERFACES ---
interface HistorialPlan {
  plan: string;
  fechaInicio: string;
  fechaFin: string;
  monto: string;
  estado: 'completado' | 'actual';
}

interface ClientePlan {
  id: number;
  empresa: string;
  ruc: string;
  planActual: 'Básico' | 'Premium' | 'Ilimitado';
  estadoPago: 'al día' | 'pendiente' | 'vencido';
  estadoSuscripcion: 'activo' | 'suspendido' | 'cancelado';
  proximoVence: string;
  historial: HistorialPlan[];
}

const clientesPlanesData: ClientePlan[] = [
  { 
    id: 1, empresa: 'SOLUCIONES TECH S.A.C', ruc: '20123456789', planActual: 'Ilimitado', 
    estadoPago: 'al día', estadoSuscripcion: 'activo', proximoVence: '2024-12-31',
    historial: [
      { plan: 'Ilimitado', fechaInicio: '2024-01-01', fechaFin: '2024-12-31', monto: 'S/ 500', estado: 'actual' },
    ]
  },
  { 
    id: 2, empresa: 'MINERA DEL SUR', ruc: '20987654321', planActual: 'Premium', 
    estadoPago: 'vencido', estadoSuscripcion: 'suspendido', proximoVence: '2024-04-15',
    historial: [
      { plan: 'Premium', fechaInicio: '2024-01-15', fechaFin: '2024-04-15', monto: 'S/ 300', estado: 'actual' }
    ]
  }
];

const GestionPlanes: React.FC = () => {
  const [selectedCliente, setSelectedCliente] = useState<ClientePlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'activo' | 'suspendido' | 'cancelado'>('todos');

  // Estilos dinámicos para badges
  const getStatusStyle = (estado: string) => {
    const primary = 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400';
    const success = 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400';
    const warning = 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400';
    const danger = 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400';

    if (['al día', 'activo', 'completado'].includes(estado)) return success;
    if (['pendiente', 'suspendido'].includes(estado)) return warning;
    if (['vencido', 'cancelado'].includes(estado)) return danger;
    return primary;
  };

  // Lógica de filtrado
  const filteredClientes = useMemo(() => {
    return clientesPlanesData.filter(cliente => {
      const matchesSearch = cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) || cliente.ruc.includes(searchTerm);
      const matchesFilter = filterStatus === 'todos' || cliente.estadoSuscripcion === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus]);

  const handleConfirmCambio = (data: any) => {
    console.log("Datos recibidos:", data, "Cliente:", selectedCliente?.empresa);
    setIsModalOpen(false);
    alert(`Plan actualizado con éxito para ${selectedCliente?.empresa}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 bg-gray-50/50 dark:bg-[#0f1115] min-h-screen transition-all">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-blue-500">
            <RocketLaunchIcon className="w-8 h-8" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2 sm:gap-3 uppercase">Suscripciones</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium mt-1">Control operativo y ciclo de vida de clientes</p>
        </div>

        <div className="flex gap-3">
           <button className="p-3 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-500 hover:text-blue-500 transition-all">
              <ArrowPathIcon className="w-5 h-5" />
           </button>
           <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-900/10 dark:shadow-blue-500/10">
              <CheckBadgeIcon className="w-4 h-4" />
              Actualizar Sistema
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LADO IZQUIERDO: LISTA Y FILTROS (COL-7) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* BUSCADOR Y FILTROS RÁPIDOS */}
          <div className="space-y-4">
            <div className="relative group">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar por empresa o RUC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/5 font-bold text-sm transition-all"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(['todos', 'activo', 'suspendido', 'cancelado'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    filterStatus === status 
                    ? 'bg-gray-900 text-white border-gray-900 dark:bg-blue-600 dark:border-blue-600' 
                    : 'bg-white dark:bg-[#161b22] text-gray-400 border-gray-100 dark:border-gray-800 hover:border-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* TABLA DE CLIENTES */}
          <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                    <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Cliente</th>
                    <th className="px-6 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Suscripción</th>
                    <th className="px-6 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Pago</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                  {filteredClientes.map((cliente) => (
                    <tr 
                      key={cliente.id} 
                      onClick={() => setSelectedCliente(cliente)}
                      className={`cursor-pointer transition-all hover:bg-blue-50/30 dark:hover:bg-blue-900/5 ${selectedCliente?.id === cliente.id ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                    >
                      <td className="px-6 py-6">
                        <div className="text-sm font-black text-gray-900 dark:text-white uppercase truncate max-w-[200px]">{cliente.empresa}</div>
                        <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">RUC: {cliente.ruc}</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className={`inline-flex px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-tighter ${getStatusStyle(cliente.estadoSuscripcion)}`}>
                          {cliente.estadoSuscripcion}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-tighter ${getStatusStyle(cliente.estadoPago)}`}>
                          {cliente.estadoPago}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: DETALLE E HISTORIAL (COL-5) */}
        <div className="xl:col-span-5">
          {selectedCliente ? (
            <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 shadow-sm sticky top-10 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* ACCIONES RÁPIDAS DE ESTADO */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Control de Acceso</h2>
                  <div className={`p-2 rounded-xl ${getStatusStyle(selectedCliente.estadoSuscripcion)}`}>
                    {selectedCliente.estadoSuscripcion === 'activo' ? <PlayCircleIcon className="w-6 h-6" /> : <PauseCircleIcon className="w-6 h-6" />}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {selectedCliente.estadoSuscripcion === 'activo' ? (
                    <button className="flex items-center justify-center gap-2 py-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 rounded-xl font-black text-[9px] uppercase tracking-widest border border-amber-100 dark:border-amber-900/30 hover:bg-amber-100 transition-all">
                      <PauseCircleIcon className="w-4 h-4" /> Suspender
                    </button>
                  ) : (
                    <button className="flex items-center justify-center gap-2 py-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-xl font-black text-[9px] uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-100 transition-all">
                      <PlayCircleIcon className="w-4 h-4" /> Restaurar
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-xl font-black text-[9px] uppercase tracking-widest border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-all">
                    <NoSymbolIcon className="w-4 h-4" /> Cancelar Plan
                  </button>
                </div>
              </div>

              {/* LÍNEA DE TIEMPO */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Línea de Tiempo</span>
                  <ClockIcon className="w-4 h-4 text-gray-300" />
                </div>

                <div className="space-y-8">
                  {selectedCliente.historial.map((item, idx) => (
                    <div key={idx} className="relative pl-8 pb-2 border-l-2 border-dashed border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white dark:border-[#161b22] ${item.estado === 'actual' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${item.estado === 'actual' ? 'text-blue-500' : 'text-gray-400'}`}>
                            Plan {item.plan}
                          </span>
                          <span className="text-[11px] font-black text-gray-900 dark:text-white">{item.monto}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <CalendarDaysIcon className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">{item.fechaInicio}</span>
                          </div>
                          <ChevronRightIcon className="w-3 h-3" />
                          <div className="flex items-center gap-1 text-xs font-bold">{item.fechaFin}</div>
                        </div>

                        {item.estado === 'actual' && (
                          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-600/5 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                            <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Próximo Vencimiento</div>
                            <div className="text-sm font-black text-blue-700 dark:text-blue-400">{selectedCliente.proximoVence}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACCIÓN PRINCIPAL */}
              <div className="pt-6 border-t border-gray-50 dark:border-gray-800">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-500/10"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                  Cambiar Plan Actual
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-gray-50/50 dark:bg-[#161b22]/50 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-10 text-center">
              <FunnelIcon className="w-12 h-12 text-gray-200 mb-4" />
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed">Selecciona un cliente para<br/>gestionar su suscripción</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <CambiarPlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        cliente={selectedCliente} 
        onConfirm={handleConfirmCambio} 
      />
    </div>
  );
};

export default GestionPlanes;
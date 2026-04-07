import React, { useState, useMemo } from 'react';
import { 
  RocketLaunchIcon, ClockIcon, MagnifyingGlassIcon,
  ArrowPathIcon, CheckBadgeIcon, CalendarDaysIcon,
  PencilSquareIcon, PauseCircleIcon, PlayCircleIcon, NoSymbolIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import CambiarPlanModal from '../../components/GestionPlanes/CambiarPlanModal';
import IconButton from '../../components/ui/IconButton';
import { LoadingSpinner } from '../../components/ui/LoadingSkeleton';
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

const initialData: ClientePlan[] = [
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
  const [clientes, setClientes] = useState<ClientePlan[]>(initialData);
  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'activo' | 'suspendido' | 'cancelado'>('todos');

  // Obtener el objeto cliente seleccionado basado en el ID
  const selectedCliente = useMemo(() => 
    clientes.find(c => c.id === selectedClienteId) || null
  , [selectedClienteId, clientes]);

  // Funciones de cambio de estado (Control de Acceso)
  const updateClienteStatus = (id: number, newStatus: 'activo' | 'suspendido' | 'cancelado') => {
    setClientes(prev => prev.map(c => 
      c.id === id ? { ...c, estadoSuscripcion: newStatus } : c
    ));
  };

  // Estilos dinámicos para badges (Mejorado para Light/Dark)
  const getStatusStyle = (estado: string) => {
    const success = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
    const warning = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
    const danger = 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
    const primary = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';

    if (['al día', 'activo', 'completado'].includes(estado)) return success;
    if (['pendiente', 'suspendido'].includes(estado)) return warning;
    if (['vencido', 'cancelado'].includes(estado)) return danger;
    return primary;
  };

  // Lógica de filtrado
  const filteredClientes = useMemo(() => {
    return clientes.filter(cliente => {
      const matchesSearch = cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) || cliente.ruc.includes(searchTerm);
      const matchesFilter = filterStatus === 'todos' || cliente.estadoSuscripcion === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus, clientes]);

  const handleConfirmCambio = (data: { nuevoPlan: string; monto: string; fechaInicio: string }) => {
    if (!selectedClienteId) return;

    setClientes(prevClientes => prevClientes.map(cliente => {
      if (cliente.id === selectedClienteId) {
        // 1. Creamos el nuevo registro para el historial
        const nuevoHistorial: HistorialPlan = {
          plan: data.nuevoPlan,
          fechaInicio: data.fechaInicio,
          fechaFin: '2025-12-31', // Fecha estimada o calculada
          monto: data.monto,
          estado: 'actual'
        };

        // 2. Pasamos los registros anteriores a estado 'completado'
        const historialActualizado = cliente.historial.map(h => ({
          ...h,
          estado: 'completado' as const
        }));

        // 3. Retornamos el cliente con el plan actualizado y el historial nuevo
        return {
          ...cliente,
          planActual: data.nuevoPlan as 'Básico' | 'Premium' | 'Ilimitado',
          historial: [nuevoHistorial, ...historialActualizado]
        };
      }
      return cliente;
    }));

    setIsModalOpen(false);
    // Opcional: Feedback visual
    console.log(`Plan de ${selectedCliente?.empresa} actualizado a ${data.nuevoPlan}`);
  };
  if (loading) {
    return <LoadingSpinner message="Cargando gestión de planes..." fullScreen={true} size="md" />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 bg-gray-50/50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-500">
            <RocketLaunchIcon className="w-10 h-10" />
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Suscripciones</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium ">Gestión de facturación y ciclos de vida</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
            <IconButton
              onClick={() => console.log('Actualizar lista')}
              icon={<ArrowPathIcon className="w-5 h-5" />}
              variant="secondary"
              size="lg"
              title="Actualizar lista"
            />
           <button className="flex-[3] md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:shadow-2xl shadow-blue-500/20 transition-all active:scale-95">
              <CheckBadgeIcon className="w-4 h-4" />
              Sincronizar
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LADO IZQUIERDO: LISTA */}
        <div className="xl:col-span-7 space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar cliente por RUC o Nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-sm dark:text-white transition-all shadow-sm"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(['todos', 'activo', 'suspendido', 'cancelado'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                    filterStatus === status 
                    ? 'bg-gray-900 text-white border-gray-900 dark:bg-blue-600 dark:border-blue-600' 
                    : 'bg-white dark:bg-[#161b22] text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-800 hover:border-blue-400 hover:text-blue-500'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-gray-900/50 text-gray-400 dark:text-gray-500">
                    <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest">Empresa</th>
                    <th className="px-6 py-5 text-center text-[10px] font-black uppercase tracking-widest">Suscripción</th>
                    <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest">Estado Pago</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                  {filteredClientes.map((cliente) => (
                    <tr 
                      key={cliente.id} 
                      onClick={() => setSelectedClienteId(cliente.id)}
                      className={`cursor-pointer transition-all group ${selectedClienteId === cliente.id ? 'bg-blue-50/50 dark:bg-blue-500/5' : 'hover:bg-gray-50/50 dark:hover:bg-white/5'}`}
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${selectedClienteId === cliente.id ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-blue-500'}`}>
                                <UserCircleIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{cliente.empresa}</div>
                                <div className="text-[10px] text-gray-400 font-mono">RUC: {cliente.ruc}</div>
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-tighter ${getStatusStyle(cliente.estadoSuscripcion)}`}>
                          {cliente.estadoSuscripcion}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-tighter ${getStatusStyle(cliente.estadoPago)}`}>
                          {cliente.estadoPago}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: ACCIONES */}
        <div className="xl:col-span-5">
          {selectedCliente ? (
            <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-200 dark:border-gray-800 p-8 shadow-sm sticky top-10 space-y-8">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">Control Operativo</h2>
                  <div className={`p-3 rounded-2xl border shadow-lg ${getStatusStyle(selectedCliente.estadoSuscripcion)}`}>
                    {selectedCliente.estadoSuscripcion === 'activo' ? <PlayCircleIcon className="w-7 h-7" /> : <PauseCircleIcon className="w-7 h-7" />}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {selectedCliente.estadoSuscripcion === 'activo' ? (
                    <button 
                      onClick={() => updateClienteStatus(selectedCliente.id, 'suspendido')}
                      className="flex items-center justify-center gap-2 py-4 bg-amber-50 dark:bg-amber-500/10 text-amber-600 rounded-2xl font-black text-[9px] uppercase tracking-widest border border-amber-200 dark:border-amber-900/30 hover:bg-amber-100 transition-all shadow-sm"
                    >
                      <PauseCircleIcon className="w-4 h-4" /> Suspender
                    </button>
                  ) : (
                    <button 
                      onClick={() => updateClienteStatus(selectedCliente.id, 'activo')}
                      className="flex items-center justify-center gap-2 py-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl font-black text-[9px] uppercase tracking-widest border border-emerald-200 dark:border-emerald-900/30 hover:bg-emerald-100 transition-all shadow-sm"
                    >
                      <PlayCircleIcon className="w-4 h-4" /> Restaurar
                    </button>
                  )}
                  <button 
                    onClick={() => updateClienteStatus(selectedCliente.id, 'cancelado')}
                    className="flex items-center justify-center gap-2 py-4 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-2xl font-black text-[9px] uppercase tracking-widest border border-red-200 dark:border-red-900/30 hover:bg-red-100 transition-all shadow-sm"
                  >
                    <NoSymbolIcon className="w-4 h-4" /> Cancelar
                  </button>
                </div>
              </div>

              {/* LÍNEA DE TIEMPO REFINADA */}
              <div className="space-y-6 bg-gray-50 dark:bg-gray-900/30 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" /> Registro de Actividad
                  </span>
                </div>

                <div className="space-y-6">
                  {selectedCliente.historial.map((item, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-800 last:border-0">
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white dark:border-[#161b22] shadow-sm ${item.estado === 'actual' ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`} />
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-tight">
                          <span className={item.estado === 'actual' ? 'text-blue-600' : 'text-gray-400'}>Plan {item.plan}</span>
                          <span className="text-gray-900 dark:text-white">{item.monto}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                          <CalendarDaysIcon className="w-3 h-3" />
                          {item.fechaInicio} — {item.fechaFin}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-gray-900 dark:bg-blue-600 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:-translate-y-1 active:scale-95 transition-all"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                  Cambiar Plan Actual
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#161b22]/30 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-10 text-center transition-colors">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                 <UserCircleIcon className="w-10 h-10 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 font-black uppercase text-[10px] tracking-[0.2em] leading-relaxed">
                Selecciona un cliente<br/>para auditoría y cambios
              </p>
            </div>
          )}
        </div>
      </div>

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
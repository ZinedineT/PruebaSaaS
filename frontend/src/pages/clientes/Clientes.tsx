import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  FilterX, 
  Eye, 
  Lock, 
  Unlock, 
  Copy,
  UserCheck,
  UserX,
  UserCog,
  Rocket,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';
import IconButton from '../../components/ui/IconButton';
import DetallesCliente from '../../components/Clientes/DetallesCliente';

const Clientes = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  // 2. Crea el estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  // 3. Función para abrir
  const verDetalle = (cliente: any) => {
    setClienteSeleccionado(cliente);
    setIsModalOpen(true);
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };
  return (
    <>
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* 1. ENCABEZADO SUPERIOR Y 2. SUBTÍTULO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <Users className="text-blue-600" size={32} />
            Clientes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
            Administración de clientes
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <IconButton
            onClick={handleRefresh}
            icon={isRefreshing}
            variant="secondary"
            size="lg"
            title="Actualizar lista"
          />
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/25 transition-all hover:-translate-y-1 active:scale-95 text-sm uppercase">
            <UserPlus size={20} />
            Nuevo cliente
          </button>
        </div>
      </div>

      {/* 3. SECCIÓN: RESUMEN GENERAL (ESTILO BENTO) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total clientes', val: '245', color: 'text-gray-900 dark:text-white', icon: Users, bg: 'bg-gray-100 dark:bg-gray-800' },
          { label: 'Activos', val: '210', color: 'text-emerald-500', icon: UserCheck, bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
          { label: 'Bloqueados', val: '12', color: 'text-rose-500', icon: UserX, bg: 'bg-rose-50 dark:bg-rose-500/10' },
          { label: 'Registrados', val: '15', color: 'text-blue-500', icon: UserCog, bg: 'bg-blue-50 dark:bg-blue-500/10' },
          { label: 'En Onboarding', val: '18', color: 'text-amber-500', icon: Rocket, bg: 'bg-amber-50 dark:bg-amber-500/10' },
          { label: 'Por vencer', val: '9', color: 'text-purple-500', icon: AlertTriangle, bg: 'bg-purple-50 dark:bg-purple-500/10' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300">
            <div className={`${item.bg} p-3 rounded-full mb-3`}>
              <item.icon size={20} className={item.color} />
            </div>
            <p className={`text-2xl font-black ${item.color}`}>{item.val}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 4. BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Búsqueda */}
          <div className="lg:col-span-6 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Buscar:</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por razón social, nombre comercial, RUC..." 
                className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
              />
            </div>
          </div>
          
          {/* Filtros */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-3">
            {['Plan', 'Acceso', 'Ciclo'].map((f) => (
              <div key={f} className="space-y-2">
                <select className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-black uppercase text-gray-500 dark:text-gray-300 appearance-none cursor-pointer">
                  <option value="">{f} ▼</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>
            ))}
          </div>

          {/* Limpiar */}
          <div className="lg:col-span-2">
            <button className="w-full flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all">
              <FilterX size={16} />
              Limpiar
            </button>
          </div>
        </div>

        {/* 5. TABLA DE CLIENTES */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-50 dark:border-gray-800">
                <th className="pb-4 pl-4">Cliente</th>
                <th className="pb-4">RUC</th>
                <th className="pb-4">Plan</th>
                <th className="pb-4">Suscripción</th>
                <th className="pb-4">Acceso</th>
                <th className="pb-4">Subdominio</th>
                <th className="pb-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              
              {/* Cliente 1 */}
              <tr className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all">
                <td className="py-6 pl-4">
                  <p className="font-black text-sm dark:text-white">AB COMERCIAL SAC</p>
                  <p className="text-[10px] text-gray-400 font-bold italic">ABC Tienda</p>
                  <p className="text-[10px] text-gray-400 font-bold italic">Alias: ABC</p>
                </td>
                <td className="py-6">
                  <div className="flex items-center gap-2 group/copy cursor-pointer">
                   <span className="text-xs font-bold dark:text-gray-400 underline decoration-blue-500/30">20123456789</span> 
                   <Copy size={12} className="text-gray-300 group-hover/copy:text-blue-500 transition-colors" />
                  </div>
                </td>
                
                <td className="py-6 font-black text-[10px] text-blue-600 uppercase">Pro</td>
                <td className="py-6">
                  <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-md text-[9px] font-black uppercase">Vigente</span>
                  <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase">Inicio: 15/03/2026</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Vence: 14/03/2027</p>
                </td>
                <td className="py-6 px-2">
                  <div className="flex items-center justify-start gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="font-black text-[10px] uppercase text-emerald-500">Activo</span>
                  </div>
                </td>
                <td className="py-6">
                  <div className="flex items-center gap-2 group/copy cursor-pointer">
                    <span className="text-xs font-bold dark:text-gray-400 underline decoration-blue-500/30">minegocio</span>
                    <Copy size={12} className="text-gray-300 group-hover/copy:text-blue-500 transition-colors" />
                  </div>
                </td>
                <td className="py-6">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => verDetalle({ nombre: 'AB COMERCIAL SAC', ruc: '20123456789', subdominio: 'minegocio' })} 
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 rounded-xl transition-all"
                    >
                      <Eye size={18}/>
                    </button>
                    <button className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-500 rounded-xl transition-all">
                      <Unlock size={18}/>
                    </button>
                    
                    {/* Menú de 3 puntos */}
                    <div className="relative">
                      <button 
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 rounded-xl transition-all"
                      >
                        <MoreHorizontal size={18}/>
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>

              {/* Cliente 2 (Bloqueado por pago) */}
              <tr className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all">
                <td className="py-6 pl-4">
                  <p className="font-black text-sm dark:text-white">INVERSIONES XYZ SAC</p>
                  <p className="text-[10px] text-gray-400 font-bold italic">ABC Tienda</p>
                  <p className="text-[10px] text-gray-400 font-bold italic">Alias: ABC</p>
                </td>
                <td className="py-6">
                  <div className="flex items-center gap-2 group/copy cursor-pointer">
                   <span className="text-xs font-bold dark:text-gray-400 underline decoration-blue-500/30">20123456789</span> 
                   <Copy size={12} className="text-gray-300 group-hover/copy:text-blue-500 transition-colors" />
                  </div>
                </td>
                <td className="py-6 font-black text-[10px] text-amber-600 uppercase">Emprendedor</td>
                <td className="py-6">
                  <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-md text-[9px] font-black uppercase">Por vencer</span>
                  <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase">Inicio: 22/05/2025</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Vence: 21/05/2026</p>
                </td>
                <td className="py-6 px-2">
                  <div className="flex items-center justify-start gap-1.5">
                    <Lock size={12} className="text-rose-500" />
                    <span className="font-black text-[10px] uppercase text-rose-500">Bloqueado pago</span>
                  </div>
                </td>
                <td className="py-6">
                  <div className="flex items-center gap-2 group/copy cursor-pointer">
                    <span className="text-xs font-bold dark:text-gray-400 underline decoration-blue-500/30">xyz</span>
                    <Copy size={12} className="text-gray-300 group-hover/copy:text-blue-500 transition-colors" />
                  </div>
                </td>
                <td className="py-6">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => verDetalle({ nombre: 'INVERSIONES XYZ SAC', ruc: '20123456789', subdominio: 'xyz' })} 
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 rounded-xl transition-all"
                    >
                      <Eye size={18}/>
                    </button>
                    <button className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-500 rounded-xl transition-all">
                      <Unlock size={18}/>
                    </button>
                    
                    {/* Menú de 3 puntos */}
                    <div className="relative">
                      <button 
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 rounded-xl transition-all"
                      >
                        <MoreHorizontal size={18}/>
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
      {isModalOpen && (
        <DetallesCliente 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          cliente={clienteSeleccionado} 
        />
      )}
    </>
  );
};

export default Clientes;
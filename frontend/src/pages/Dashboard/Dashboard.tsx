import React, { useEffect, useState } from 'react';
import { 
  UsersIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon, 
  BuildingOfficeIcon,
  EllipsisVerticalIcon,
  GlobeAltIcon,
  CalendarIcon,
  EnvelopeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Total Clientes', value: '156', icon: UsersIcon, change: '+12%', color: 'from-blue-600 to-indigo-600', shadow: 'shadow-blue-500/20' },
    { name: 'Comprobantes', value: '2,543', icon: DocumentTextIcon, change: '+8%', color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20' },
    { name: 'Ventas Mensuales', value: 'S/ 45,231', icon: CurrencyDollarIcon, change: '+23%', color: 'from-purple-600 to-pink-600', shadow: 'shadow-purple-500/20' },
    { name: 'Planes Activos', value: '8', icon: BuildingOfficeIcon, change: '+2', color: 'from-orange-500 to-amber-600', shadow: 'shadow-orange-500/20' },
  ];

  const comprobantesMensuales = [
    { mes: 'Ene', comprobantes: 320 }, { mes: 'Feb', comprobantes: 450 },
    { mes: 'Mar', comprobantes: 380 }, { mes: 'Abr', comprobantes: 520 },
    { mes: 'May', comprobantes: 610 }, { mes: 'Jun', comprobantes: 580 },
    { mes: 'Jul', comprobantes: 690 }, { mes: 'Ago', comprobantes: 720 },
    { mes: 'Sep', comprobantes: 680 }, { mes: 'Oct', comprobantes: 750 },
    { mes: 'Nov', comprobantes: 820 }, { mes: 'Dic', comprobantes: 890 },
  ];

  const clientesData = [
    { id: 1, nombre: 'Empresa A', ruc: '20123456789', plan: 'Ilimitado', correo: 'contacto@empresaa.com', entorno: 'Producción', comprobantes: 342, usuarios: 5, establecimientos: 2, ventasMes: 15420, fechaCreacion: '2024-01-15' },
    { id: 2, nombre: 'Empresa B', ruc: '20987654321', plan: 'Premium', correo: 'info@empresab.com', entorno: 'Testing', comprobantes: 89, usuarios: 2, establecimientos: 1, ventasMes: 5420, fechaCreacion: '2024-02-20' },
    { id: 3, nombre: 'Empresa C', ruc: '20555555555', plan: 'Básico', correo: 'ventas@empresac.com', entorno: 'Producción', comprobantes: 156, usuarios: 3, establecimientos: 1, ventasMes: 8930, fechaCreacion: '2024-03-10' },
  ];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Evaluar al cargar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 lg:space-y-10 bg-gray-50/50 dark:bg-[#0f1115] min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Dashboard General
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium mt-1">
            Monitoreo de clientes y facturación
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-xl">
            <div className="flex justify-between items-start">
              <div className={`p-2.5 sm:p-3 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl shadow-lg ${stat.shadow}`}>
                <stat.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <div className="mt-4 sm:mt-6">
              <p className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest">{stat.name}</p>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* GRÁFICO */}
      <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-4 sm:p-6 lg:p-8">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight mb-4 sm:mb-6 lg:mb-8">
          Comprobantes por Mes
        </h2>
        <div className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={comprobantesMensuales}>
              <defs>
                <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="mes" 
                axisLine={false} 
                tickLine={false} 
                tick={{
                  fill: '#94a3b8', 
                  fontSize: isMobile ? 10 : 12 // Aquí aplicas la lógica que querías con 'sm'
                }} 
                dy={8} 
                interval={isMobile ? 1 : 0}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px sm:15px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  fontSize: '12px'
                }} 
              />
              <Area type="monotone" dataKey="comprobantes" stroke="#3b82f6" strokeWidth={2.5} fill="url(#colorComp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLA COMPLETA - VERSIÓN RESPONSIVE CON CARD EN MÓVIL */}
      <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
            Listado Maestro de Clientes
          </h2>
        </div>
        
        {/* Versión Desktop: Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">Identificación / Host</th>
                <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">Contacto / Plan</th>
                <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Configuración</th>
                <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">Actividad Comercial</th>
                <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">Registro</th>
                <th className="px-4 lg:px-6 py-4 lg:py-5 text-right text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">Acciones</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {clientesData.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors group">
                  <td className="px-4 lg:px-6 py-4 lg:py-6">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="p-1.5 lg:p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg lg:rounded-xl">
                        <GlobeAltIcon className="w-4 lg:w-5 h-4 lg:h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs lg:text-sm font-black text-gray-900 dark:text-white uppercase">{cliente.nombre}</div>
                        <div className="text-[9px] lg:text-[11px] font-bold text-blue-500 underline decoration-blue-500/30">
                          {cliente.nombre.toLowerCase().replace(/ /g, '')}.dominio.test
                        </div>
                        <div className="text-[8px] lg:text-[10px] text-gray-400 font-bold tracking-widest mt-0.5">RUC: {cliente.ruc}</div>
                      </div>
                    </div>
                   </td>
                  <td className="px-4 lg:px-6 py-4 lg:py-6">
                    <div className="space-y-1 lg:space-y-1.5">
                      <div className="flex items-center gap-1.5 lg:gap-2 text-[10px] lg:text-xs font-bold text-gray-600 dark:text-gray-300">
                        <EnvelopeIcon className="w-3 lg:w-3.5 h-3 lg:h-3.5 text-gray-400" />
                        <span className="truncate max-w-[150px] lg:max-w-none">{cliente.correo}</span>
                      </div>
                      <span className="inline-block px-1.5 lg:px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md text-[8px] lg:text-[10px] font-black uppercase border border-purple-100 dark:border-purple-800">
                        {cliente.plan}
                      </span>
                    </div>
                   </td>
                  <td className="px-4 lg:px-6 py-4 lg:py-6 text-center">
                    <div className="flex flex-col items-center gap-1.5 lg:gap-2">
                      <span className={`px-1.5 lg:px-2 py-0.5 rounded-full text-[7px] lg:text-[9px] font-black uppercase tracking-tighter border ${
                        cliente.entorno === 'Producción' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {cliente.entorno}
                      </span>
                      <div className="flex gap-1.5 lg:gap-2">
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] lg:text-[10px] font-black text-gray-900 dark:text-white">{cliente.usuarios}</span>
                          <span className="text-[6px] lg:text-[8px] font-bold text-gray-400 uppercase">Users</span>
                        </div>
                        <div className="w-[1px] h-3 lg:h-4 bg-gray-200 dark:bg-gray-700 self-center" />
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] lg:text-[10px] font-black text-gray-900 dark:text-white">{cliente.establecimientos}</span>
                          <span className="text-[6px] lg:text-[8px] font-bold text-gray-400 uppercase">Estab.</span>
                        </div>
                      </div>
                    </div>
                   </td>
                  <td className="px-4 lg:px-6 py-4 lg:py-6">
                    <div className="space-y-0.5 lg:space-y-1">
                      <div className="text-xs lg:text-sm font-black text-gray-900 dark:text-white flex items-center gap-1">
                        <span className="text-emerald-500 text-[10px] lg:text-base">S/</span> 
                        <span className="text-sm lg:text-base">{cliente.ventasMes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-1.5 text-[8px] lg:text-[10px] font-bold text-gray-400 uppercase">
                        <BriefcaseIcon className="w-2.5 lg:w-3 h-2.5 lg:h-3" />
                        {cliente.comprobantes} Doc. Emitidos
                      </div>
                    </div>
                   </td>
                  <td className="px-4 lg:px-6 py-4 lg:py-6">
                    <div className="flex items-center gap-1.5 lg:gap-2 text-[10px] lg:text-xs font-bold text-gray-500">
                      <CalendarIcon className="w-3 lg:w-4 h-3 lg:h-4 text-gray-400" />
                      {cliente.fechaCreacion}
                    </div>
                   </td>
                  <td className="px-4 lg:px-6 py-4 lg:py-6 text-right">
                    <button className="p-1.5 lg:p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg lg:rounded-xl transition-all shadow-sm">
                      <EllipsisVerticalIcon className="w-4 lg:w-5 h-4 lg:h-5 text-gray-400 group-hover:text-blue-500" />
                    </button>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>

        {/* Versión Móvil: Cards */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {clientesData.map((cliente) => (
            <div key={cliente.id} className="p-4 space-y-3 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
              {/* Header con nombre y acciones */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <GlobeAltIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900 dark:text-white uppercase">{cliente.nombre}</div>
                    <div className="text-[9px] font-bold text-blue-500 underline decoration-blue-500/30">
                      {cliente.nombre.toLowerCase().replace(/ /g, '')}.dominio.test
                    </div>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                  <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* RUC */}
              <div className="text-[10px] text-gray-400 font-bold tracking-widest">
                RUC: {cliente.ruc}
              </div>

              {/* Contacto y Plan */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-300">
                  <EnvelopeIcon className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs">{cliente.correo}</span>
                </div>
                <span className="inline-block px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md text-[9px] font-black uppercase border border-purple-100 dark:border-purple-800">
                  {cliente.plan}
                </span>
              </div>

              {/* Entorno y métricas */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter border ${
                    cliente.entorno === 'Producción' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {cliente.entorno}
                  </span>
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black text-gray-900 dark:text-white">{cliente.usuarios}</span>
                      <span className="text-[7px] font-bold text-gray-400 uppercase">Users</span>
                    </div>
                    <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-700 self-center" />
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black text-gray-900 dark:text-white">{cliente.establecimientos}</span>
                      <span className="text-[7px] font-bold text-gray-400 uppercase">Estab.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ventas y Comprobantes */}
              <div className="flex justify-between items-center pt-1 border-t border-gray-100 dark:border-gray-800 mt-1">
                <div className="space-y-0.5">
                  <div className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-1">
                    <span className="text-emerald-500 text-xs">S/</span> 
                    <span>{cliente.ventasMes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-bold text-gray-400 uppercase">
                    <BriefcaseIcon className="w-2.5 h-2.5" />
                    {cliente.comprobantes} Documentos Emitidos
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                  <CalendarIcon className="w-3 h-3 text-gray-400" />
                  {cliente.fechaCreacion}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
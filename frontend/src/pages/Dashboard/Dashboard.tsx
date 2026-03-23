import React from 'react';
import { 
  UsersIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon, 
  BuildingOfficeIcon,
  ArrowUpIcon,
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

  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-10 bg-gray-50/50 dark:bg-[#0f1115] min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Dashboard General</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Monitoreo de clientes y facturación</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-[#161b22] rounded-[2rem] p-7 border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-xl">
            <div className="flex justify-between items-start">
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg ${stat.shadow}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-[11px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{stat.name}</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* GRÁFICO */}
      <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-8">Comprobantes por Mes</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={comprobantesMensuales}>
              <defs>
                <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="comprobantes" stroke="#3b82f6" strokeWidth={3} fill="url(#colorComp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLA COMPLETA (SIN PERDER DATA) */}
      <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50">
          <h2 className="text-xl font-black text-gray-900 dark:text-white">Listado Maestro de Clientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Identificación / Host</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Contacto / Plan</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Configuración</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Actividad Comercial</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Registro</th>
                <th className="px-6 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {clientesData.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors group">
                  {/* Columna 1: Nombre, Hostname y RUC */}
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <GlobeAltIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-gray-900 dark:text-white uppercase">{cliente.nombre}</div>
                        <div className="text-[11px] font-bold text-blue-500 underline decoration-blue-500/30">
                          {cliente.nombre.toLowerCase().replace(/ /g, '')}.dominio.test
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold tracking-widest mt-0.5">RUC: {cliente.ruc}</div>
                      </div>
                    </div>
                  </td>

                  {/* Columna 2: Correo y Plan */}
                  <td className="px-6 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
                        <EnvelopeIcon className="w-3.5 h-3.5 text-gray-400" />
                        {cliente.correo}
                      </div>
                      <span className="inline-block px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md text-[10px] font-black uppercase border border-purple-100 dark:border-purple-800">
                        {cliente.plan}
                      </span>
                    </div>
                  </td>

                  {/* Columna 3: Entorno, Usuarios y Establecimientos */}
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                        cliente.entorno === 'Producción' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {cliente.entorno}
                      </span>
                      <div className="flex gap-2">
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-black text-gray-900 dark:text-white">{cliente.usuarios}</span>
                          <span className="text-[8px] font-bold text-gray-400 uppercase">Users</span>
                        </div>
                        <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-700 self-center" />
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-black text-gray-900 dark:text-white">{cliente.establecimientos}</span>
                          <span className="text-[8px] font-bold text-gray-400 uppercase">Estab.</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Columna 4: Ventas y Comprobantes */}
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      <div className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-1">
                        <span className="text-emerald-500">S/</span> {cliente.ventasMes.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                        <BriefcaseIcon className="w-3 h-3" />
                        {cliente.comprobantes} Doc. Emitidos
                      </div>
                    </div>
                  </td>

                  {/* Columna 5: Fecha de Creación */}
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      {cliente.fechaCreacion}
                    </div>
                  </td>

                  {/* Columna 6: Acciones */}
                  <td className="px-6 py-6 text-right">
                    <button className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all shadow-sm">
                      <EllipsisVerticalIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                    </button>
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

export default Dashboard;
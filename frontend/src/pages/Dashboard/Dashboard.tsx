import React from 'react';
import { UsersIcon, DocumentTextIcon, CurrencyDollarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  // Datos de ejemplo
  const stats = [
    { name: 'Total Clientes', value: '156', icon: UsersIcon, change: '+12%', color: 'from-blue-500 to-blue-600' },
    { name: 'Comprobantes', value: '2,543', icon: DocumentTextIcon, change: '+8%', color: 'from-green-500 to-green-600' },
    { name: 'Ventas Mensuales', value: 'S/ 45,231', icon: CurrencyDollarIcon, change: '+23%', color: 'from-purple-500 to-purple-600' },
    { name: 'Planes Activos', value: '8', icon: BuildingOfficeIcon, change: '+2', color: 'from-orange-500 to-orange-600' },
  ];

  const comprobantesMensuales = [
    { mes: 'Ene', comprobantes: 320 },
    { mes: 'Feb', comprobantes: 450 },
    { mes: 'Mar', comprobantes: 380 },
    { mes: 'Abr', comprobantes: 520 },
    { mes: 'May', comprobantes: 610 },
    { mes: 'Jun', comprobantes: 580 },
    { mes: 'Jul', comprobantes: 690 },
    { mes: 'Ago', comprobantes: 720 },
    { mes: 'Sep', comprobantes: 680 },
    { mes: 'Oct', comprobantes: 750 },
    { mes: 'Nov', comprobantes: 820 },
    { mes: 'Dic', comprobantes: 890 },
  ];

  const clientesData = [
    { id: 1, nombre: 'Empresa A', ruc: '20123456789', plan: 'Ilimitado', correo: 'contacto@empresaa.com', entorno: 'Producción', comprobantes: 342, usuarios: 5, establecimientos: 2, ventasMes: 15420, fechaCreacion: '2024-01-15' },
    { id: 2, nombre: 'Empresa B', ruc: '20987654321', plan: 'Premium', correo: 'info@empresab.com', entorno: 'Testing', comprobantes: 89, usuarios: 2, establecimientos: 1, ventasMes: 5420, fechaCreacion: '2024-02-20' },
    { id: 3, nombre: 'Empresa C', ruc: '20555555555', plan: 'Básico', correo: 'ventas@empresac.com', entorno: 'Producción', comprobantes: 156, usuarios: 3, establecimientos: 1, ventasMes: 8930, fechaCreacion: '2024-03-10' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Resumen general del sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                <p className="text-xs text-green-600 mt-2">{stat.change} vs mes anterior</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comprobantes por Mes</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={comprobantesMensuales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: '#374151' }}
              />
              <Line type="monotone" dataKey="comprobantes" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de Clientes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Listado de Clientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {['Hostname', 'Nombre', 'RUC', 'Plan', 'Correo', 'Entorno', 'Total Comprobantes', 'Usuarios', 'Establecimientos', 'Ventas (Mes)', 'F.Creación', 'Acciones'].map((header) => (
                  <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {clientesData.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{cliente.nombre.toLowerCase().replace(/ /g, '')}.dominio.test</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{cliente.nombre}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{cliente.ruc}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                      {cliente.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{cliente.correo}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${cliente.entorno === 'Producción' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                      {cliente.entorno}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{cliente.comprobantes}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{cliente.usuarios}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{cliente.establecimientos}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">S/ {cliente.ventasMes.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{cliente.fechaCreacion}</td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      ⋮
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
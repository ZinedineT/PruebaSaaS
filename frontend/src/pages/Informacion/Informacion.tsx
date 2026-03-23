import React, { useState, useEffect } from 'react';
import {
  ServerIcon,
  CpuChipIcon,
  CommandLineIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Datos de ejemplo para las gráficas
const cpuStats = [
  { time: '10:50', usage: 15, label: '10:50' },
  { time: '10:51', usage: 42, label: '10:51' },
  { time: '10:52', usage: 30, label: '10:52' },
  { time: '10:53', usage: 28, label: '10:53' },
  { time: '10:54', usage: 45, label: '10:54' },
  { time: '10:55', usage: 38, label: '10:55' },
  { time: '10:56', usage: 52, label: '10:56' },
  { time: '10:57', usage: 48, label: '10:57' },
  { time: '10:58', usage: 35, label: '10:58' },
  { time: '10:59', usage: 41, label: '10:59' },
  { time: '11:00', usage: 44, label: '11:00' },
];

const ramStats = [
  { time: '10:50', used_gb: 1.2, total_gb: 8, label: '10:50' },
  { time: '10:51', used_gb: 1.5, total_gb: 8, label: '10:51' },
  { time: '10:52', used_gb: 1.4, total_gb: 8, label: '10:52' },
  { time: '10:53', used_gb: 1.6, total_gb: 8, label: '10:53' },
  { time: '10:54', used_gb: 1.8, total_gb: 8, label: '10:54' },
  { time: '10:55', used_gb: 1.7, total_gb: 8, label: '10:55' },
  { time: '10:56', used_gb: 1.9, total_gb: 8, label: '10:56' },
  { time: '10:57', used_gb: 2.0, total_gb: 8, label: '10:57' },
  { time: '10:58', used_gb: 1.8, total_gb: 8, label: '10:58' },
  { time: '10:59', used_gb: 1.6, total_gb: 8, label: '10:59' },
  { time: '11:00', used_gb: 1.7, total_gb: 8, label: '11:00' },
];

// Datos de configuración PHP
const phpConfig = [
  { indicador: 'Memoria en bytes', valor: '134.217.728,00', estado: 'info', descripcion: 'Memoria límite por script' },
  { indicador: 'Memoria en el archivo', valor: '128M', estado: 'info', descripcion: 'Memoria configurada en PHP.ini' },
  { indicador: 'pcre.backtrack_limit', valor: '1.000.000', estado: 'success', descripcion: 'Límite de backtracking para expresiones regulares' },
  { indicador: 'max_execution_time', valor: '30', estado: 'warning', descripcion: 'Tiempo máximo de ejecución (segundos)' },
  { indicador: 'max_input_time', valor: '-1', estado: 'warning', descripcion: 'Tiempo máximo para procesar inputs (-1 = ilimitado)' },
  { indicador: 'post_max_size', valor: '8M', estado: 'warning', descripcion: 'Tamaño máximo de datos POST' },
  { indicador: 'upload_max_filesize', valor: '2M', estado: 'warning', descripcion: 'Tamaño máximo de archivos subidos' },
  { indicador: 'request_terminate_timeout', valor: 'false', estado: 'info', descripcion: 'Timeout para finalizar request' },
  { indicador: 'date_timezone', valor: 'UTC', estado: 'success', descripcion: 'Zona horaria configurada' },
  { indicador: 'version_laravel', valor: '10.48.29', estado: 'success', descripcion: 'Versión de Laravel instalada' },
];

// Datos del servidor
const serverInfo = {
  php_version: '8.3.29',
  server_software: 'Nginx/1.24.0',
  operating_system: 'Linux (Docker)',
  server_name: 'proyecto_nginx',
  server_ip: '172.18.0.3',
  document_root: '/var/www/backend/public',
  loaded_extensions: 'pdo_mysql, mbstring, exif, pcntl, bcmath, gd, zip, curl, json',
};

// Estadísticas de uso
const usageStats = {
  cpu_avg: 38,
  cpu_max: 52,
  ram_used: 1.7,
  ram_total: 8,
  ram_percent: 21.25,
  disk_used: 4.2,
  disk_total: 20,
  disk_percent: 21,
};

const Informacion: React.FC = () => {
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());
  const [selectedTab, setSelectedTab] = useState<'php' | 'server' | 'extensions'>('php');

  // Simular actualización de datos
  const handleRefresh = () => {
    setLastUpdate(new Date().toLocaleTimeString());
    // Aquí se podría hacer una llamada a la API para obtener datos reales
  };

  // Obtener color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  // Obtener icono del estado
  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'success':
        return <CheckCircleIcon className="w-4 h-4" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'error':
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return <InformationCircleIcon className="w-4 h-4" />;
    }
  };

  // Datos para el gráfico de uso de RAM
  const ramPieData = [
    { name: 'Usado', value: usageStats.ram_used, color: '#3b82f6' },
    { name: 'Libre', value: usageStats.ram_total - usageStats.ram_used, color: '#e5e7eb' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Información del Sistema</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Estado y configuración del servidor
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Última actualización: {lastUpdate}
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Actualizar"
          >
            <ArrowPathIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">CPU (Promedio)</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{usageStats.cpu_avg}%</p>
              <p className="text-xs text-gray-500 mt-1">Máx: {usageStats.cpu_max}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <CpuChipIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">RAM</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {usageStats.ram_used} / {usageStats.ram_total} GB
              </p>
              <p className="text-xs text-gray-500 mt-1">{usageStats.ram_percent}% usado</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <ServerIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Disco</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {usageStats.disk_used} / {usageStats.disk_total} GB
              </p>
              <p className="text-xs text-gray-500 mt-1">{usageStats.disk_percent}% usado</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">PHP</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">v{serverInfo.php_version}</p>
              <p className="text-xs text-gray-500 mt-1">Laravel {phpConfig.find(c => c.indicador === 'version_laravel')?.valor}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <CommandLineIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfica de CPU */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Uso de CPU</h2>
            <CpuChipIcon className="w-5 h-5 text-gray-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuStats}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="label" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${value}%`, 'Uso CPU']}
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#cpuGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica de RAM */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Uso de RAM</h2>
            <ServerIcon className="w-5 h-5 text-gray-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ramStats}>
                <defs>
                  <linearGradient id="ramGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="label" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" unit=" GB" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${value} GB`, 'RAM Usada']}                
                  />
                <Area
                  type="monotone"
                  dataKey="used_gb"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#ramGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pestañas de configuración */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setSelectedTab('php')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                selectedTab === 'php'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Configuración PHP
            </button>
            <button
              onClick={() => setSelectedTab('server')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                selectedTab === 'server'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Información Servidor
            </button>
            <button
              onClick={() => setSelectedTab('extensions')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                selectedTab === 'extensions'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Extensiones PHP
            </button>
          </div>
        </div>

        <div className="p-6">
          {selectedTab === 'php' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Indicador</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Valor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Descripción</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {phpConfig.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.indicador}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">{item.valor}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.descripcion}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getEstadoColor(item.estado)}`}>
                          {getEstadoIcon(item.estado)}
                          {item.estado === 'success' ? 'Óptimo' : item.estado === 'warning' ? 'Revisar' : 'Info'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === 'server' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Información General</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Sistema Operativo</span>
                      <span className="font-medium text-gray-900 dark:text-white">{serverInfo.operating_system}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Servidor Web</span>
                      <span className="font-medium text-gray-900 dark:text-white">{serverInfo.server_software}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">PHP Version</span>
                      <span className="font-medium text-gray-900 dark:text-white">{serverInfo.php_version}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Nombre Servidor</span>
                      <span className="font-medium text-gray-900 dark:text-white">{serverInfo.server_name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">IP Servidor</span>
                      <span className="font-medium text-gray-900 dark:text-white">{serverInfo.server_ip}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Document Root</span>
                      <span className="font-medium text-gray-900 dark:text-white font-mono text-sm">{serverInfo.document_root}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Estadísticas de Uso</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Uso de RAM</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{usageStats.ram_percent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${usageStats.ram_percent}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Uso de Disco</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{usageStats.disk_percent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-600 rounded-full h-2"
                          style={{ width: `${usageStats.disk_percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Tiempo de actividad</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">12 días, 8 horas, 32 minutos</p>
                    <p className="text-xs text-gray-500 mt-1">Último reinicio: 11/03/2024 03:45:00</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'extensions' && (
            <div>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Extensiones de PHP Cargadas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {serverInfo.loaded_extensions.split(', ').map((ext, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">{ext}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Total de extensiones cargadas: <strong>{serverInfo.loaded_extensions.split(', ').length}</strong>
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Estas extensiones son esenciales para el funcionamiento de Laravel y la aplicación.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer con información adicional */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Información recopilada desde el servidor en tiempo real • Datos actualizados cada 30 segundos
        </p>
      </div>
    </div>
  );
};

export default Informacion;
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
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// --- DATOS (Mantenidos igual que tu original) ---
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

const serverInfo = {
  php_version: '8.3.29',
  server_software: 'Nginx/1.24.0',
  operating_system: 'Linux (Docker)',
  server_name: 'proyecto_nginx',
  server_ip: '172.18.0.3',
  document_root: '/var/www/backend/public',
  loaded_extensions: 'pdo_mysql, mbstring, exif, pcntl, bcmath, gd, zip, curl, json',
};

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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdate(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 800);
  };

  const getEstadoStyles = (estado: string) => {
    switch (estado) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      case 'error':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20';
      default:
        return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'success': return <CheckCircleIcon className="w-3.5 h-3.5" />;
      case 'warning': return <ExclamationTriangleIcon className="w-3.5 h-3.5" />;
      case 'error': return <XCircleIcon className="w-3.5 h-3.5" />;
      default: return <InformationCircleIcon className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none">
            <ServerIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Panel de Control del Sistema
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Monitoreo de recursos y entorno en tiempo real</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="px-3">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Último Sync</p>
            <p className="text-sm font-mono font-medium text-gray-700 dark:text-gray-300">{lastUpdate}</p>
          </div>
          <button
            onClick={handleRefresh}
            className={`p-2.5 rounded-lg transition-all ${isRefreshing ? 'bg-blue-100 text-blue-600 animate-spin' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500'}`}
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- METRIC CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'CPU Promedio', val: `${usageStats.cpu_avg}%`, sub: `Pico: ${usageStats.cpu_max}%`, icon: CpuChipIcon, color: 'blue' },
          { label: 'Memoria RAM', val: `${usageStats.ram_used} GB`, sub: `${usageStats.ram_percent}% en uso`, icon: CircleStackIcon, color: 'emerald' },
          { label: 'Almacenamiento', val: `${usageStats.disk_used} GB`, sub: `${usageStats.disk_percent}% ocupado`, icon: DocumentTextIcon, color: 'purple' },
          { label: 'Entorno PHP', val: `v${serverInfo.php_version}`, sub: `Laravel v${phpConfig.find(c => c.indicador === 'version_laravel')?.valor}`, icon: CommandLineIcon, color: 'orange' },
        ].map((card, i) => (
          <div key={i} className="group bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{card.val}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full bg-${card.color}-500`}></span>
                  {card.sub}
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-${card.color}-50 dark:bg-${card.color}-500/10`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <CpuChipIcon className="w-4 h-4 text-blue-500" /> Rendimiento de CPU (%)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuStats}>
                <defs>
                  <linearGradient id="cpuColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} unit="%" />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                />
                <Area type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#cpuColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RAM Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <CircleStackIcon className="w-4 h-4 text-emerald-500" /> Consumo de RAM (GB)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ramStats}>
                <defs>
                  <linearGradient id="ramColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} unit="G" />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                />
                <Area type="monotone" dataKey="used_gb" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#ramColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- TABS SECTION --- */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50/50 dark:bg-gray-900/50 px-6 pt-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex gap-8">
            {['php', 'server', 'extensions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab as any)}
                className={`pb-4 text-sm font-bold transition-all relative ${
                  selectedTab === tab 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'php' && 'Configuración PHP'}
                {tab === 'server' && 'Información Servidor'}
                {tab === 'extensions' && 'Extensiones Cargadas'}
                {selectedTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {selectedTab === 'php' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                    <th className="px-4 py-3">Variable</th>
                    <th className="px-4 py-3">Valor Actual</th>
                    <th className="px-4 py-3">Descripción</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                  {phpConfig.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-gray-700 dark:text-gray-200 font-mono">{item.indicador}</td>
                      <td className="px-4 py-4 text-sm text-blue-600 dark:text-blue-400 font-mono bg-blue-50/30 dark:bg-blue-500/5">{item.valor}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{item.descripcion}</td>
                      <td className="px-4 py-4">
                        <div className={`mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold w-fit ${getEstadoStyles(item.estado)}`}>
                          {getEstadoIcon(item.estado)}
                          {item.estado.toUpperCase()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === 'server' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  <InformationCircleIcon className="w-5 h-5 text-blue-500" />
                  Software del Entorno
                </h4>
                <div className="space-y-1">
                  {[
                    { label: 'S.O.', val: serverInfo.operating_system },
                    { label: 'Servidor', val: serverInfo.server_software },
                    { label: 'IP Local', val: serverInfo.server_ip },
                    { label: 'Ruta Base', val: serverInfo.document_root },
                  ].map((info, i) => (
                    <div key={i} className="flex justify-between py-3 border-b border-gray-50 dark:border-gray-700">
                      <span className="text-sm text-gray-500">{info.label}</span>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-200 font-mono">{info.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
                  Estado de Salud
                </h4>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold text-gray-500 uppercase">Uso de Memoria</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{usageStats.ram_percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${usageStats.ram_percent}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold text-gray-500 uppercase">Uso de Disco</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{usageStats.disk_percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${usageStats.disk_percent}%` }} />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Uptime del Servidor</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">12d 08h 32m</p>
                    <p className="text-[11px] text-gray-500 mt-1 italic">Desde: 11/03/2024 03:45:00</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'extensions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 italic">Total: {serverInfo.loaded_extensions.split(', ').length} extensiones críticas cargadas.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {serverInfo.loaded_extensions.split(', ').map((ext, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700 group hover:border-emerald-200 transition-colors">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 font-mono">{ext}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="flex items-center justify-center gap-2 py-4 border-t border-gray-100 dark:border-gray-700">
        <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest">
          Sistema de Monitoreo en Vivo • Datos actualizados cada 30 seg
        </p>
      </footer>
    </div>
  );
};

export default Informacion;
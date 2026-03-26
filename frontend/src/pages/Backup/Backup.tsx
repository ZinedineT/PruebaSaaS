import React, { useState } from 'react';
import {
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  ServerIcon,
  CircleStackIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  FolderOpenIcon,
  EyeIcon,
  EyeSlashIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';
import { CloudDownloadIcon } from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

// --- Interfaces y Datos (Se mantienen igual) ---
interface BackupLog {
  id: number; fecha: string; tipo: 'total' | 'database' | 'files';
  estado: 'success' | 'error' | 'in_progress'; tamaño: string;
  nombre: string; error?: string;
}
interface BackupConfig { tipo: 'total' | 'database' | 'files'; incluirBaseDatos: boolean; incluirArchivos: boolean; carpetaEspecifica?: string; }
interface FtpConfig { servidor: string; puerto: number; usuario: string; password: string; rutaDestino: string; }

const diskSpaceData = [
  { fecha: '01/03', usado: 4.2 }, { fecha: '05/03', usado: 4.4 },
  { fecha: '10/03', usado: 4.5 }, { fecha: '15/03', usado: 4.7 },
  { fecha: '20/03', usado: 4.9 }, { fecha: '23/03', usado: 5.1 },
];

const historialLogsOriginal: BackupLog[] = [
  { id: 1, fecha: '2024-03-23 10:30:00', tipo: 'total', estado: 'success', tamaño: '2.3 GB', nombre: 'backup_total_20240323_103000.zip' },
  { id: 2, fecha: '2024-03-22 15:45:00', tipo: 'database', estado: 'success', tamaño: '156 MB', nombre: 'backup_db_20240322_154500.sql' },
  { id: 3, fecha: '2024-03-21 09:15:00', tipo: 'files', estado: 'error', tamaño: '0 B', nombre: 'backup_files_20240321_091500.zip', error: 'Error de permisos en carpeta /var/www/backend/storage' },
];

const Backup: React.FC = () => {
  // --- Estados ---
  const [historial, setHistorial] = useState<BackupLog[]>(historialLogsOriginal);
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTipo, setSelectedTipo] = useState<BackupConfig['tipo']>('total');
  const [carpetaEspecifica, setCarpetaEspecifica] = useState('/var/www/backend/storage');
  const [showFtpModal, setShowFtpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ftpConfig, setFtpConfig] = useState<FtpConfig>({ servidor: '', puerto: 21, usuario: '', password: '', rutaDestino: '/backups/' });
  const [ultimoBackup, setUltimoBackup] = useState<BackupLog | null>(historial[0]);
  const [espacioLibre] = useState(14.9);
  const [espacioTotal] = useState(20);

  // --- Lógica ---
  const handleIniciarBackup = () => {
    setBackupInProgress(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBackupInProgress(false);
          const nuevo: BackupLog = {
            id: Date.now(), fecha: new Date().toLocaleString(), tipo: selectedTipo,
            estado: 'success', tamaño: selectedTipo === 'database' ? '158 MB' : '2.4 GB',
            nombre: `backup_${selectedTipo}_${Date.now()}.zip`
          };
          setHistorial([nuevo, ...historial]);
          setUltimoBackup(nuevo);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  const getComandosRestauracion = () => {
    const file = ultimoBackup?.nombre || 'backup.zip';
    return {
      mysql: `mysql -h mysql -u user -p db < /backups/${file}`,
      docker: `docker exec -i proyecto_db mysql -u user -ppass db < ${file}`,
      files: `unzip ${file} -d /var/www/backend/`
    };
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 bg-gray-50/50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2 sm:gap-3">
            <CloudDownloadIcon className="text-blue-500" size={24}/>
            Gestión de Respaldos
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium mt-1 flex items-center gap-1.5 sm:gap-2">
            Infraestructura de recuperación de desastres activa
          </p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Disco */}
        <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl sm:rounded-2xl">
              <CircleStackIcon className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">Almacenamiento</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{espacioLibre} GB <span className="text-xs sm:text-sm font-medium text-gray-400">Libres</span></h3>
          <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 sm:h-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${((espacioTotal - espacioLibre) / espacioTotal) * 100}%` }}
              />
            </div>
            <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">Capacidad Total: {espacioTotal} GB</p>
          </div>
        </div>

        {/* Último Backup */}
        <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl sm:rounded-2xl">
              <CheckCircleIcon className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-600" />
            </div>
            <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[8px] sm:text-[9px] font-black uppercase ${
              ultimoBackup?.estado === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {ultimoBackup?.estado}
            </span>
          </div>
          <h3 className="text-sm sm:text-lg font-black text-gray-900 dark:text-white truncate">{ultimoBackup?.fecha || 'Sin registros'}</h3>
          <p className="text-[10px] sm:text-xs font-bold text-gray-400 mt-0.5 sm:mt-1 uppercase tracking-tighter italic truncate">{ultimoBackup?.nombre}</p>
        </div>

        {/* Info Archivos */}
        <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl sm:rounded-2xl">
              <FolderOpenIcon className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">Data Node</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">2.1 GB</h3>
          <p className="text-[9px] sm:text-xs font-bold text-gray-500 mt-1.5 sm:mt-2 uppercase">Incluye: PDFs, SQL y Logs de sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* CONTROL DE BACKUP */}
        <div className="lg:col-span-1 space-y-6 sm:space-y-8">
          <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-5 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6">Nuevo Respaldo</h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {['total', 'database', 'files'].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setSelectedTipo(tipo as any)}
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all ${
                      selectedTipo === tipo 
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10' 
                      : 'border-transparent bg-gray-50 dark:bg-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-gray-700 dark:text-gray-200">
                      {tipo === 'total' ? 'Full System' : tipo === 'database' ? 'Database Only' : 'Files Only'}
                    </span>
                    {selectedTipo === tipo && <CheckCircleIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />}
                  </button>
                ))}
              </div>

              {selectedTipo === 'files' && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase ml-1 sm:ml-2 mb-1 sm:mb-2 block">Ruta Específica</label>
                  <input
                    type="text"
                    value={carpetaEspecifica}
                    onChange={(e) => setCarpetaEspecifica(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-xs sm:text-sm font-mono text-blue-500"
                  />
                </div>
              )}

              <button
                onClick={handleIniciarBackup}
                disabled={backupInProgress}
                className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[11px] sm:text-sm transition-all flex items-center justify-center gap-2 sm:gap-3 ${
                  backupInProgress 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' 
                  : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] shadow-xl'
                }`}
              >
                {backupInProgress ? (
                  <ClockIcon className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                ) : (
                  <PlayIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                )}
                {backupInProgress ? `Procesando ${progress}%` : 'Ejecutar Ahora'}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-6 lg:p-8 text-white shadow-lg relative overflow-hidden">
            <CloudArrowUpIcon className="absolute -right-4 -bottom-4 w-24 sm:w-32 h-24 sm:h-32 opacity-10" />
            <h3 className="text-base sm:text-lg font-black mb-1.5 sm:mb-2">Envío Remoto</h3>
            <p className="text-[10px] sm:text-xs text-indigo-100 mb-4 sm:mb-6">Asegura tus datos fuera de este servidor enviándolos vía FTP/SFTP.</p>
            <button 
              onClick={() => setShowFtpModal(true)}
              className="w-full py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all"
            >
              Configurar Destino
            </button>
          </div>
        </div>

        {/* GRAFICA Y COMANDOS */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Gráfico de Espacio */}
          <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-5 sm:p-6 lg:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Crecimiento de Almacenamiento</h2>
              <ServerIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
            </div>
            <div className="h-48 sm:h-56 lg:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={diskSpaceData}>
                  <defs>
                    <linearGradient id="colorDisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.5} />
                  <XAxis 
                    dataKey="fecha" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 700}} 
                    interval={window.innerWidth < 640 ? 1 : 0}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px sm:16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="usado" stroke="#3b82f6" strokeWidth={2.5} fill="url(#colorDisk)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Restauración (Terminal Style) */}
          <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-5 sm:p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <CommandLineIcon className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Consola de Restauración</h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {[
                { label: 'MySQL Direct', cmd: getComandosRestauracion().mysql },
                { label: 'Docker Instance', cmd: getComandosRestauracion().docker },
                { label: 'File System', cmd: getComandosRestauracion().files }
              ].map((c, i) => (
                <div key={i}>
                  <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase mb-1 sm:mb-2 ml-1">{c.label}</p>
                  <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 font-mono text-[10px] sm:text-sm relative group overflow-hidden">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 border-b border-white/5 pb-1.5 sm:pb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                    </div>
                    <code className="text-emerald-400 break-all leading-relaxed text-[10px] sm:text-sm">$ {c.cmd}</code>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 flex items-start gap-2 sm:gap-3 bg-amber-50 dark:bg-amber-900/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <ExclamationTriangleIcon className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 flex-shrink-0" />
              <p className="text-[10px] sm:text-[11px] font-bold text-amber-800 dark:text-amber-200">
                ADVERTENCIA: La restauración sobrescribirá los datos actuales. Asegúrese de detener los servicios afectados antes de proceder.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE HISTORIAL */}
      <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm mt-6 sm:mt-8">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-50 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 bg-gray-50/50">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Log de Auditoría de Respaldos</h2>
          <span className="text-[9px] sm:text-[10px] font-black bg-gray-200 dark:bg-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-widest text-gray-500">
            {historial.length} Entradas
          </span>
        </div>
        
        {/* Versión Desktop: Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Metadata</th>
                <th className="px-3 sm:px-5 lg:px-6 py-3 sm:py-4 text-left text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Tipo</th>
                <th className="px-3 sm:px-5 lg:px-6 py-3 sm:py-4 text-left text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Peso</th>
                <th className="px-3 sm:px-5 lg:px-6 py-3 sm:py-4 text-left text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-right text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Acciones</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {historial.map((log) => (
                <tr key={log.id} className="group hover:bg-gray-50/50 dark:hover:bg-blue-900/5 transition-colors">
                  <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <p className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">{log.fecha}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 mt-0.5 truncate max-w-[150px] sm:max-w-[200px]">{log.nombre}</p>
                   </td>
                  <td className="px-3 sm:px-5 lg:px-6 py-4 sm:py-6">
                    <span className="text-[9px] sm:text-[11px] font-black uppercase text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg">
                      {log.tipo}
                    </span>
                   </td>
                  <td className="px-3 sm:px-5 lg:px-6 py-4 sm:py-6 text-center text-xs sm:text-sm font-black text-blue-600 dark:text-blue-400">{log.tamaño}</td>
                  <td className="px-3 sm:px-5 lg:px-6 py-4 sm:py-6">
                    <div className="flex flex-col">
                      <div className={`inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${
                        log.estado === 'success' ? 'text-emerald-500' : 'text-red-500'
                      }`}>
                        {log.estado === 'success' ? <CheckCircleIcon className="w-3 sm:w-4 h-3 sm:h-4" /> : <XCircleIcon className="w-3 sm:w-4 h-3 sm:h-4" />}
                        {log.estado}
                      </div>
                      {log.error && <p className="text-[8px] sm:text-[10px] text-red-400 font-medium italic mt-0.5 sm:mt-1 leading-tight">{log.error}</p>}
                    </div>
                   </td>
                  <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-right">
                    {log.estado === 'success' && (
                      <button className="p-1.5 sm:p-2 hover:bg-blue-600 hover:text-white bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg sm:rounded-xl transition-all">
                        <DocumentArrowDownIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                      </button>
                    )}
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>

        {/* Versión Móvil: Cards */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {historial.map((log) => (
            <div key={log.id} className="p-4 space-y-2 hover:bg-gray-50/50 dark:hover:bg-blue-900/5 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-black text-gray-900 dark:text-white">{log.fecha}</p>
                  <p className="text-[9px] font-bold text-gray-400 mt-0.5 truncate max-w-[200px]">{log.nombre}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${
                  log.estado === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {log.estado}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-lg">
                  {log.tipo}
                </span>
                <span className="text-xs font-black text-blue-600 dark:text-blue-400">{log.tamaño}</span>
              </div>
              
              {log.error && (
                <p className="text-[9px] text-red-400 font-medium italic leading-tight">{log.error}</p>
              )}
              
              {log.estado === 'success' && (
                <div className="flex justify-end">
                  <button className="p-1.5 hover:bg-blue-600 hover:text-white bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-all">
                    <DocumentArrowDownIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL FTP (Rediseñado) */}
      {showFtpModal && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2.5rem] max-w-md w-full border border-gray-100 dark:border-gray-800 shadow-2xl p-5 sm:p-6 lg:p-8 m-3 sm:m-4">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-1.5 sm:mb-2">Parámetros de Red</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 font-medium">Configure el destino remoto para la transferencia segura.</p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="col-span-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase ml-1 sm:ml-2 mb-1 block">Host</label>
                  <input type="text" className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm" placeholder="ftp.server.com" />
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase ml-1 sm:ml-2 mb-1 block">Port</label>
                  <input type="number" className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm" placeholder="21" />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase ml-1 sm:ml-2 mb-1 block">Usuario</label>
                  <input type="text" className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm" />
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase ml-1 sm:ml-2 mb-1 block">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm pr-10 sm:pr-12" 
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                    >
                      {showPassword ? <EyeSlashIcon className="w-4 sm:w-5 h-4 sm:h-5" /> : <EyeIcon className="w-4 sm:w-5 h-4 sm:h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6 flex gap-2 sm:gap-3">
                <button onClick={() => setShowFtpModal(false)} className="flex-1 py-2.5 sm:py-3 font-black uppercase tracking-widest text-[9px] sm:text-[10px] text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl sm:rounded-2xl transition-all">
                  Cerrar
                </button>
                <button className="flex-1 py-2.5 sm:py-3 font-black uppercase tracking-widest text-[9px] sm:text-[10px] bg-blue-600 text-white rounded-xl sm:rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                  Transferir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Backup;
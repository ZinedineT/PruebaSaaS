import React, { useState, useEffect } from 'react';
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
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Tipos de datos
interface BackupLog {
  id: number;
  fecha: string;
  tipo: 'total' | 'database' | 'files';
  estado: 'success' | 'error' | 'in_progress';
  tamaño: string;
  nombre: string;
  error?: string;
}

interface BackupConfig {
  tipo: 'total' | 'database' | 'files';
  incluirBaseDatos: boolean;
  incluirArchivos: boolean;
  carpetaEspecifica?: string;
}

interface FtpConfig {
  servidor: string;
  puerto: number;
  usuario: string;
  password: string;
  rutaDestino: string;
}

// Datos de ejemplo para la gráfica de espacio en disco
const diskSpaceData = [
  { fecha: '01/03', usado: 4.2, total: 20 },
  { fecha: '05/03', usado: 4.4, total: 20 },
  { fecha: '10/03', usado: 4.5, total: 20 },
  { fecha: '15/03', usado: 4.7, total: 20 },
  { fecha: '20/03', usado: 4.9, total: 20 },
  { fecha: '23/03', usado: 5.1, total: 20 },
];

// Historial de logs de ejemplo
const historialLogs: BackupLog[] = [
  { id: 1, fecha: '2024-03-23 10:30:00', tipo: 'total', estado: 'success', tamaño: '2.3 GB', nombre: 'backup_total_20240323_103000.zip' },
  { id: 2, fecha: '2024-03-22 15:45:00', tipo: 'database', estado: 'success', tamaño: '156 MB', nombre: 'backup_db_20240322_154500.sql' },
  { id: 3, fecha: '2024-03-21 09:15:00', tipo: 'files', estado: 'error', tamaño: '0 B', nombre: 'backup_files_20240321_091500.zip', error: 'Error de permisos en carpeta /var/www/backend/storage' },
  { id: 4, fecha: '2024-03-20 14:20:00', tipo: 'total', estado: 'success', tamaño: '2.1 GB', nombre: 'backup_total_20240320_142000.zip' },
];

const Backup: React.FC = () => {
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTipo, setSelectedTipo] = useState<BackupConfig['tipo']>('total');
  const [carpetaEspecifica, setCarpetaEspecifica] = useState('/var/www/backend/storage');
  const [showFtpModal, setShowFtpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ftpConfig, setFtpConfig] = useState<FtpConfig>({
    servidor: '',
    puerto: 21,
    usuario: '',
    password: '',
    rutaDestino: '/backups/'
  });
  const [ultimoBackup, setUltimoBackup] = useState<BackupLog | null>(historialLogs[0]);
  const [espacioLibre, setEspacioLibre] = useState(14.9); // GB
  const [espacioTotal] = useState(20); // GB
  const [tamanioArchivos, setTamanioArchivos] = useState({
    baseDatos: '156 MB',
    archivos: '2.1 GB',
    pdfs: '845 MB',
    logs: '128 MB'
  });

  // Simular proceso de backup
  const handleIniciarBackup = () => {
    setBackupInProgress(true);
    setProgress(0);
    
    // Simular progreso
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBackupInProgress(false);
          
          // Agregar al historial
          const nuevoBackup: BackupLog = {
            id: historialLogs.length + 1,
            fecha: new Date().toLocaleString(),
            tipo: selectedTipo,
            estado: 'success',
            tamaño: selectedTipo === 'database' ? '158 MB' : selectedTipo === 'files' ? '2.2 GB' : '2.4 GB',
            nombre: `backup_${selectedTipo}_${new Date().toISOString().slice(0,19).replace(/[-:]/g, '').replace('T', '_')}.${selectedTipo === 'database' ? 'sql' : 'zip'}`
          };
          historialLogs.unshift(nuevoBackup);
          setUltimoBackup(nuevoBackup);
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // Simular descarga
  const handleDescargar = (nombre: string) => {
    // Simular descarga
    const link = document.createElement('a');
    link.href = '#';
    link.download = nombre;
    link.click();
  };

  // Simular envío remoto
  const handleEnvioRemoto = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFtpModal(false);
    alert(`Enviando backup a ${ftpConfig.servidor}:${ftpConfig.puerto}...\nEsta es una simulación. En producción se conectaría al servidor FTP.`);
    // Limpiar contraseña por seguridad
    setFtpConfig(prev => ({ ...prev, password: '' }));
  };

  // Obtener comandos de restauración dinámicos
  const getComandosRestauracion = () => {
    const nombreArchivo = ultimoBackup?.nombre || 'backup_actual.zip';
    const esDatabase = ultimoBackup?.tipo === 'database' || nombreArchivo.endsWith('.sql');
    
    if (esDatabase) {
      return {
        mysql: `mysql -h mysql -u laravel_user -p facturacion_db < /ruta/al/backup/${nombreArchivo}`,
        importar: `docker exec -i proyecto_mysql mysql -u laravel_user -plaravel_password facturacion_db < ${nombreArchivo}`,
        archivos: `cp -r /ruta/al/backup/${nombreArchivo} /var/www/backend/storage/backups/`
      };
    } else {
      return {
        mysql: `mysql -h mysql -u laravel_user -p facturacion_db < backup_db.sql`,
        importar: `docker exec -i proyecto_mysql mysql -u laravel_user -plaravel_password facturacion_db < backup_db.sql`,
        archivos: `unzip ${nombreArchivo} -d /var/www/backend/`
      };
    }
  };

  const comandos = getComandosRestauracion();

  // Obtener color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'success':
        return <CheckCircleIcon className="w-4 h-4" />;
      case 'error':
        return <XCircleIcon className="w-4 h-4" />;
      case 'in_progress':
        return <ClockIcon className="w-4 h-4" />;
      default:
        return <InformationCircleIcon className="w-4 h-4" />;
    }
  };

  const getTipoTexto = (tipo: string) => {
    switch (tipo) {
      case 'total':
        return 'Completo (BD + Archivos)';
      case 'database':
        return 'Solo Base de Datos';
      case 'files':
        return 'Solo Archivos';
      default:
        return tipo;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Backup del Sistema</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Genera y gestiona respaldos de seguridad
        </p>
      </div>

      {/* Tarjetas de estado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Espacio Libre en Disco</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{espacioLibre} GB</p>
              <p className="text-xs text-gray-500 mt-1">de {espacioTotal} GB totales</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <CircleStackIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${((espacioTotal - espacioLibre) / espacioTotal) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Usado: {(espacioTotal - espacioLibre).toFixed(1)} GB ({((espacioTotal - espacioLibre) / espacioTotal * 100).toFixed(0)}%)
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Último Backup</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">{ultimoBackup?.fecha || 'No disponible'}</p>
              <p className="text-xs text-gray-500 mt-1">{ultimoBackup?.tamaño || '0 B'}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          {ultimoBackup && (
            <div className="mt-4">
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getEstadoColor(ultimoBackup.estado)}`}>
                {getEstadoIcon(ultimoBackup.estado)}
                {ultimoBackup.estado === 'success' ? 'Completado con éxito' : 'Error en proceso'}
              </span>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tamaño de Archivos</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">{tamanioArchivos.archivos}</p>
              <p className="text-xs text-gray-500 mt-1">PDFs: {tamanioArchivos.pdfs}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <FolderOpenIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Panel de Control de Backup */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generar Nuevo Backup</h2>
        
        <div className="space-y-4">
          {/* Selector de tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Respaldo
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="total"
                  checked={selectedTipo === 'total'}
                  onChange={(e) => setSelectedTipo(e.target.value as BackupConfig['tipo'])}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Total (BD + Archivos)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="database"
                  checked={selectedTipo === 'database'}
                  onChange={(e) => setSelectedTipo(e.target.value as BackupConfig['tipo'])}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Solo Base de Datos</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="files"
                  checked={selectedTipo === 'files'}
                  onChange={(e) => setSelectedTipo(e.target.value as BackupConfig['tipo'])}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Solo Archivos</span>
              </label>
            </div>
          </div>

          {/* Carpeta específica (solo para archivos) */}
          {selectedTipo === 'files' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Carpeta Específica
              </label>
              <input
                type="text"
                value={carpetaEspecifica}
                onChange={(e) => setCarpetaEspecifica(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Ruta dentro del contenedor Docker</p>
            </div>
          )}

          {/* Botón de iniciar */}
          <button
            onClick={handleIniciarBackup}
            disabled={backupInProgress}
            className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              backupInProgress
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white'
            }`}
          >
            {backupInProgress ? (
              <>
                <ClockIcon className="w-5 h-5 animate-spin" />
                Procesando... {progress}%
              </>
            ) : (
              <>
                <PlayIcon className="w-5 h-5" />
                Iniciar Proceso de Backup
              </>
            )}
          </button>

          {/* Barra de progreso */}
          {backupInProgress && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center text-gray-500 mt-2">
                Empaquetando archivos... {progress}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Gráfica de espacio en disco */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Evolución del Espacio en Disco</h2>
          <ServerIcon className="w-5 h-5 text-gray-500" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={diskSpaceData}>
              <defs>
                <linearGradient id="diskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" unit=" GB" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`${value}%`, 'CPU']}              
                />
              <Area
                type="monotone"
                dataKey="usado"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#diskGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historial de Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Historial de Respaldos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tamaño</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {historialLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{log.fecha}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{getTipoTexto(log.tipo)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{log.tamaño}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getEstadoColor(log.estado)}`}>
                      {getEstadoIcon(log.estado)}
                      {log.estado === 'success' ? 'Éxito' : log.estado === 'error' ? 'Error' : 'En Proceso'}
                    </span>
                    {log.error && (
                      <p className="text-xs text-red-500 mt-1">{log.error}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {log.estado === 'success' && (
                      <button
                        onClick={() => handleDescargar(log.nombre)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                      >
                        <DocumentArrowDownIcon className="w-4 h-4" />
                        Descargar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comandos de Restauración */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheckIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Comandos de Restauración</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Estos comandos te permitirán restaurar el sistema manualmente desde la terminal
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Restaurar Base de Datos
            </label>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3">
              <code className="text-sm text-green-400 break-all">{comandos.mysql}</code>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Restaurar desde Docker
            </label>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3">
              <code className="text-sm text-green-400 break-all">{comandos.importar}</code>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Restaurar Archivos
            </label>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3">
              <code className="text-sm text-green-400 break-all">{comandos.archivos}</code>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-start gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <p className="text-xs text-yellow-800 dark:text-yellow-300">
              ⚠️ Asegúrate de tener los archivos de backup en la ruta especificada antes de ejecutar estos comandos.
              Los comandos son solo referenciales y pueden requerir ajustes según tu entorno.
            </p>
          </div>
        </div>
      </div>

      {/* Envío Remoto */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CloudArrowUpIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Envío Remoto (FTP/SFTP)</h2>
          </div>
          <button
            onClick={() => setShowFtpModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg text-sm"
          >
            Configurar Envío
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Envía el último backup a un servidor externo para mayor seguridad.
          Las credenciales no se almacenan y se solicitan en cada transferencia.
        </p>
      </div>

      {/* Modal FTP */}
      {showFtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Configurar Envío Remoto</h2>
            </div>
            <form onSubmit={handleEnvioRemoto} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Servidor FTP/SFTP *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ftp.ejemplo.com"
                  value={ftpConfig.servidor}
                  onChange={(e) => setFtpConfig({ ...ftpConfig, servidor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Puerto
                </label>
                <input
                  type="number"
                  value={ftpConfig.puerto}
                  onChange={(e) => setFtpConfig({ ...ftpConfig, puerto: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Usuario *
                </label>
                <input
                  type="text"
                  required
                  value={ftpConfig.usuario}
                  onChange={(e) => setFtpConfig({ ...ftpConfig, usuario: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={ftpConfig.password}
                    onChange={(e) => setFtpConfig({ ...ftpConfig, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ruta de Destino
                </label>
                <input
                  type="text"
                  placeholder="/backups/"
                  value={ftpConfig.rutaDestino}
                  onChange={(e) => setFtpConfig({ ...ftpConfig, rutaDestino: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowFtpModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
                >
                  Enviar Backup
                </button>
              </div>
            </form>
            <div className="px-6 pb-6">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  🔒 Las credenciales no se almacenan en la base de datos por seguridad.
                  Se utilizan solo para la transferencia actual.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Backup;
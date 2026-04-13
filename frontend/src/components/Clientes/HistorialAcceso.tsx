import React from 'react';
import { X, History, CheckCircle, Lock, Clock, User, Calendar } from 'lucide-react';

interface HistorialAccesoProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
}

const HistorialAcceso: React.FC<HistorialAccesoProps> = ({ isOpen, onClose, cliente }) => {
  if (!isOpen) return null;

  // Datos de ejemplo
  const historial = [
    { id: 1, accion: 'Acceso activado', usuario: 'admin@sys.com', fecha: '15/03/2026 10:30', estado: 'ACTIVO', icon: CheckCircle, color: 'emerald' },
    { id: 2, accion: 'Prórroga de 5 días', usuario: 'soporte@sys.com', fecha: '10/03/2026 14:20', estado: 'PRORROGA', icon: Clock, color: 'amber' },
    { id: 3, accion: 'Bloqueo por pago', usuario: 'Sistema automático', fecha: '01/03/2026 00:00', estado: 'BLOQUEADO', icon: Lock, color: 'rose' }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white dark:bg-[#161b22] w-full max-w-2xl rounded-3xl shadow-2xl max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <History className="text-purple-500" size={20} />
            <h2 className="text-lg font-black dark:text-white">Historial de cambios</h2>
            <p className="text-[10px] text-gray-400 ml-2">{cliente?.nombre}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-3">
            {historial.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl">
                  <div className={`p-2 rounded-full bg-${item.color}-100 dark:bg-${item.color}-500/20`}>
                    <Icon size={16} className={`text-${item.color}-500`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black dark:text-white">{item.accion}</p>
                    <div className="flex items-center gap-4 mt-1 text-[9px] text-gray-400 font-bold uppercase">
                      <span className="flex items-center gap-1"><User size={10} /> {item.usuario}</span>
                      <span className="flex items-center gap-1"><Calendar size={10} /> {item.fecha}</span>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-1 rounded-full bg-${item.color}-100 dark:bg-${item.color}-500/20 text-${item.color}-600 uppercase`}>
                    {item.estado}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialAcceso;
import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  BriefcaseIcon,
  IdentificationIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  ultimoLogin: string;
  cargo?: string;
}

interface UsuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (usuario: Omit<Usuario, 'id' | 'ultimoLogin'>) => void;
  usuario?: Usuario | null;
  mode: 'create' | 'edit';
}

const UsuarioModal: React.FC<UsuarioModalProps> = ({ isOpen, onClose, onSave, usuario, mode }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    rol: 'usuario',
    estado: 'activo' as 'activo' | 'inactivo',
    cargo: ''
  });

  useEffect(() => {
    if (usuario && mode === 'edit') {
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol,
        estado: usuario.estado,
        cargo: usuario.cargo || ''
      });
    } else {
      setFormData({
        nombre: '', email: '', telefono: '', rol: 'usuario', estado: 'activo', cargo: ''
      });
    }
  }, [usuario, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay con desenfoque */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Contenedor del Modal */}
      <div className="relative bg-white dark:bg-[#161b22] w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden transform transition-all">
        
        {/* Header con Decoración */}
        <div className="relative px-8 py-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {mode === 'create' ? 'Nuevo Miembro' : 'Editar Perfil'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                  {mode === 'create' ? 'Configurar nuevo acceso' : `Editando ID: #${usuario?.id}`}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-xl transition-all"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</label>
              <div className="relative">
                <IdentificationIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white font-bold transition-all"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            {/* Cargo */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Cargo / Puesto</label>
              <div className="relative">
                <BriefcaseIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white font-bold transition-all"
                  placeholder="Ej. Desarrollador Senior"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white font-bold transition-all"
                  placeholder="usuario@empresa.com"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Teléfono Móvil</label>
              <div className="relative">
                <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white font-bold transition-all"
                  placeholder="+51 987 654 321"
                />
              </div>
            </div>

            {/* Rol Select */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Nivel de Acceso (Rol)</label>
              <select
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white font-bold transition-all appearance-none"
              >
                <option value="admin">Administrador del Sistema</option>
                <option value="supervisor">Supervisor de Área</option>
                <option value="usuario">Usuario Estándar</option>
                <option value="contador">Contabilidad / Auditor</option>
                <option value="vendedor">Fuerza de Ventas</option>
              </select>
            </div>

            {/* Estado Select */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Estado de Cuenta</label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value as 'activo' | 'inactivo' })}
                className={`w-full px-5 py-3.5 border rounded-2xl focus:ring-4 outline-none font-bold transition-all appearance-none ${
                  formData.estado === 'activo' 
                  ? 'bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-800 text-green-700 dark:text-green-400 focus:ring-green-500/10' 
                  : 'bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-800 text-red-700 dark:text-red-400 focus:ring-red-500/10'
                }`}
              >
                <option value="activo">Cuenta Activa</option>
                <option value="inactivo">Cuenta Suspendida</option>
              </select>
            </div>
          </div>

          {/* Footer de Acciones */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Descartar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-10 py-3.5 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <CheckCircleIcon className="w-5 h-5" />
              {mode === 'create' ? 'Crear Usuario' : 'Aplicar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsuarioModal;
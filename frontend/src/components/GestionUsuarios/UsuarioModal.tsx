// D:\proyecto_prueba\frontend\src\components\GestionUsuarios\UsuarioModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  IdentificationIcon,
  CheckCircleIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { ActionButton } from '../ui/ActionButton';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  ultimoLogin: string;
  deleted_at?: string | null;
}

interface UsuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (usuario: Omit<Usuario, 'id' | 'ultimoLogin' | 'deleted_at'>, password?: string) => void;
  usuario?: Usuario | null;
  mode: 'create' | 'edit';
  showPasswordField: boolean;
  setShowPasswordField: (show: boolean) => void;
  passwordValue: string;
  setPasswordValue: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  isLoading?: boolean;
}

const UsuarioModal: React.FC<UsuarioModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  usuario, 
  mode,
  showPasswordField,
  setShowPasswordField,
  passwordValue,
  setPasswordValue,
  confirmPassword,
  setConfirmPassword,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    rol: 'suport_n1',
    estado: 'activo' as 'activo' | 'inactivo',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (usuario && mode === 'edit') {
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol,
        estado: usuario.estado,
      });
    } else {
      setFormData({
        nombre: '', 
        email: '', 
        telefono: '', 
        rol: 'suport_n1', 
        estado: 'activo'
      });
    }
    // Resetear campos de contraseña al abrir modal
    if (mode === 'create') {
      setShowPasswordField(true);
    } else {
      setShowPasswordField(false);
    }
    setPasswordValue('');
    setConfirmPassword('');
  }, [usuario, mode, isOpen, setShowPasswordField, setPasswordValue, setConfirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar contraseñas
    if (mode === 'create') {
      if (!passwordValue) {
        // Usamos toast aquí o alert? Prefiero toast pero necesitarías importar
        alert('La contraseña es obligatoria');
        return;
      }
      if (passwordValue !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
    }
    
    if (mode === 'edit' && showPasswordField) {
      if (passwordValue !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
    }
    
    // Llamar a onSave con los datos y la contraseña si es necesario
    if ((mode === 'edit' && showPasswordField && passwordValue) || mode === 'create') {
      onSave(formData, passwordValue);
    } else {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      <div 
        className="fixed inset-0 bg-gray-900/70 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />

      <div className="relative bg-white dark:bg-[#0f1115] w-[95%] max-w-2xl rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 flex flex-col my-auto">
        
        <div className="relative px-8 py-8 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f1115] shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                  {mode === 'create' ? 'Nuevo Miembro' : 'Editar Perfil'}
                </h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-[0.2em] mt-2">
                  {mode === 'create' ? 'Configurar nuevo acceso' : `Editando ID: #${usuario?.id}`}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 rounded-xl transition-all"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Nombre Completo <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <IdentificationIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none dark:text-white font-bold transition-all"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Rol</label>
              <select
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white font-bold transition-all appearance-none cursor-pointer"
              >
                <option value="super_admin">Super Administrador</option>
                <option value="admin">Administrador</option>
                <option value="suport_n2">Soporte Nivel 2</option>
                <option value="suport_n1">Soporte Nivel 1</option>
                <option value="ti_n1">Técnico Nivel 1</option>
                <option value="ti_n2">Técnico Nivel 2</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none dark:text-white font-bold transition-all"
                  placeholder="usuario@empresa.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Teléfono Móvil
              </label>
              <div className="relative group">
                <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none dark:text-white font-bold transition-all"
                  placeholder="+51 987 654 321"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Estado</label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value as 'activo' | 'inactivo' })}
                className={`w-full px-5 py-3.5 border rounded-2xl focus:ring-4 outline-none font-black transition-all appearance-none cursor-pointer ${
                  formData.estado === 'activo' 
                  ? 'bg-emerald-50/30 dark:bg-emerald-500/5 border-emerald-500/30 text-emerald-600 focus:ring-emerald-500/10' 
                  : 'bg-rose-50/30 dark:bg-rose-500/5 border-rose-500/30 text-rose-600 focus:ring-rose-500/10'
                }`}
              >
                <option value="activo">● Activo</option>
                <option value="inactivo">○ Suspendido</option>
              </select>
            </div>

            {/* Botón para cambiar contraseña en modo edición */}
            {mode === 'edit' && !showPasswordField && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordField(true)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm"
                >
                  <KeyIcon className="w-5 h-5" />
                  Cambiar Contraseña
                </button>
              </div>
            )}

            {/* Campos de contraseña */}
            {(showPasswordField || mode === 'create') && (
              <>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Contraseña {mode === 'create' && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative group">
                    <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required={mode === 'create'}
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none dark:text-white font-bold transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Confirmar Contraseña {mode === 'create' && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative group">
                    <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required={mode === 'create'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none dark:text-white font-bold transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordValue !== confirmPassword && confirmPassword && (
                    <p className="text-[10px] text-red-500 font-bold ml-1">Las contraseñas no coinciden</p>
                  )}
                </div>

                {mode === 'edit' && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordField(false);
                        setPasswordValue('');
                        setConfirmPassword('');
                      }}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Cancelar cambio de contraseña
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </form>

        <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f1115] flex justify-end gap-3 shrink-0">
          <ActionButton
            type="button"
            onClick={onClose}
            actionType="cancel"
            variant="outline"
            size="md"
          >
            Cancelar
          </ActionButton>
          <ActionButton
            onClick={handleSubmit}
            actionType={mode === 'create' ? 'create' : 'update'}
            variant="primary"
            size="md"
            loading={isLoading}
            icon={<CheckCircleIcon className="w-5 h-5" />}
          >
            {mode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default UsuarioModal;
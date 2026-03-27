import React, { useState, useEffect, useRef } from 'react';
import { 
  Bars3Icon, 
  SunIcon, 
  MoonIcon, 
  BellIcon, 
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  Cog6ToothIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Obtener iniciales del usuario
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'AD';
  };

  // Obtener nombre de usuario
  const getUserName = () => {
    if (user?.name) {
      return user.name;
    }
    return 'Administrador';
  };

  // Obtener rol del usuario
  const getUserRole = () => {
    if (user?.role === 'admin') {
      return 'Administrador';
    }
    if (user?.role === 'user') {
      return 'Usuario';
    }
    return 'Usuario';
  };

  return (
    <nav className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3">
        
        {/* LADO IZQUIERDO: Control y Saludo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-all duration-200"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
              ¡Hola, {getUserName()}! 👋
            </h2>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Sistema operativo y estable
            </p>
          </div>

          {/* Buscador */}
          <div className="hidden md:flex items-center relative group">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar reporte, usuario..."
              className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-gray-700 dark:text-gray-300 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* LADO DERECHO: Acciones y Perfil */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Toggle de Tema */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 overflow-hidden relative"
            title="Cambiar modo"
          >
            <div className={`transition-transform duration-500 ${theme === 'light' ? 'translate-y-0' : '-translate-y-10'}`}>
              <MoonIcon className="w-5 h-5" />
            </div>
            <div className={`absolute top-2.5 transition-transform duration-500 ${theme === 'dark' ? 'translate-y-0' : 'translate-y-10'}`}>
              <SunIcon className="w-5 h-5 text-amber-400" />
            </div>
          </button>

          {/* Notificaciones */}
          <button className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all relative group">
            <BellIcon className="w-5 h-5 group-hover:shake" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm animate-pulse"></span>
          </button>

          {/* Separador */}
          <div className="h-8 w-px bg-gray-100 dark:bg-gray-800 mx-1 hidden sm:block"></div>

          {/* Perfil de Usuario con Menú Desplegable */}
          <div className="relative" ref={menuRef}>
            <div 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 pl-2 group cursor-pointer"
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {getUserName()}
                </p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
                  {getUserRole()}
                </p>
              </div>
              
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                  {getUserInitials()}
                </div>
                {/* Indicador de Status */}
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
              </div>
            </div>
            
            {/* Menú Desplegable */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 overflow-hidden animate-fadeIn">
                {/* Cabecera del menú */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {getUserName()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email || 'admin@gmail.com'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Opciones del menú */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/perfil');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Mi Perfil</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/configuracion');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Cog6ToothIcon className="w-4 h-4" />
                    <span>Configuración</span>
                  </button>
                  
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/seguridad');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Seguridad</span>
                    </button>
                  )}
                </div>
                
                {/* Separador y botón de cerrar sesión */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
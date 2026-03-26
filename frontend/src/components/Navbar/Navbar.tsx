import React from 'react';
import { 
  Bars3Icon, 
  SunIcon, 
  MoonIcon, 
  BellIcon, 
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

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
              ¡Hola, Admin! 👋
            </h2>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Sistema operativo y estable
            </p>
          </div>

          {/* Buscador (Le da un toque muy Pro) */}
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

          {/* Perfil de Usuario */}
          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Administrador
              </p>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
                Online
              </p>
            </div>
            
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                AD
              </div>
              {/* Indicador de Status */}
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
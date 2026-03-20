import React from 'react';
import { Bars3Icon, SunIcon, MoonIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Bienvenido, Admin</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Último acceso: hoy a las 10:30 AM</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? (
              <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <SunIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
            <BellIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
            <UserCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800 dark:text-white">Administrador</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@empresa.com</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CreditCardIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  ArrowPathIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: HomeIcon },
    { path: '/usuarios', name: 'Gestión Usuarios', icon: UsersIcon },  // Nuevo
    { path: '/planes', name: 'Planes', icon: CreditCardIcon },
    { path: '/contabilidad', name: 'Contabilidad', icon: ChartBarIcon },
    { path: '/configuracion', name: 'Configuración', icon: Cog6ToothIcon },
    // { path: '/actualizacion', name: 'Actualización', icon: ArrowPathIcon },
    { path: '/backup', name: 'Backup', icon: CloudArrowUpIcon },
    { path: '/informacion', name: 'Información', icon: InformationCircleIcon },
    { path: '/wiki', name: 'Wiki', icon: BookOpenIcon },
    { path: '/logs', name: 'Logs', icon: DocumentTextIcon },
    { path: '/reportes', name: 'Reportes', icon: ChartBarIcon },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 z-20 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
          {isOpen ? (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AdminPanel
            </h1>
          ) : (
            <img
              src="/logos/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              <item.icon className={`w-6 h-6 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {isOpen && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Versión 1.0.0
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
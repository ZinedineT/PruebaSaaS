import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importamos el contexto
import { 
  HomeIcon, CreditCardIcon, CalculatorIcon, Cog6ToothIcon,CloudArrowUpIcon, InformationCircleIcon,
  DocumentTextIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightOnRectangleIcon, RocketLaunchIcon // Icono de Logout
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth(); 
  const isSuperAdmin = user?.role === 'super_admin';
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const menuSections = [
    {
      label: 'Principal',
      items: [
        { path: '/', name: 'Dashboard', icon: HomeIcon },
        ...(isSuperAdmin 
          ? [{ path: '/usuarios', name: 'Usuarios', icon: UsersIcon }]
          : []
        ),
        { path: '/suscripciones', name: 'Suscripciones', icon: RocketLaunchIcon },
      ]
    },
    {
      label: 'Administración',
      items: [
        { path: '/planes', name: 'Planes', icon: CreditCardIcon },
        { path: '/contabilidad', name: 'Contabilidad', icon: CalculatorIcon },
      ]
    },
    {
      label: 'Sistema',
      items: [
        { path: '/configuracion', name: 'Ajustes', icon: Cog6ToothIcon },
        { path: '/backup', name: 'Backup', icon: CloudArrowUpIcon },
        { path: '/informacion', name: 'Estado', icon: InformationCircleIcon },
        { path: '/logs', name: 'Logs', icon: DocumentTextIcon },
      ]
    }
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 z-30 shadow-2xl ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full relative">
        
        {/* BOTÓN DE COLAPSO FLOTANTE */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-10 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-full p-1 shadow-lg hover:scale-110 transition-all z-50"
        >
          {isOpen ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
        </button>

        {/* LOGO SECTION */}
        <div className="flex items-center h-20 border-b border-gray-100 dark:border-gray-800 px-5">
          <div className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
              <img src="/logos/logo.png" alt="Logo" className="max-w-[24px] invert brightness-0" />
            </div>
            {isOpen && (
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white truncate animate-in fade-in duration-300">
                Admin<span className="text-blue-600">Panel</span>
              </span>
            )}
          </div>
        </div>

        {/* MENU ITEMS */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-none">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="mb-8">
              {isOpen && (
                <h2 className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 animate-in fade-in">
                  {section.label}
                </h2>
              )}
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      group flex items-center px-3.5 py-3 rounded-xl transition-all duration-200 relative
                      ${isActive 
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <item.icon className={`w-6 h-6 transition-transform group-hover:scale-110 flex-shrink-0 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                    {isOpen && (
                      <span className="text-sm font-semibold truncate animate-in fade-in slide-in-from-left-2 duration-300">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* SECCIÓN DE LOGOUT */}
        <div className="p-3 mt-auto border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/20">
          {/* Cuando el Sidebar está abierto */}
          {isOpen && (
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-left gap-3 p-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all group"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              <span className="text-sm font-bold tracking-wider">Cerrar Sesión</span>
            </button>
          )}
          
          {/* Cuando el Sidebar está cerrado */}
          {!isOpen && (
            <button 
              onClick={handleLogout}
              className="w-full flex justify-center p-3 text-gray-400 hover:text-red-500 transition-colors"
              title="Cerrar Sesión"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </button>
          )}
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
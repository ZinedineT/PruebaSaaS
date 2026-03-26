import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CreditCardIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Square3Stack3DIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const menuSections = [
    {
      label: 'Principal',
      items: [
        { path: '/', name: 'Dashboard', icon: HomeIcon },
        { path: '/usuarios', name: 'Usuarios', icon: UsersIcon },
      ]
    },
    {
      label: 'Administración',
      items: [
        { path: '/planes', name: 'Planes', icon: CreditCardIcon },
        { path: '/contabilidad', name: 'Contabilidad', icon: ChartBarIcon },
        { path: '/reportes', name: 'Reportes', icon: Square3Stack3DIcon },
      ]
    },
    {
      label: 'Sistema',
      items: [
        { path: '/configuracion', name: 'Ajustes', icon: Cog6ToothIcon },
        { path: '/backup', name: 'Backup', icon: CloudArrowUpIcon },
        { path: '/informacion', name: 'Estado', icon: InformationCircleIcon },
        { path: '/logs', name: 'Logs', icon: DocumentTextIcon },
        { path: '/wiki', name: 'Wiki', icon: BookOpenIcon },
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

        {/* LOGO SECTION (Rediseñado para no cortar) */}
        <div className="flex items-center h-20 border-b border-gray-100 dark:border-gray-800 px-5">
          <div className="flex items-center gap-3 w-full">
            {/* Contenedor del Logo: Mantiene tamaño y centra */}
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <img
                src="/logos/logo.png"
                alt="Logo"
                className="max-w-full max-h-full object-contain" // Importante: object-contain y max-h
              />
            </div>
            {/* Texto del Logo: Aparece/Desaparece suave */}
            {isOpen && (
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white truncate animate-in fade-in duration-300">
                Admin<span className="text-blue-600">Panel</span>
              </span>
            )}
          </div>
        </div>

        {/* MENU ITEMS (Agrupados) */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="mb-8">
              {isOpen && (
                <h2 className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 animate-in fade-in duration-500">
                  {section.label}
                </h2>
              )}
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={!isOpen ? item.name : ''}
                    className={({ isActive }) => `
                      group flex items-center px-3.5 py-3 rounded-xl transition-all duration-200 relative
                      ${isActive 
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        {/* ICONO Centrado si está cerrado */}
                        <item.icon className={`w-6 h-6 transition-transform group-hover:scale-110 flex-shrink-0 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                        
                        {/* TEXTO con animación de entrada */}
                        {isOpen && (
                          <span className="text-sm font-semibold tracking-wide truncate animate-in fade-in slide-in-from-left-2 duration-300">
                            {item.name}
                          </span>
                        )}
                        
                        {/* INDICADOR DE ACTIVE (Sutil) */}
                        {isActive && (
                          <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* USER / FOOTER SECTION */}
        <div className="p-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 border-2 border-white dark:border-gray-900 shadow-lg flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0 animate-in fade-in duration-300">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">v1.2.4 Premium</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
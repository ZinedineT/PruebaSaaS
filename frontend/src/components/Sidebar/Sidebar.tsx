import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  HomeIcon, UsersIcon, RocketLaunchIcon, UserPlusIcon, 
  Cog6ToothIcon, DocumentTextIcon, CloudArrowUpIcon, 
  InformationCircleIcon, ChevronLeftIcon, ChevronRightIcon, 
  ArrowRightOnRectangleIcon, CreditCardIcon, CalculatorIcon,
  ShieldCheckIcon, FolderIcon, ServerIcon, ClipboardDocumentListIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

type Rol = 'super_admin' | 'admin' | 'suport1' | 'suport2' | 'ti_n1' | 'ti_n2';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const userRole = user?.role as Rol;
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // ========== FUNCIONES DE PERMISOS ==========
  
  const canSeeDashboard = () => {
    return ['super_admin', 'admin', 'suport1', 'suport2'].includes(userRole);
  };

  const canSeeClientes = () => {
    return ['super_admin', 'admin', 'suport1', 'suport2', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canSeeSuscripciones = () => {
    return ['super_admin', 'admin', 'suport2', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canSeeOnboarding = () => {
    return ['super_admin', 'admin', 'suport2'].includes(userRole);
  };

  const canSeeOperaciones = () => {
    return ['super_admin', 'admin', 'suport1', 'suport2', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canSeeContabilidad = () => {
    return ['super_admin', 'admin'].includes(userRole);
  };

  const canSeeConfiguracionComercial = () => {
    return ['super_admin', 'admin'].includes(userRole);
  };

  const canSeeConfiguracionGlobal = () => {
    return ['super_admin', 'admin', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canEditConfiguracionGlobal = () => {
    return ['super_admin', 'admin', 'ti_n2'].includes(userRole);
  };

  const canSeeSeguridad = () => {
    return userRole === 'super_admin';
  };

  const canSeeUsuarios = () => {
    return userRole === 'super_admin';
  };

  const canSeeAuditoria = () => {
    return ['super_admin', 'admin', 'suport2', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canSeePlataforma = () => {
    return ['super_admin', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canSeeLogs = () => {
    return ['super_admin', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  // ========== CONSTRUCCIÓN DE MENÚ DINÁMICO ==========

  const menuSections = [];

  // 1. Principal / Dashboard
  if (canSeeDashboard()) {
    menuSections.push({
      label: 'Principal',
      items: [{ path: '/', name: 'Dashboard', icon: HomeIcon }]
    });
  }

  // 2. Clientes
  const clientesItems = [];
  if (canSeeClientes()) clientesItems.push({ path: '/clientes', name: 'Clientes', icon: UsersIcon });
  if (canSeeSuscripciones()) clientesItems.push({ path: '/suscripciones', name: 'Suscripciones', icon: RocketLaunchIcon });
  if (canSeeOnboarding()) clientesItems.push({ path: '/onboarding', name: 'Onboarding', icon: UserPlusIcon });
  
  if (clientesItems.length > 0) {
    menuSections.push({
      label: 'Clientes',
      items: clientesItems
    });
  }

  // 3. Operaciones
  const operacionesItems = [];
  if (canSeeOperaciones()) operacionesItems.push({ path: '/operaciones', name: 'Operaciones', icon: ChartBarIcon });
  if (canSeeContabilidad()) operacionesItems.push({ path: '/contabilidad', name: 'Contabilidad', icon: CalculatorIcon });
  
  if (operacionesItems.length > 0) {
    menuSections.push({
      label: 'Operaciones',
      items: operacionesItems
    });
  }

  // 4. Configuración (dropdown)
  const configuracionItems = [];
  if (canSeeConfiguracionComercial()) configuracionItems.push({ path: '/configuracion/planes', name: 'Comercial', icon: CreditCardIcon });
  if (canSeeConfiguracionGlobal()) configuracionItems.push({ path: '/configuracion/global', name: 'Global', icon: FolderIcon });
  if (canSeeUsuarios()) configuracionItems.push({ path: '/usuarios', name: 'Usuarios', icon: ShieldCheckIcon });
  
  if (configuracionItems.length > 0) {
    menuSections.push({
      label: 'Configuración',
      isDropdown: true,
      icon: Cog6ToothIcon,
      dropdownName: 'configuracion',
      items: configuracionItems
    });
  }

  // 5. Auditoría
  if (canSeeAuditoria()) {
    menuSections.push({
      label: 'Auditoría',
      items: [{ path: '/auditoria', name: 'Auditoría', icon: ClipboardDocumentListIcon }]
    });
  }

  // 6. Plataforma (dropdown)
  if (canSeePlataforma()) {
    const plataformaItems = [
      { path: '/plataforma/procesos', name: 'Procesos', icon: Cog6ToothIcon },
      { path: '/plataforma/mantenimiento', name: 'Mantenimiento', icon: CloudArrowUpIcon },
      { path: '/plataforma/herramientas', name: 'Herramientas', icon: InformationCircleIcon },
    ];
    if (canSeeLogs()) plataformaItems.push({ path: '/logs', name: 'Logs', icon: DocumentTextIcon });
    
    menuSections.push({
      label: 'Plataforma',
      isDropdown: true,
      icon: ServerIcon,
      dropdownName: 'plataforma',
      items: plataformaItems
    });
  }

  // ========== RENDERIZADO ==========

  const renderNavItem = (item: any, idx: number) => {
    if (item.isDropdown) {
      return (
        <div key={idx} className="mb-2">
          <button
            onClick={() => toggleDropdown(item.dropdownName)}
            className={`w-full flex items-center px-3.5 py-3 rounded-xl transition-all duration-200 group
              ${openDropdown === item.dropdownName 
                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            <item.icon className={`w-6 h-6 transition-transform group-hover:scale-110 flex-shrink-0 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
            {isOpen && (
              <span className="text-sm font-semibold truncate flex-1 text-left animate-in fade-in slide-in-from-left-2 duration-300">
                {item.label}
              </span>
            )}
            {isOpen && (
              <ChevronRightIcon 
                className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.dropdownName ? 'rotate-90' : ''}`}
              />
            )}
          </button>
          
          {isOpen && openDropdown === item.dropdownName && (
            <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3 animate-in slide-in-from-left-2 fade-in duration-200">
              {item.items.map((subItem: any, subIdx: number) => (
                <NavLink
                  key={subIdx}
                  to={subItem.path}
                  className={({ isActive }) => `
                    flex items-center px-3.5 py-2 rounded-lg transition-all duration-200 text-sm
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  <subItem.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="text-xs font-medium truncate">
                    {subItem.name}
                  </span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={idx}
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
    );
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 z-30 shadow-2xl ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full relative">
        
        {/* BOTÓN DE COLAPSO */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-10 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-full p-1 shadow-lg hover:scale-110 transition-all z-50"
        >
          {isOpen ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
        </button>

        {/* LOGO */}
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
            <div key={sIdx} className="mb-6">
              {isOpen && section.label && !section.isDropdown && (
                <h2 className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 animate-in fade-in">
                  {section.label}
                </h2>
              )}
              <div className="space-y-1.5">
                {section.isDropdown 
                  ? renderNavItem(section, sIdx)
                  : section.items?.map((item, idx) => renderNavItem(item, idx))
                }
              </div>
            </div>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="p-3 mt-auto border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/20">
          {isOpen && (
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-left gap-3 p-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all group"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              <span className="text-sm font-bold tracking-wider">Cerrar Sesión</span>
            </button>
          )}
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
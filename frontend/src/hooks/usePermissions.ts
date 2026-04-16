// src/hooks/usePermissions.ts
import { useAuth } from '../contexts/AuthContext';

type Rol = 'super_admin' | 'admin' | 'suport_n1' | 'suport_n2' | 'ti_n1' | 'ti_n2';

export const usePermissions = () => {
  const { user } = useAuth();
  const userRole = user?.role as Rol;

  // ========== FUNCIONES DE PERMISOS (exactamente igual que en Sidebar) ==========
  
  const canSeeDashboard = () => {
    return ['super_admin', 'admin', 'suport_n1', 'suport_n2'].includes(userRole);
  };

  const canSeeClientes = () => {
    return ['super_admin', 'admin', 'suport_n1', 'suport_n2', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canSeeSuscripciones = () => {
    return ['super_admin', 'admin', 'suport_n2', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canSeeOnboarding = () => {
    return ['super_admin', 'admin', 'suport_n2'].includes(userRole);
  };

  const canSeeOperaciones = () => {
    return ['super_admin', 'admin', 'suport_n1', 'suport_n2', 'ti_n1', 'ti_n2'].includes(userRole);
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
    return ['super_admin', 'admin', 'suport_n2', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canSeePlataforma = () => {
    return ['super_admin', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  const canSeeLogs = () => {
    return ['super_admin', 'ti_n1', 'ti_n2'].includes(userRole);
  };

  // ========== FUNCIÓN PARA OBTENER LA PRIMERA RUTA PERMITIDA ==========
  const getDefaultRoute = () => {
    // Orden de prioridad según el sidebar
    if (canSeeDashboard()) return '/';
    if (canSeeClientes()) return '/clientes';
    if (canSeeOperaciones()) return '/operaciones';
    if (canSeeAuditoria()) return '/auditoria';
    if (canSeePlataforma()) return '/plataforma/procesos';
    return '/perfil'; // Fallback seguro
  };

  // ========== OBTENER TODAS LAS RUTAS PERMITIDAS ==========
  const getAllowedRoutes = (): string[] => {
    const routes: string[] = [];
    
    if (canSeeDashboard()) routes.push('/');
    if (canSeeClientes()) routes.push('/clientes');
    if (canSeeSuscripciones()) routes.push('/suscripciones');
    if (canSeeOnboarding()) routes.push('/onboarding');
    if (canSeeOperaciones()) routes.push('/operaciones');
    if (canSeeContabilidad()) routes.push('/contabilidad');
    if (canSeeConfiguracionComercial()) routes.push('/configuracion/planes');
    if (canSeeConfiguracionGlobal()) routes.push('/configuracion/global');
    if (canSeeUsuarios()) routes.push('/usuarios');
    if (canSeeAuditoria()) routes.push('/auditoria');
    if (canSeePlataforma()) {
      routes.push('/plataforma/procesos');
      routes.push('/plataforma/mantenimiento');
      routes.push('/plataforma/herramientas');
    }
    if (canSeeLogs()) routes.push('/logs');
    routes.push('/perfil'); // Perfil siempre visible
    
    return routes;
  };

  return {
    // Permisos
    canSeeDashboard,
    canSeeClientes,
    canSeeSuscripciones,
    canSeeOnboarding,
    canSeeOperaciones,
    canSeeContabilidad,
    canSeeConfiguracionComercial,
    canSeeConfiguracionGlobal,
    canEditConfiguracionGlobal,
    canSeeSeguridad,
    canSeeUsuarios,
    canSeeAuditoria,
    canSeePlataforma,
    canSeeLogs,
    // Utilidades
    getDefaultRoute,
    getAllowedRoutes,
    userRole
  };
};
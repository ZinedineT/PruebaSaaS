// src/constants/estadosAcceso.ts
export const EstadosAcceso = {
  ACTIVO: 'ACTIVO',
  BLOQUEADO_PAGO: 'BLOQUEADO_PAGO',
  BLOQUEADO_MANUAL: 'BLOQUEADO_MANUAL',
  CORTE_TECNICO: 'CORTE_TECNICO',
  DESACTIVADO: 'DESACTIVADO',
} as const;

export type EstadoAcceso = typeof EstadosAcceso[keyof typeof EstadosAcceso];

// Mapeo para BD (valores en minúscula)
export const EstadoToDB: Record<EstadoAcceso, string> = {
  [EstadosAcceso.ACTIVO]: 'activo',
  [EstadosAcceso.BLOQUEADO_PAGO]: 'bloqueado_pago',
  [EstadosAcceso.BLOQUEADO_MANUAL]: 'bloqueado_manual',
  [EstadosAcceso.CORTE_TECNICO]: 'bloqueado_tecnico',
  [EstadosAcceso.DESACTIVADO]: 'desactivado_baja',
};

// Mapeo para UI (display)
export const EstadoDisplay: Record<EstadoAcceso, string> = {
  [EstadosAcceso.ACTIVO]: 'Activo',
  [EstadosAcceso.BLOQUEADO_PAGO]: 'Bloq. pago',
  [EstadosAcceso.BLOQUEADO_MANUAL]: 'Bloq. manual',
  [EstadosAcceso.CORTE_TECNICO]: 'Corte téc.',
  [EstadosAcceso.DESACTIVADO]: 'Desactivado',
};

// Colores para UI
export const EstadoColors: Record<EstadoAcceso, string> = {
  [EstadosAcceso.ACTIVO]: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
  [EstadosAcceso.BLOQUEADO_PAGO]: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10',
  [EstadosAcceso.BLOQUEADO_MANUAL]: 'text-orange-600 bg-orange-50 dark:bg-orange-500/10',
  [EstadosAcceso.CORTE_TECNICO]: 'text-purple-600 bg-purple-50 dark:bg-purple-500/10',
  [EstadosAcceso.DESACTIVADO]: 'text-gray-600 bg-gray-50 dark:bg-gray-500/10',
};

// Iconos para UI
export const EstadoIcons = {
  [EstadosAcceso.ACTIVO]: 'Unlock',
  [EstadosAcceso.BLOQUEADO_PAGO]: 'CreditCard',
  [EstadosAcceso.BLOQUEADO_MANUAL]: 'Lock',
  [EstadosAcceso.CORTE_TECNICO]: 'Settings',
  [EstadosAcceso.DESACTIVADO]: 'Ban',
};
// src/services/registradosService.ts
import apiService from './apiService';
import { API_ROUTES } from '../config/apiRoutes';  // 👈 Importar las rutas

// Interfaz 100% fiel a lo que devuelve la API
export interface RegistradoAPI {
  id: string;
  code_registro: string;
  code_cliente: string | null;
  ruc: string;
  razon_social: string;
  nombre_comercial: string;
  direccion_fiscal: string;
  subdominio: string;
  alias: string;
  nombre_contacto: string;
  telefono_contacto: string;
  correo_contacto: string;
  password_contacto: string;
  cargo_contacto: string;
  plan_id: number;
  subscripcion_id: number | null;
  ciclo: string;
  precio_plan: string;
  estado_pago: string;
  acceso: string;
  status: string;
  cliente_estado: string;
  onboarding_estado: string;
  suscripcion_estado: string;
  acceso_estado: string;
  bd_creada: number;
  bd_fecha_creacion: string | null;
  bd_creada_por: string | null;
  n_operacion_voucher: string | null;
  observaciones: string | null;
  metodo_pago_id: number;
  banco_id: number | null;
  billetera_id: number | null;
  fecha_registro: string;
  fecha_actualizacion: string | null;
  fecha_eliminacion: string | null;
  fecha_pago: string | null;
  fecha_vencimiento_plan: string | null;
  fecha_verificacion_admin: string | null;
  fecha_activacion: string | null;
  verificado_por: string | null;
  create_admin: string;
  deleted: boolean;
  deleted_at: string | null;
  restore_at: string | null;
  locked: number;
  locked_users: number;
  locked_tenant: number;
  locked_emission: number;
  locked_emission_sale_note: number;
  locked_limit_products: number;
  modules: string;
  module_levels: string;
  restrict_sales_limit: number;
  locked_create_establishments: number;
  enable_list_product: number;
  enable_export_accounting_software: number;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_password: string;
  smtp_encryption: string;
  start_billing_cycle: string;
  created_at: string;
  updated_at: string;
  plan: {
    id: number;
    name: string;
    pricing: number;
    limit_users: number;
    limit_documents: number;
    include_sale_notes_limit_documents: boolean;
    plan_documents: Array<{ id: number; description: string }>;
    plan_documents_description: string;
    locked: boolean;
    include_sale_notes_sales_limit: boolean;
    sales_limit: number;
    sales_unlimited: boolean;
    establishments_limit: number;
    establishments_unlimited: boolean;
    limit_sale_notes: number;
    modules: {
      modules_base: number[];
      levels_base: number[];
    };
    limit_products: number;
    enable_export_accounting_software: boolean;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    created_by: {
      id: number;
      name: string;
      email: string;
    };
  };
  subscripcion: any | null;
  banco: any | null;
  billetera: any | null;
}
// Interface para el historial
export interface HistorialRegistrado {
  id: string;
  fecha: string;
  accion: string;
  usuario: string;
  tipo: string;
  descripcion: string;
}
// Interface para la respuesta completa con historial
export interface RegistradoWithHistory {
  id: string;
  nombre: string;
  ruc: string;
  nombreComercial: string;
  alias: string;
  subdominio: string;
  codigoInterno: string;
  codigoCliente: string;
  direccionFiscal: string;
  cargoContacto: string;
  montoPlan: string;
  moneda: string;
  historial: HistorialRegistrado[];
  estado: string;
  estadoPago: string;
  plan: string;
  fechaRegistro: string;
  fechaPago: string;
  fechaVencimientoPlan: string;
  contactoPrincipal: string;
  telefono: string;
  email: string;
  observaciones: string;
  n_operacion_voucher: string;
  metodo_pago_id: number;
  banco_id: number;
  verificado_por: string | null;
  fecha_verificacion: string | null;
}

// Servicio usando API_ROUTES
export const getRegistrados = async (): Promise<RegistradoAPI[]> => {
  try {
    const response = await apiService.get(API_ROUTES.REGISTRADOS.BASE);  // 👈 Usando la ruta
    
    if (response.data.success && response.data.data) {
      const registradosData = response.data.data.data || response.data.data;
      
      if (Array.isArray(registradosData)) {
        return registradosData;
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error al obtener registrados:', error);
    return [];
  }
};

// Bonus: función para obtener un registrado por ID
export const getRegistradoById = async (id: number): Promise<RegistradoAPI | null> => {
  try {
    const response = await apiService.get(API_ROUTES.REGISTRADOS.DETAIL(id));
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener registrado ${id}:`, error);
    return null;
  }
};

// Servicio para obtener registrado con historial
export const getRegistradoWithHistory = async (id: number): Promise<RegistradoWithHistory | null> => {
  try {
    const response = await apiService.get(API_ROUTES.REGISTRADOS.WITH_HISTORY(id));
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener historial del registrado ${id}:`, error);
    return null;
  }
};
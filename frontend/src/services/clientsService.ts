// src/services/clientsService.ts
import apiService from './apiService';
import { API_ROUTES } from '../config/apiRoutes';

// Interfaz actualizada con los campos reales de la API
export interface ClientAPI {
  id: number;
  code_cliente: string;
  ruc: string;
  name: string;
  nombre_comercial: string;        // ✅ NUEVO
  alias: string;                    // ✅ NUEVO
  subdominio: string;               // ✅ NUEVO
  direccion_fiscal: string;         // ✅ NUEVO
  nombre_contacto: string;          // ✅ NUEVO
  telefono_contacto: string;        // ✅ NUEVO
  cargo_contacto: string;           // ✅ NUEVO
  email: string;
  hostname_id: number;
  plan_id: number;
  subscripcion_id: number | null;
  precio_plan: string;              // ✅ NUEVO
  ciclo: string;                    // ✅ NUEVO
  locked: boolean;
  locked_users: boolean;
  locked_tenant: boolean;
  locked_emission: boolean;
  locked_emission_sale_note: boolean;
  locked_limit_products: boolean;
  restrict_sales_limit: boolean;
  locked_create_establishments: boolean;
  enable_list_product: boolean;
  enable_export_accounting_software: boolean;
  start_billing_cycle: string;
  status: string;
  cliente_estado: string;
  suscripcion_estado: string;
  acceso_estado: string;
  onboarding_estado: string;        // ✅ NUEVO
  fecha_vencimiento_plan: string | null;
  fecha_activacion: string | null;
  n_operacion_voucher: string | null;  // ✅ NUEVO
  observaciones: string | null;         // ✅ NUEVO
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  plan: {
    id: number;
    name: string;
    pricing: number;
  };
  subscripcion: {
    id: number;
    name: string;
    pricing: string;
    ciclo: string;
  } | null;
  hostname: {
    id: number;
    fqdn: string;
  };
  created_by: {
    id: number;
    name: string;
    email: string;
  };
}

// Obtener todos los clientes
export const getClients = async (): Promise<ClientAPI[]> => {
  try {
    const response = await apiService.get('/clients');
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return [];
  }
};

// Obtener clientes activos (o todos)
export const getActiveClients = async (): Promise<ClientAPI[]> => {
  try {
    const response = await apiService.get('/clients?status=active');
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error al obtener clientes activos:', error);
    return [];
  }
};
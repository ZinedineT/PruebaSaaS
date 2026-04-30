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
// Interfaz para respuesta de pagos
export interface PagosResponse {
  ultimo_pago: {
    fecha: string;
    monto: string;
    voucher: string;
    metodo_pago: string;
    banco: string;
    billetera: string | null;
    fecha_vencimiento: string;
  } | null;
  proximo_vencimiento: string;
  dias_restantes: number;
  periodo_adeudado: string | null;
  estado_acceso: string;
  plan_nombre: string;
  precio_plan: string;
  ciclo: string;
}

// Obtener todos los clientes
export const getClients = async (): Promise<ClientAPI[]> => {
  try {
    const response = await apiService.get(API_ROUTES.CLIENTS.ALL);
    
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
    const response = await apiService.get(API_ROUTES.CLIENTS.ACTIVE);
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error al obtener clientes activos:', error);
    return [];
  }
};
// Obtener información de pagos del cliente
export const getPagosCliente = async (id: number): Promise<PagosResponse | null> => {
  try {
    const response = await apiService.get(API_ROUTES.CLIENTS.PAGOS(id));
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener pagos del cliente ${id}:`, error);
    return null;
  }
};

// Confirmar pago
export const confirmarPago = async (id: number, body: {
  n_operacion_voucher: string;
  motivo: string;
  monto: number;
}): Promise<any> => {
  try {
    const response = await apiService.patch(API_ROUTES.CLIENTS.CONFIRMAR_PAGO(id), body);
    return response.data;
  } catch (error) {
    console.error(`Error al confirmar pago del cliente ${id}:`, error);
    throw error;
  }
};

// Dar prórroga
export const darProrroga = async (id: number, body: {
  dias_prorroga: number;
  motivo: string;
}): Promise<any> => {
  try {
    const response = await apiService.patch(API_ROUTES.CLIENTS.DAR_PRORROGA(id), body);
    return response.data;
  } catch (error) {
    console.error(`Error al dar prórroga al cliente ${id}:`, error);
    throw error;
  }
};

// Bloqueo manual
export const bloqueoManual = async (id: number, body: { motivo: string }): Promise<any> => {
  try {
    console.log('🔒 Bloqueo manual - Cliente ID:', id);
    console.log('🔒 Body enviado:', JSON.stringify(body, null, 2));
    
    const response = await apiService.patch(API_ROUTES.CLIENTS.BLOQUEO_MANUAL(id), body);
    return response.data;
  } catch (error: any) {
    // Muestra el mensaje de error del backend
    const errorMessage = error.response?.data?.message || error.response?.data?.errors || error.message;
    console.error('❌ Error detallado del backend:', errorMessage);
    console.error('❌ Respuesta completa:', error.response?.data);
    throw error;
  }
};
// Bloqueo por pago
export const bloqueoPago = async (id: number, body: { 
  motivo: string; 
  periodo_adeudado: string;
}): Promise<any> => {
  try {
    console.log('💳 Bloqueo por pago - Cliente ID:', id);
    console.log('💳 Body enviado:', body);
    
    const response = await apiService.patch(API_ROUTES.CLIENTS.BLOQUEO_PAGO(id), body);
    console.log('✅ Respuesta:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al bloquear por pago:', error.response?.data);
    throw error;
  }
};
// Corte técnico
export const corteTecnico = async (id: number, body: {
  motivo: string;
  fecha_restauracion: string;
}): Promise<any> => {
  try {
    const response = await apiService.patch(API_ROUTES.CLIENTS.CORTE_TECNICO(id), body);
    return response.data;
  } catch (error) {
    console.error(`Error al aplicar corte técnico al cliente ${id}:`, error);
    throw error;
  }
};

// Restablecer acceso (para casos donde estaba bloqueado y se quiere activar)
export const restablecerAcceso = async (id: number, body: { motivo: string }): Promise<any> => {
  try {
    const response = await apiService.patch(API_ROUTES.CLIENTS.RESTABLECER_ACCESO(id), body);
    return response.data;
  } catch (error) {
    console.error(`Error al restablecer acceso del cliente ${id}:`, error);
    throw error;
  }
};
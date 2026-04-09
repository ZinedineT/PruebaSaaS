// D:\proyecto_prueba\frontend\src\types\usuario.types.ts

// Roles disponibles en la API
export type UserRole = 'admin' | 'suport_n1' | 'suport_n2' | 'super_admin' | 'ti_n1' | 'ti_n2';

// Usuario según API
export interface UsuarioAPI {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  deleted_at?: string | null;
}

// Usuario transformado para tu UI (mantiene compatibilidad)
export interface UsuarioUI {
  id: number;
  nombre: string;        // mapeado de name
  email: string;
  telefono: string;      // mapeado de phone
  rol: string;           // mapeado de role (con transformación visual)
  estado: 'activo' | 'inactivo';  // mapeado de is_active
  ultimoLogin: string;   // mapeado de last_login
  deleted_at?: string | null;
}

// DTO para crear usuario
export interface CrearUsuarioDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}

// DTO para actualizar usuario
export interface ActualizarUsuarioDTO {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: UserRole;
  is_active?: boolean;
}

// DTO para cambiar solo contraseña
export interface CambiarPasswordDTO {
  password: string;
}

// Respuesta genérica de la API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

// Respuesta de lista de usuarios
export interface UsuariosListResponse extends ApiResponse {
  data: UsuarioAPI[];
}

// Respuesta de usuario individual
export interface UsuarioResponse extends ApiResponse {
  data: UsuarioAPI;
}
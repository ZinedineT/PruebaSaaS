// src/types/auth.types.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

// Estructura del usuario según el backend
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean;
  last_login?: string;
  created_at?: string;
}

// Estructura de la respuesta de login
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Estructura de la respuesta de /me
export interface MeResponse {
  success: boolean;
  data: User;
}

// Estado de autenticación para el contexto
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Mantén AuthResponse por compatibilidad si lo usas en otros lugares
export interface AuthResponse {
  user: User;
  token: string;
}
// D:\proyecto_prueba\frontend\src\services\profileService.ts
import apiService from './apiService';
import { API_ROUTES } from '../config/apiRoutes';

// Tipos para las respuestas
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean;
  last_login?: string;
  created_at?: string;
  permissions?: any;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
}

interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export const profileService = {
  // Obtener perfil del usuario
  getProfile: () => 
    apiService.get<ApiResponse<UserProfile>>(API_ROUTES.PROFILE.BASE),
  
  // Actualizar perfil
  updateProfile: (data: UpdateProfileData) =>
    apiService.put<ApiResponse<UserProfile>>(API_ROUTES.PROFILE.UPDATE, data),
  
  // Cambiar contraseña
  changePassword: (data: ChangePasswordData) =>
    apiService.put<ApiResponse<null>>(API_ROUTES.PROFILE.CHANGE_PASSWORD, data),
  
  // Regenerar token (opcional)
  regenerateToken: () =>
    apiService.post<ApiResponse<{ token: string }>>(API_ROUTES.PROFILE.REGENERATE_TOKEN),
};
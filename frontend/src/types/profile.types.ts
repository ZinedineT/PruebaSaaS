// D:\proyecto_prueba\frontend\src\types/profile.types.ts

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean;
  last_login?: string;
  created_at?: string;
  permissions?: string[];
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
  data: UserProfile;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}
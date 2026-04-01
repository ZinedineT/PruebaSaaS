// D:\proyecto_prueba\frontend\src\services\profileService.ts
import apiService from './apiService';
import { API_ROUTES } from '../config/apiRoutes';

export const profileService = {
  updateProfile: (data: { name: string; email: string }) =>
    apiService.put(API_ROUTES.PROFILE.UPDATE, data),
  
  changePassword: (data: { current_password: string; new_password: string; new_password_confirmation: string }) =>
    apiService.post(API_ROUTES.PROFILE.CHANGE_PASSWORD, data),
};
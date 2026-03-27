// src/services/profileService.ts
import apiService from './apiService';

export const profileService = {
  updateProfile: (data: { name: string; email: string }) =>
    apiService.put('/auth/profile', data),
  
  changePassword: (data: { current_password: string; new_password: string; new_password_confirmation: string }) =>
    apiService.post('/auth/change-password', data),
};
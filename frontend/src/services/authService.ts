// D:\proyecto_prueba\frontend\src\services\authService.ts
import apiService from './apiService';
import { LoginCredentials, LoginResponse, MeResponse } from '../types/auth.types';
import { API_ROUTES } from '../config/apiRoutes';

export const authService = {
  login: (credentials: LoginCredentials) => 
    apiService.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, credentials),
  
  logout: () => 
    apiService.post(API_ROUTES.AUTH.LOGOUT),
  
  me: () => 
    apiService.get<MeResponse>(API_ROUTES.AUTH.ME),
  
  setToken: (token: string) => {
    localStorage.setItem('token', token);
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  
  getToken: () => localStorage.getItem('token'),
  
  removeToken: () => {
    localStorage.removeItem('token');
    delete apiService.defaults.headers.common['Authorization'];
  },
  
  initAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};
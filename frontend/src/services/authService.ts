// src/services/authService.ts
import apiService from './apiService';
import { LoginCredentials, AuthResponse } from '../types/auth.types';

export const authService = {
  login: (credentials: LoginCredentials) => 
    apiService.post<AuthResponse>('/auth/login', credentials),
  
  logout: () => 
    apiService.post('/auth/logout'),
  
  me: () => 
    apiService.get('/auth/me'),
  
  // Guardar token en localStorage
  setToken: (token: string) => {
    localStorage.setItem('token', token);
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  
  // Obtener token
  getToken: () => localStorage.getItem('token'),
  
  // Eliminar token
  removeToken: () => {
    localStorage.removeItem('token');
    delete apiService.defaults.headers.common['Authorization'];
  },
  
  // Configurar token inicial (al cargar app)
  initAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};
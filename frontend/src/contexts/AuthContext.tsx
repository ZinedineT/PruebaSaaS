// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import { AuthState, LoginCredentials } from '../types/auth.types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: AuthState['user']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authService.login(credentials);
      
      // Extraer datos de la estructura correcta
      const { user, token } = response.data.data;
      
      // Guardar token
      authService.setToken(token);
      
      setState({
        user: user,
        token: token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      authService.removeToken();
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: error.response?.data?.message || 'Error al iniciar sesión',
      });
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authService.removeToken();
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    }
  };
  
  const setUser = (user: AuthState['user']) => {
    setState(prev => ({ ...prev, user }));
  };

  useEffect(() => {
    const initAuth = async () => {
      authService.initAuth();
      const token = authService.getToken();
      
      if (!token) {
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const response = await authService.me();
        // Extraer usuario de la estructura correcta
        const user = response.data.data.user;
        
        setState({
          user: user,
          token: token,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error al validar token:', error);
        authService.removeToken();
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
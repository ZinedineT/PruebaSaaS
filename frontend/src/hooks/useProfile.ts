// src/hooks/useProfile.ts
import { useState } from 'react';
import { profileService } from '../services/profileService';
import { useAuth } from '../contexts/AuthContext';
import { UpdateProfileData, ChangePasswordData } from '../types/profile.types';

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { user, setUser } = useAuth();

  const updateProfile = async (data: UpdateProfileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileService.updateProfile(data);
      
      if (response.data.success) {
        setUser(response.data.data);
        setMessage({ type: 'success', text: response.data.message || 'Perfil actualizado correctamente' });
        return { success: true, data: response.data.data };
      }
      return { success: false };
    } catch (error: any) {
      console.error('Error al actualizar perfil:', error);
      
      let errorText = 'Error al actualizar el perfil';
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0] as string[];
        errorText = firstError?.[0] || 'Error de validación';
      } else if (error.response?.data?.message) {
        errorText = error.response.data.message;
      }
      
      setError(errorText);
      setMessage({ type: 'error', text: errorText });
      return { success: false, error: errorText };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileService.changePassword(data);
      
      if (response.data.success) {
        setMessage({ type: 'success', text: response.data.message || 'Contraseña cambiada exitosamente' });
        return { success: true };
      }
      return { success: false };
    } catch (error: any) {
      console.error('Error al cambiar contraseña:', error);
      
      let errorText = 'Error al cambiar la contraseña';
      if (error.response?.status === 401) {
        errorText = 'Contraseña actual incorrecta';
      } else if (error.response?.status === 422 && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0] as string[];
        errorText = firstError?.[0] || 'Error de validación';
      } else if (error.response?.data?.message) {
        errorText = error.response.data.message;
      }
      
      setError(errorText);
      setMessage({ type: 'error', text: errorText });
      return { success: false, error: errorText };
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    setLoading(true);
    try {
      const response = await profileService.getProfile();
      if (response.data.success) {
        setUser(response.data.data);
        return { success: true, data: response.data.data };
      }
      return { success: false };
    } catch (error) {
      console.error('Error al refrescar perfil:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessage(null);
    setError(null);
  };

  return {
    user,
    loading,
    error,
    message,
    updateProfile,
    changePassword,
    refreshProfile,
    clearMessages,
  };
};
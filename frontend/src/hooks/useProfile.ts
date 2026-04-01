// D:\proyecto_prueba\frontend\src\hooks\useProfile.ts
import { useState } from 'react';
import { profileService } from '../services/profileService';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile, UpdateProfileData, ChangePasswordData } from '../types/profile.types';

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuth();

  const updateProfile = async (data: UpdateProfileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileService.updateProfile(data);
      
      // Actualizar usuario en el contexto
      if (response.data.success && response.data.data) {
        setUser(response.data.data);
      }
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al actualizar perfil';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileService.changePassword(data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al cambiar contraseña';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    setLoading(true);
    try {
      const response = await profileService.getProfile();
      if (response.data.success && response.data.data) {
        setUser(response.data.data);
      }
      return response.data;
    } catch (error) {
      console.error('Error al refrescar perfil:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    updateProfile,
    changePassword,
    refreshProfile,
  };
};
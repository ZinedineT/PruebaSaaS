// D:\proyecto_prueba\frontend\src\services\usuarioService.ts
import apiService from './apiService';
import { API_ROUTES } from '../config/apiRoutes';
import {
  UsuarioAPI,
  CrearUsuarioDTO,
  ActualizarUsuarioDTO,
  CambiarPasswordDTO,
  ApiResponse,
  UsuariosListResponse,
  UsuarioResponse,
} from '../types/usuario.types';

// Obtener token del localStorage (ajusta según donde guardes el token)
const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  return token;
};

// Configurar headers con token
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`,
});

class UsuarioService {
  // 1. Obtener usuarios ACTIVOS
  async getActiveUsers(): Promise<UsuarioAPI[]> {
    const response = await apiService.get<UsuariosListResponse>(
      API_ROUTES.USERS.BASE,
      { headers: getAuthHeaders() }
    );
    return response.data.data || [];
  }

  // 2. Obtener TODOS los usuarios (activos e inactivos)
  async getAllUsers(): Promise<UsuarioAPI[]> {
    const response = await apiService.get<UsuariosListResponse>(
      API_ROUTES.USERS.ALL,
      { headers: getAuthHeaders() }
    );
    return response.data.data || [];
  }

  // 3. Obtener usuarios ELIMINADOS (papelera)
  async getTrashedUsers(): Promise<UsuarioAPI[]> {
    const response = await apiService.get<UsuariosListResponse>(
      API_ROUTES.USERS.TRASHED,
      { headers: getAuthHeaders() }
    );
    return response.data.data || [];
  }

  // 4. Crear usuario
  async createUser(userData: CrearUsuarioDTO): Promise<UsuarioAPI> {
    const response = await apiService.post<UsuarioResponse>(
      API_ROUTES.USERS.BASE,
      userData,
      { headers: getAuthHeaders() }
    );
    return response.data.data!;
  }

  // 5. Actualizar usuario
  async updateUser(id: number, userData: ActualizarUsuarioDTO): Promise<UsuarioAPI> {
    const response = await apiService.put<UsuarioResponse>(
      API_ROUTES.USERS.DETAIL(id),
      userData,
      { headers: getAuthHeaders() }
    );
    return response.data.data!;
  }

  // 6. Cambiar solo contraseña
  async changePassword(id: number, passwordData: CambiarPasswordDTO): Promise<void> {
    await apiService.put<ApiResponse>(
      API_ROUTES.USERS.CHANGE_PASSWORD(id),
      passwordData,
      { headers: getAuthHeaders() }
    );
  }

  // 7. Soft delete (mover a papelera)
  async softDeleteUser(id: number): Promise<void> {
    await apiService.delete<ApiResponse>(
      API_ROUTES.USERS.DETAIL(id),
      { headers: getAuthHeaders() }
    );
  }

  // 8. Restaurar usuario
  async restoreUser(id: number): Promise<UsuarioAPI> {
    const response = await apiService.post<UsuarioResponse>(
      API_ROUTES.USERS.RESTORE(id),
      {},
      { headers: getAuthHeaders() }
    );
    return response.data.data!;
  }

  // 9. Hard delete (eliminar permanentemente) - DELETE
  async hardDeleteUser(id: number): Promise<void> {
    await apiService.delete<ApiResponse>(
      API_ROUTES.USERS.FORCE(id),
      { headers: getAuthHeaders() }
    );
  }
}

export default new UsuarioService();
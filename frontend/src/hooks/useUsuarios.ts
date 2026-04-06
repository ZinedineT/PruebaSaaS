// D:\proyecto_prueba\frontend\src\hooks\useUsuarios.ts
import { useState, useEffect, useCallback } from 'react';
import usuarioService from '../services/usuarioService';
import { UsuarioAPI, UsuarioUI, CrearUsuarioDTO, ActualizarUsuarioDTO, UserRole } from '../types/usuario.types';

// Helper: Transformar API -> UI
const transformToUI = (apiUser: UsuarioAPI): UsuarioUI => ({
  id: apiUser.id,
  nombre: apiUser.name,
  email: apiUser.email,
  telefono: apiUser.phone,
  rol: apiUser.role,
  estado: apiUser.is_active ? 'activo' : 'inactivo',
  ultimoLogin: apiUser.last_login || 'Nunca',
  deleted_at: apiUser.deleted_at,
});

// Helper: Transformar UI -> API (para crear/actualizar)
const transformToAPI = (uiUser: Omit<UsuarioUI, 'id' | 'ultimoLogin' | 'deleted_at'>, password?: string): CrearUsuarioDTO | ActualizarUsuarioDTO => {
  const data: any = {
    name: uiUser.nombre,
    email: uiUser.email,
    phone: uiUser.telefono,
    role: uiUser.rol as UserRole,
    is_active: uiUser.estado === 'activo',
  };
  if (password) {
    data.password = password;
  }
  return data;
};

export const useUsuarios = () => {
  const [usuariosActivos, setUsuariosActivos] = useState<UsuarioUI[]>([]);
  const [usuariosInactivos, setUsuariosInactivos] = useState<UsuarioUI[]>([]);
  const [usuariosEliminados, setUsuariosEliminados] = useState<UsuarioUI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar todos los usuarios (separar activos/inactivos)
  const loadAllUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allUsers = await usuarioService.getAllUsers();
      const activos = allUsers.filter(u => u.is_active && !u.deleted_at).map(transformToUI);
      const inactivos = allUsers.filter(u => !u.is_active && !u.deleted_at).map(transformToUI);
      setUsuariosActivos(activos);
      setUsuariosInactivos(inactivos);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  // Cargar usuarios eliminados
  const loadTrashedUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const trashed = await usuarioService.getTrashedUsers();
      setUsuariosEliminados(trashed.map(transformToUI));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar papelera');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear usuario
  const crearUsuario = async (usuarioData: Omit<UsuarioUI, 'id' | 'ultimoLogin' | 'deleted_at'>, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await usuarioService.createUser({
        name: usuarioData.nombre,
        email: usuarioData.email,
        password: password,
        phone: usuarioData.telefono,
        role: usuarioData.rol as UserRole,
      });
      
      const newUIUser = transformToUI(newUser);
      
      if (newUser.is_active) {
        setUsuariosActivos(prev => [...prev, newUIUser]);
      } else {
        setUsuariosInactivos(prev => [...prev, newUIUser]);
      }
      
      return newUIUser;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar usuario
  const actualizarUsuario = async (id: number, usuarioData: Partial<Omit<UsuarioUI, 'id' | 'ultimoLogin' | 'deleted_at'>>, password?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. Si hay contraseña nueva, usar el endpoint ESPECÍFICO de contraseña
      if (password) {
        console.log("🔐 Cambiando contraseña vía endpoint específico: /users/" + id + "/password");
        await usuarioService.changePassword(id, { password });
      }
      
      // 2. Preparar datos para actualizar perfil (EXCLUYENDO la contraseña)
      const updateData: any = {};
      
      if (usuarioData.nombre !== undefined) updateData.name = usuarioData.nombre;
      if (usuarioData.email !== undefined) updateData.email = usuarioData.email;
      if (usuarioData.telefono !== undefined) updateData.phone = usuarioData.telefono;
      if (usuarioData.rol !== undefined) updateData.role = usuarioData.rol;
      if (usuarioData.estado !== undefined) {
        updateData.is_active = usuarioData.estado === 'activo';
      }
      
      // 3. Actualizar perfil (NO incluir password aquí)
      let updatedUser;
      if (Object.keys(updateData).length > 0) {
        console.log("📝 Actualizando perfil vía endpoint general:", updateData);
        updatedUser = await usuarioService.updateUser(id, updateData);
      } else {
        // Si solo se cambió la contraseña, obtener el usuario actualizado
        console.log("📋 Solo cambio de contraseña, recargando usuario...");
        const allUsers = await usuarioService.getAllUsers();
        updatedUser = allUsers.find(u => u.id === id);
      }
      
      if (!updatedUser) {
        throw new Error("No se encontró el usuario después de la actualización");
      }
      
      const updatedUIUser = transformToUI(updatedUser);
      
      // Remover de todas las listas
      setUsuariosActivos(prev => prev.filter(u => u.id !== id));
      setUsuariosInactivos(prev => prev.filter(u => u.id !== id));
      setUsuariosEliminados(prev => prev.filter(u => u.id !== id));
      
      // Agregar a la lista correspondiente (si no está eliminado)
      if (!updatedUIUser.deleted_at) {
        if (updatedUIUser.estado === 'activo') {
          setUsuariosActivos(prev => [...prev, updatedUIUser]);
        } else {
          setUsuariosInactivos(prev => [...prev, updatedUIUser]);
        }
      } else {
        setUsuariosEliminados(prev => [...prev, updatedUIUser]);
      }
      
      console.log("✅ Usuario actualizado correctamente");
      return updatedUIUser;
    } catch (err: any) {
      console.error("❌ Error en actualizarUsuario:", err);
      setError(err.response?.data?.message || 'Error al actualizar usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cambiar solo contraseña
  const cambiarPassword = async (id: number, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await usuarioService.changePassword(id, { password });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cambiar contraseña');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reemplaza eliminarUsuario por esta:
  const eliminarUsuario = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await usuarioService.softDeleteUser(id);
      
      // Buscar el usuario en activos o inactivos
      let usuarioEliminado = [...usuariosActivos, ...usuariosInactivos].find(u => u.id === id);
      
      if (usuarioEliminado) {
        // Remover de activos o inactivos
        setUsuariosActivos(prev => prev.filter(u => u.id !== id));
        setUsuariosInactivos(prev => prev.filter(u => u.id !== id));
        
        // Crear una copia completa del usuario con deleted_at
        const usuarioParaEliminados: UsuarioUI = {
          id: usuarioEliminado.id,
          nombre: usuarioEliminado.nombre,
          email: usuarioEliminado.email,
          telefono: usuarioEliminado.telefono,
          rol: usuarioEliminado.rol,
          estado: usuarioEliminado.estado,
          ultimoLogin: usuarioEliminado.ultimoLogin,
          deleted_at: new Date().toISOString()
        };
        
        // Agregar a eliminados
        setUsuariosEliminados(prev => [...prev, usuarioParaEliminados]);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Restaurar usuario
  const restaurarUsuario = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const restoredUser = await usuarioService.restoreUser(id);
      const restoredUIUser = transformToUI(restoredUser);
      
      // Remover de eliminados
      setUsuariosEliminados(prev => prev.filter(u => u.id !== id));
      
      // Agregar a activos o inactivos según su estado
      if (restoredUIUser.estado === 'activo') {
        setUsuariosActivos(prev => [...prev, restoredUIUser]);
      } else {
        setUsuariosInactivos(prev => [...prev, restoredUIUser]);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al restaurar usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Hard delete (eliminar permanentemente)
  const eliminarPermanentemente = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await usuarioService.hardDeleteUser(id);
      setUsuariosEliminados(prev => prev.filter(u => u.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar permanentemente');
      throw err;
    } finally {
      setLoading(false);
    }
  };

// Cambiar estado (activar/suspender)
  const toggleEstado = async (id: number, estadoActual: 'activo' | 'inactivo') => {
    const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';
    
    setLoading(true);
    setError(null);
    
    try {
      // 1. Actualizar en la API
      const updatedUser = await usuarioService.updateUser(id, { 
        is_active: nuevoEstado === 'activo' 
      });
      
      const updatedUIUser = transformToUI(updatedUser);
      
      // 2. Mover entre listas
      if (nuevoEstado === 'activo') {
        // Si se activa: mover de inactivos a activos
        setUsuariosInactivos(prev => prev.filter(u => u.id !== id));
        setUsuariosActivos(prev => [...prev, updatedUIUser]);
      } else {
        // Si se suspende: mover de activos a inactivos
        setUsuariosActivos(prev => prev.filter(u => u.id !== id));
        setUsuariosInactivos(prev => [...prev, updatedUIUser]);
      }
      
      return updatedUIUser;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cambiar estado del usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Efecto inicial
  useEffect(() => {
    loadAllUsers();
    loadTrashedUsers();
  }, [loadAllUsers, loadTrashedUsers]);

  return {
    // Datos
    usuariosActivos,
    usuariosInactivos,
    usuariosEliminados,
    loading,
    error,
    // Acciones
    crearUsuario,
    actualizarUsuario,
    cambiarPassword,
    eliminarUsuario,
    restaurarUsuario,
    eliminarPermanentemente,
    toggleEstado,
    recargar: () => {
      loadAllUsers();
      loadTrashedUsers();
    },
  };
};
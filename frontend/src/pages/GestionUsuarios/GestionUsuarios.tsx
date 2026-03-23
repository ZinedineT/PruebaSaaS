import React, { useState } from 'react';
import { 
  PencilIcon, 
  UserMinusIcon, 
  TrashIcon, 
  ArrowPathIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import UsuarioModal from '../../components/UsuarioModal/UsuarioModal';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  ultimoLogin: string;
  cargo?: string;
}

// Datos de ejemplo
const usuariosData: Usuario[] = [
  { id: 1, nombre: 'Ana Martínez (Gerente)', email: 'ana@empresa.com', telefono: '987654321', rol: 'admin', estado: 'activo', ultimoLogin: '2024-03-20 09:30:00', cargo: 'Gerente General' },
  { id: 2, nombre: 'Carlos López', email: 'carlos@empresa.com', telefono: '987654322', rol: 'supervisor', estado: 'activo', ultimoLogin: '2024-03-19 15:45:00', cargo: 'Supervisor Ventas' },
  { id: 3, nombre: 'María Fernández', email: 'maria@empresa.com', telefono: '987654323', rol: 'usuario', estado: 'activo', ultimoLogin: '2024-03-20 11:20:00', cargo: 'Asistente' },
  { id: 4, nombre: 'José Ramírez', email: 'jose@empresa.com', telefono: '987654324', rol: 'usuario', estado: 'inactivo', ultimoLogin: '2024-03-15 08:00:00', cargo: 'Vendedor' },
  { id: 5, nombre: 'Laura Torres', email: 'laura@empresa.com', telefono: '987654325', rol: 'contador', estado: 'activo', ultimoLogin: '2024-03-20 08:45:00', cargo: 'Contadora' },
  { id: 6, nombre: 'Roberto Díaz', email: 'roberto@empresa.com', telefono: '987654326', rol: 'usuario', estado: 'inactivo', ultimoLogin: '2024-03-10 14:20:00', cargo: 'Vendedor' },
];

const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosData);
  const [usuariosEliminados, setUsuariosEliminados] = useState<Usuario[]>([]);
  const [tabActiva, setTabActiva] = useState<'activos' | 'eliminados' | 'todos'>('activos');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar usuarios según la pestaña activa y búsqueda
  const getUsuariosFiltrados = () => {
    let baseUsuarios: Usuario[] = [];
    
    if (tabActiva === 'activos') {
      baseUsuarios = usuarios.filter(u => u.estado === 'activo');
    } else if (tabActiva === 'eliminados') {
      baseUsuarios = usuariosEliminados;
    } else {
      baseUsuarios = [...usuarios, ...usuariosEliminados];
    }

    if (searchTerm) {
      return baseUsuarios.filter(u => 
        u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.telefono.includes(searchTerm)
      );
    }
    return baseUsuarios;
  };

  const usuariosFiltrados = getUsuariosFiltrados();

  // Función para eliminar (enviar a papelera)
  const handleEliminar = (usuario: Usuario) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${usuario.nombre}?`)) {
      setUsuarios(usuarios.filter(u => u.id !== usuario.id));
      setUsuariosEliminados([...usuariosEliminados, { ...usuario, estado: 'inactivo' }]);
    }
  };

  // Función para restaurar desde papelera
  const handleRestaurar = (usuario: Usuario) => {
    setUsuariosEliminados(usuariosEliminados.filter(u => u.id !== usuario.id));
    setUsuarios([...usuarios, { ...usuario, estado: 'activo' }]);
  };

  // Función para suspender/bloquear
  const handleSuspender = (usuario: Usuario) => {
    if (usuario.estado === 'activo') {
      setUsuarios(usuarios.map(u => 
        u.id === usuario.id ? { ...u, estado: 'inactivo' } : u
      ));
    } else {
      setUsuarios(usuarios.map(u => 
        u.id === usuario.id ? { ...u, estado: 'activo' } : u
      ));
    }
  };

  // Función para crear/editar usuario
  const handleGuardarUsuario = (usuarioData: Omit<Usuario, 'id' | 'ultimoLogin'>) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    if (modalMode === 'create') {
      const nuevoUsuario: Usuario = {
        id: Math.max(...usuarios.map(u => u.id), 0) + 1,
        ...usuarioData,
        ultimoLogin: now,
      };
      setUsuarios([...usuarios, nuevoUsuario]);
    } else if (modalMode === 'edit' && usuarioEditando) {
      setUsuarios(usuarios.map(u => 
        u.id === usuarioEditando.id 
          ? { ...u, ...usuarioData, ultimoLogin: now }
          : u
      ));
    }
  };

  // Abrir modal para editar
  const handleEditar = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setModalMode('edit');
    setModalOpen(true);
  };

  // Abrir modal para crear
  const handleNuevoUsuario = () => {
    setUsuarioEditando(null);
    setModalMode('create');
    setModalOpen(true);
  };

  // Obtener color del rol
  const getRolColor = (rol: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      supervisor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      usuario: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      contador: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      vendedor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return colors[rol] || colors.usuario;
  };

  // Obtener texto del rol
  const getRolTexto = (rol: string) => {
    const textos: Record<string, string> = {
      admin: 'Administrador',
      supervisor: 'Supervisor',
      usuario: 'Usuario',
      contador: 'Contador',
      vendedor: 'Vendedor',
    };
    return textos[rol] || rol;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Administra los usuarios del sistema</p>
        </div>
        <button
          onClick={handleNuevoUsuario}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <UserPlusIcon className="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>

      {/* Pestañas */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex gap-6">
          {[
            { id: 'activos', label: 'Activos', count: usuarios.filter(u => u.estado === 'activo').length },
            { id: 'eliminados', label: 'Eliminados', count: usuariosEliminados.length },
            { id: 'todos', label: 'Todos', count: usuarios.length + usuariosEliminados.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id as typeof tabActiva)}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                tabActiva === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, email o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre / Cargo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teléfono</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Último Login</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">#{usuario.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{usuario.nombre}</p>
                      {usuario.cargo && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">{usuario.cargo}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{usuario.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{usuario.telefono}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRolColor(usuario.rol)}`}>
                      {getRolTexto(usuario.rol)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      usuario.estado === 'activo' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{usuario.ultimoLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {tabActiva === 'eliminados' ? (
                        <button
                          onClick={() => handleRestaurar(usuario)}
                          className="p-1.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                          title="Restaurar"
                        >
                          <ArrowPathIcon className="w-4 h-4" />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditar(usuario)}
                            className="p-1.5 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                            title="Editar"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSuspender(usuario)}
                            className="p-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            title={usuario.estado === 'activo' ? 'Suspender' : 'Activar'}
                          >
                            <UserMinusIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEliminar(usuario)}
                            className="p-1.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                            title="Eliminar"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {usuariosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No hay usuarios para mostrar</p>
          </div>
        )}
      </div>

      {/* Modal de usuario */}
      <UsuarioModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleGuardarUsuario}
        usuario={usuarioEditando}
        mode={modalMode}
      />
    </div>
  );
};

export default GestionUsuarios;
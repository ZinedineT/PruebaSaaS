// D:\proyecto_prueba\frontend\src\pages\GestionUsuarios\GestionUsuarios.tsx
import React, { useState, useEffect } from "react";
import {
  PencilIcon,UserMinusIcon,TrashIcon,ArrowPathIcon,MagnifyingGlassIcon,UserPlusIcon,ShieldCheckIcon,PhoneIcon,EnvelopeIcon,ClockIcon,NoSymbolIcon,ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import IconButton from '../../components/ui/IconButton';
import UsuarioModal from "../../components/GestionUsuarios/UsuarioModal";
import { Users } from "lucide-react";
import { useUsuarios } from "../../hooks/useUsuarios";
import { UsuarioUI } from "../../types/usuario.types";

// Mapeo de roles para mostrar bonito
const roleDisplayNames: Record<string, string> = {
  admin: "Admin",
  suport1: "Soporte N1",
  suport2: "Soporte N2",
  super_admin: "Super Admin",
};

const GestionUsuarios: React.FC = () => {
  const {
    usuariosActivos,
    usuariosInactivos,
    usuariosEliminados,
    loading,
    error,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    restaurarUsuario,
    eliminarPermanentemente,
    toggleEstado,
    recargar,
  } = useUsuarios();

  const [tabActiva, setTabActiva] = useState<
    "activos" | "inactivos" | "eliminados"
  >("activos");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [usuarioEditando, setUsuarioEditando] = useState<UsuarioUI | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Controlar scroll del body cuando el modal está abierto
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Resetear campos de contraseña al cerrar
      setShowPasswordField(false);
      setPasswordValue("");
      setConfirmPassword("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [modalOpen]);

  const getUsuariosFiltrados = () => {
    let base =
      tabActiva === "activos"
        ? usuariosActivos
        : tabActiva === "inactivos"
          ? usuariosInactivos
          : usuariosEliminados;

    if (searchTerm) {
      const lowSearch = searchTerm.toLowerCase();
      return base.filter(
        (u) =>
          u.nombre.toLowerCase().includes(lowSearch) ||
          u.email.toLowerCase().includes(lowSearch) ||
          u.telefono.includes(searchTerm),
      );
    }
    return base;
  };

  const usuariosFiltrados = getUsuariosFiltrados();

  const handleGuardarUsuario = async (
    usuarioData: Omit<UsuarioUI, "id" | "ultimoLogin" | "deleted_at">,
    modalPassword?: string  // <-- Este es el password que viene del modal
  ) => {
      console.log("🔑 Modal password recibido:", modalPassword);
      console.log("📝 Modo:", modalMode);
      console.log("👤 Usuario editando:", usuarioEditando?.id);
    try {
      if (modalMode === "create") {
        // Para crear, usamos la contraseña del modal
        if (!modalPassword) {
          alert("La contraseña es obligatoria");
          return;
        }
        if (modalPassword !== confirmPassword) {
          alert("Las contraseñas no coinciden");
          return;
        }
        await crearUsuario(usuarioData, modalPassword);
      } else if (usuarioEditando) {
        // Para editar, verificamos si hay contraseña nueva
        if (modalPassword) {
          // Hay contraseña nueva para cambiar
          if (modalPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
          }
          await actualizarUsuario(usuarioEditando.id, usuarioData, modalPassword);
        } else {
          // Solo actualizar datos, sin cambiar contraseña
          await actualizarUsuario(usuarioEditando.id, usuarioData);
        }
      }
      
      setModalOpen(false);
      setShowPasswordField(false);
      setPasswordValue("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      alert("Ocurrió un error al guardar el usuario");
    }
  };

  const handleEliminarClick = (usuario: UsuarioUI) => {
    if (
      window.confirm(
        `¿Estás seguro de eliminar a ${usuario.nombre}? Se moverá a la papelera.`,
      )
    ) {
      eliminarUsuario(usuario.id);
    }
  };

  const handleEliminarPermanenteClick = (usuario: UsuarioUI) => {
    if (
      window.confirm(
        `⚠️ ACCIÓN PERMANENTE ⚠️\n\n¿Estás seguro de eliminar DEFINITIVAMENTE a ${usuario.nombre}? Esta acción NO se puede deshacer.`,
      )
    ) {
      eliminarPermanentemente(usuario.id);
    }
  };

  const handleRestaurarClick = (usuario: UsuarioUI) => {
    if (
      window.confirm(
        `¿Restaurar a ${usuario.nombre}? Volverá a la lista de usuarios activos.`,
      )
    ) {
      restaurarUsuario(usuario.id);
    }
  };

  const handleSuspenderClick = (usuario: UsuarioUI) => {
    const accion = usuario.estado === "activo" ? "suspender" : "activar";
    if (
      window.confirm(
        `¿${accion === "suspender" ? "Suspender" : "Activar"} a ${usuario.nombre}?`,
      )
    ) {
      toggleEstado(usuario.id, usuario.estado);
    }
  };

  const getRolStyles = (rol: string) => {
    const styles: Record<string, string> = {
      admin:
        "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
      suport1:
        "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
      suport2:
        "bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800",
      super_admin:
        "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
    };
    return styles[rol] || styles.suport1;
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-10">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
          <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-red-700 dark:text-red-300">
            Error
          </h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={recargar}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 bg-gray-50/50 dark:bg-[#0f1115] min-h-screen">
        {/* HEADER DINÁMICO */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Users className="text-blue-500" size={24} />
              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                Usuarios
              </h1>
            </div>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium ml-1">
              Control de accesos y perfiles del sistema.
            </p>
          </div>
          <div className="flex gap-3">
              {/* Botón de actualizar - Solo icono */}
              <IconButton
                onClick={recargar}
                icon={<ArrowPathIcon className="w-5 h-5" />}
                variant="secondary"
                size="lg"
                loading={loading}
                title="Actualizar lista"
              />
              {/* Botón de sincronizar/nuevo usuario */}
              <button
                onClick={() => {
                  setModalMode("create");
                  setUsuarioEditando(null);
                  setShowPasswordField(true);
                  setModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-gray-900 dark:bg-blue-600 text-white rounded-xl sm:rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-900/10 dark:shadow-blue-500/10 text-sm sm:text-base"
              >
                <UserPlusIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                Nuevo Miembro
              </button>
            </div>
        </div>

        {/* CONTROLES: TABS + BUSCADOR */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center border-b border-gray-200 dark:border-gray-800 pb-4">
          <nav className="flex gap-2 flex-wrap lg:flex-nowrap">
            {[
              {
                id: "activos",
                label: "Activos",
                count: usuariosActivos.length,
              },
              {
                id: "inactivos",
                label: "Inactivos",
                count: usuariosInactivos.length,
              },
              {
                id: "eliminados",
                label: "Papelera",
                count: usuariosEliminados.length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id as any)}
                className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1 sm:gap-2 ${
                  tabActiva === tab.id
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-700"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-lg ${tabActiva === tab.id ? "bg-blue-100 dark:bg-blue-900/40" : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>

          <div className="relative group w-full lg:w-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-72 pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/5 outline-none dark:text-white font-medium transition-all text-sm"
            />
          </div>
        </div>

        {/* TABLA ESTILO DASHBOARD */}
        <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-500">Cargando usuarios...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-[640px] sm:min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                      <th className="px-4 sm:px-8 py-4 sm:py-5 text-left text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        Usuario
                      </th>
                      <th className="px-3 sm:px-6 py-4 sm:py-5 text-left text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        Contacto
                      </th>
                      <th className="px-3 sm:px-6 py-4 sm:py-5 text-left text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        Rol
                      </th>
                      <th className="px-3 sm:px-6 py-4 sm:py-5 text-left text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        Status
                      </th>
                      <th className="px-4 sm:px-8 py-4 sm:py-5 text-right text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                    {usuariosFiltrados.map((usuario) => (
                      <tr
                        key={usuario.id}
                        className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
                      >
                        <td className="px-4 sm:px-8 py-4 sm:py-6">
                          <div className="flex items-center gap-2 sm:gap-4">
                            <div className="relative flex-shrink-0">
                              <div className="w-9 sm:w-12 h-9 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-300 font-black shadow-inner text-xs sm:text-sm">
                                {usuario.nombre.substring(0, 2).toUpperCase()}
                              </div>
                              <div
                                className={`absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 rounded-full border-2 sm:border-4 border-white dark:border-[#161b22] ${usuario.estado === "activo" ? "bg-green-500" : "bg-gray-400"}`}
                              />
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                {usuario.nombre}
                              </div>
                              <div className="text-[10px] sm:text-xs text-gray-400 font-bold">
                                ID: {usuario.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 sm:py-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-gray-600 dark:text-gray-300">
                              <EnvelopeIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-400" />
                              <span className="truncate max-w-[120px] sm:max-w-none">
                                {usuario.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
                              <PhoneIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                              {usuario.telefono || "No registrado"}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 sm:py-6">
                          <span
                            className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${getRolStyles(usuario.rol)}`}
                          >
                            {roleDisplayNames[usuario.rol] || usuario.rol}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 sm:py-6">
                          <div className="flex flex-col gap-0.5 sm:gap-1">
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <ClockIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-400" />
                              <span className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase">
                                Último login:
                              </span>
                            </div>
                            <span className="text-[9px] sm:text-xs font-medium text-gray-400">
                              {usuario.ultimoLogin !== "Nunca"
                                ? new Date(usuario.ultimoLogin).toLocaleString()
                                : "Nunca"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                          <div className="flex items-center justify-end gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {tabActiva === "eliminados" ? (
                              <>
                                <button
                                  onClick={() => handleRestaurarClick(usuario)}
                                  className="p-1.5 sm:p-2.5 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-lg sm:rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                  title="Restaurar usuario"
                                >
                                  <ArrowPathIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleEliminarPermanenteClick(usuario)
                                  }
                                  className="p-1.5 sm:p-2.5 bg-red-50 dark:bg-red-900/30 text-red-500 rounded-lg sm:rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                  title="Eliminar permanentemente"
                                >
                                  <TrashIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setUsuarioEditando(usuario);
                                    setModalMode("edit");
                                    setShowPasswordField(false);
                                    setPasswordValue("");
                                    setConfirmPassword("");
                                    setModalOpen(true);
                                  }}
                                  className="p-1.5 sm:p-2.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-lg sm:rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                                  title="Editar usuario"
                                >
                                  <PencilIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                                </button>
                                <button
                                  onClick={() => handleSuspenderClick(usuario)}
                                  className="p-1.5 sm:p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg sm:rounded-xl hover:bg-gray-900 dark:hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                  title={
                                    usuario.estado === "activo"
                                      ? "Suspender usuario"
                                      : "Activar usuario"
                                  }
                                >
                                  {usuario.estado === "activo" ? (
                                    <NoSymbolIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                                  ) : (
                                    <ShieldCheckIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleEliminarClick(usuario)}
                                  className="p-1.5 sm:p-2.5 bg-red-50 dark:bg-red-900/30 text-red-500 rounded-lg sm:rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                  title="Mover a papelera"
                                >
                                  <TrashIcon className="w-4 sm:w-5 h-4 sm:h-5" />
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
                <div className="py-12 sm:py-20 text-center space-y-3 sm:space-y-4">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                    <UserMinusIcon className="w-8 sm:w-10 h-8 sm:h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-400 font-bold uppercase text-[10px] sm:text-xs tracking-widest">
                    {tabActiva === "activos"
                      ? "No hay usuarios activos"
                      : "La papelera está vacía"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <UsuarioModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleGuardarUsuario}
        usuario={usuarioEditando}
        mode={modalMode}
        showPasswordField={showPasswordField}
        setShowPasswordField={setShowPasswordField}
        passwordValue={passwordValue}
        setPasswordValue={setPasswordValue}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </>
  );
};

export default GestionUsuarios;

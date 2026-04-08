import React, { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import {
  UserIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const Perfil: React.FC = () => {
  const {
    user,
    loading,
    message,
    updateProfile,
    changePassword,
    clearMessages,
  } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  // Actualizar formulario cuando cambia el usuario
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  // Auto-cerrar mensajes después de 5 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => clearMessages(), 5000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });

    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.newPasswordConfirmation) {
      // Podrías usar el hook para mostrar errores también
      alert("Las contraseñas no coinciden");
      return;
    }

    if (formData.newPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const result = await changePassword({
      current_password: formData.currentPassword,
      new_password: formData.newPassword,
      new_password_confirmation: formData.newPasswordConfirmation,
    });

    if (result.success) {
      // Limpiar campos de contraseña
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
      }));
    }
  };

  const cancelEdit = () => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2 sm:gap-3">
              Configuración del Perfil
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium mt-1">
              Administra tu identidad y seguridad en la plataforma.
            </p>
          </div>
        </header>

        {/* Floating Alert System */}
        {message && (
          <div
            className={`fixed top-5 right-5 z-50 flex items-center p-4 rounded-xl shadow-2xl border animate-in slide-in-from-right-10 ${
              message.type === "success"
                ? "bg-white dark:bg-gray-800 border-green-500 text-green-600"
                : "bg-white dark:bg-gray-800 border-red-500 text-red-600"
            }`}
          >
            <div
              className={`p-2 rounded-full mr-3 ${message.type === "success" ? "bg-green-100" : "bg-red-100"}`}
            >
              {message.type === "success" ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <XMarkIcon className="w-5 h-5" />
              )}
            </div>
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: User Card & Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />

              <div className="relative mt-8">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400 overflow-hidden shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.name}
                  </h2>
                  <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 uppercase tracking-wider">
                    {user?.role === "super_admin"
                      ? "Super Administrador"
                      : user?.role || "Usuario"}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase">Estado</p>
                  <p
                    className={`text-sm font-semibold ${user?.is_active ? "text-green-500" : "text-red-500"}`}
                  >
                    {user?.is_active ? "Activo" : "Inactivo"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase">
                    Miembro desde
                  </p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-white">
                  <UserIcon className="w-5 h-5 text-blue-500" /> Datos
                  Personales
                </h3>
                <button
                  onClick={() =>
                    isEditing ? cancelEdit() : setIsEditing(true)
                  }
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition-all"
                >
                  {isEditing ? (
                    <>
                      <XMarkIcon className="w-4 h-4" /> Cancelar
                    </>
                  ) : (
                    <>
                      <PencilSquareIcon className="w-4 h-4" /> Editar Perfil
                    </>
                  )}
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">
                      Nombre Completo
                    </label>
                    <div className="relative group">
                      <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">
                      Email
                    </label>
                    <div className="relative group">
                      <EnvelopeIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">
                      Teléfono
                    </label>
                    <div className="relative group">
                      <PhoneIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-60 dark:text-white"
                        placeholder="+51 999 999 999"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end animate-in fade-in zoom-in-95">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? (
                        "Guardando..."
                      ) : (
                        <>
                          <CheckIcon className="w-5 h-5" /> Guardar Cambios
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Password Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-white">
                  <KeyIcon className="w-5 h-5 text-orange-500" /> Seguridad
                </h3>
              </div>
              <form onSubmit={handleChangePassword} className="p-8 space-y-5">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      placeholder="Contraseña Actual"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all dark:text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="Nueva Contraseña"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white"
                      required
                      minLength={6}
                    />
                    <input
                      type="password"
                      name="newPasswordConfirmation"
                      placeholder="Confirmar Nueva Contraseña"
                      value={formData.newPasswordConfirmation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-white bg-gray-900 dark:bg-blue-600 dark:hover:bg-blue-700 hover:bg-black px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50"
                  >
                    {loading ? "Actualizando..." : "Actualizar Contraseña"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;

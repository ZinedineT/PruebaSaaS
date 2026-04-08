// src/pages/Login/Login.tsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      // Error manejado por el contexto
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f1115] p-6">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[450px]">
        {/* Logo / Icono Superior */}
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 bg-white dark:bg-blue-600 rounded-[2rem] shadow-2xl shadow-blue-500/20 mb-4">
            <ShieldCheckIcon className="w-10 h-10 text-blue-600 dark:text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Bienvenido
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">
            Acceso al Sistema Maestro
          </p>
        </div>

        {/* Tarjeta de Login */}
        <div className="bg-white dark:bg-[#161b22] p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 animate-shake">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-tight">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Email */}
            <div className="space-y-2">
              <label className="ml-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                Correo Electrónico
              </label>
              <div className="relative group">
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@empresa.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-blue-500/50 rounded-2xl focus:ring-4 focus:ring-blue-500/5 outline-none dark:text-white font-bold transition-all"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  Contraseña
                </label>
                <a
                  href="#"
                  className="text-[10px] font-black text-blue-600 uppercase hover:underline"
                >
                  Olvide mi clave
                </a>
              </div>
              <div className="relative group">
                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-blue-500/50 rounded-2xl focus:ring-4 focus:ring-blue-500/5 outline-none dark:text-white font-bold transition-all"
                  required
                />
              </div>
            </div>

            {/* Botón de Ingreso */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-500/10 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Ingresar al sistema
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer del Login */}
        <p className="mt-8 text-center text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
          ¿No tienes acceso?{" "}
          <span className="text-blue-600 dark:text-blue-400 cursor-pointer">
            Contacta al administrador
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

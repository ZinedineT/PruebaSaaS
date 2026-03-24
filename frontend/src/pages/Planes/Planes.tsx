import React, { useState } from 'react';
import { 
  PlusIcon, 
  CheckIcon, 
  XMarkIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  BuildingOfficeIcon, 
  BanknotesIcon,
  SparklesIcon,
  CpuChipIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

interface Plan {
  id: number;
  nombre: string;
  precio: number;
  clientes: string;
  comprobantes: string;
  establecimientos: string;
  ventas: string;
  caracteristicas: string[];
  recomendado?: boolean;
}

const Planes: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modulos, setModulos] = useState({
    inicio: true, ventas: true, compras: true, productosServicios: true,
    inventario: true, clientesProveedores: true, guiasRemision: true,
    reportes: true, finanzas: true, contabilidad: true,
    documentosAvanzados: true, configuracion: true, usuariosLocales: true, cuenta: true,
  });

  const [apps, setApps] = useState({
    hoteles: false, farmacia: false, suscripcionServicios: false,
    suscripciones: false, restaurante: false, produccion: false,
    tramiteDocumentario: false, generadorLinkPago: false,
    generadorApp: false, reporteSoftwareContable: false,
  });

  const planes: Plan[] = [
    { id: 1, nombre: 'Básico', precio: 49, clientes: '5', comprobantes: '100', establecimientos: '1', ventas: '10,000', caracteristicas: ['Soporte básico', 'API limitada', '1 usuario admin'] },
    { id: 2, nombre: 'Premium', precio: 99, clientes: '50', comprobantes: '1,000', establecimientos: '3', ventas: '50,000', caracteristicas: ['Soporte prioritario', 'API completa', '5 usuarios admin', 'Reportes avanzados'], recomendado: true },
    { id: 3, nombre: 'Ilimitado', precio: 199, clientes: '∞', comprobantes: '∞', establecimientos: '∞', ventas: '∞', caracteristicas: ['Soporte 24/7', 'API ilimitada', 'Usuarios ilimitados', 'Reportes personalizados', 'Módulos avanzados'] },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-all">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Planes de Suscripción
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 font-medium">
            Configura las ofertas comerciales y límites del sistema.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="group relative flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-xl sm:rounded-2xl font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden text-sm sm:text-base"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <PlusIcon className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 relative z-10" />
          <span className="relative z-10">Crear Nuevo Plan</span>
        </button>
      </div>

      {/* CARDS DE PLANES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {planes.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative flex flex-col bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] transition-all duration-300 border-2 ${
              plan.recomendado 
              ? 'border-blue-500 shadow-2xl shadow-blue-500/10 sm:scale-105 z-10' 
              : 'border-transparent shadow-sm hover:border-gray-200 dark:hover:border-gray-800'
            }`}
          >
            {plan.recomendado && (
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 sm:px-5 lg:px-6 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <SparklesIcon className="w-3 sm:w-4 h-3 sm:h-4" /> Recomendado
              </div>
            )}

            <div className="p-5 sm:p-6 lg:p-10 space-y-4 sm:space-y-5 lg:space-y-6 flex-grow">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{plan.nombre}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">S/ {plan.precio}</span>
                  <span className="text-gray-400 font-bold uppercase text-[9px] sm:text-[10px] lg:text-xs tracking-widest">/ Mes</span>
                </div>
              </div>

              {/* LÍMITES CON ICONOS */}
              <div className="py-4 sm:py-5 lg:py-6 border-y border-gray-100 dark:border-gray-800 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-500">
                    <UserGroupIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-[11px] sm:text-sm font-bold uppercase tracking-tight">Clientes</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-black text-sm sm:text-base">{plan.clientes}</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-500">
                    <DocumentTextIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-[11px] sm:text-sm font-bold uppercase tracking-tight">Comprobantes</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-black text-sm sm:text-base">{plan.comprobantes}</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-500">
                    <BuildingOfficeIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-[11px] sm:text-sm font-bold uppercase tracking-tight">Locales</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-black text-sm sm:text-base">{plan.establecimientos}</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-500">
                    <BanknotesIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-[11px] sm:text-sm font-bold uppercase tracking-tight">Ventas S/</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-black text-sm sm:text-base">{plan.ventas}</span>
                </div>
              </div>

              {/* CARACTERÍSTICAS */}
              <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
                {plan.caracteristicas.map((caract, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                    <div className="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                      <CheckIcon className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-green-600 dark:text-green-400 font-bold" />
                    </div>
                    <span className="text-[11px] sm:text-sm">{caract}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:p-8 pt-0">
              <button className={`w-full py-3 sm:py-3.5 lg:py-4 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all ${
                plan.recomendado 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
                Seleccionar Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL CORREGIDO - Responsive */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Fondo oscuro forzado a pantalla completa */}
          <div 
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-md transition-opacity duration-300" 
            onClick={() => setShowModal(false)} 
          />
          
          {/* Contenedor del Modal con animación de entrada */}
          <div className="relative bg-white dark:bg-[#0f1115] rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] max-w-5xl w-[95%] max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in-95 duration-200 flex flex-col m-auto">
            
            {/* Modal Header */}
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-[#0f1115] shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="p-2 sm:p-2.5 lg:p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl sm:rounded-2xl">
                  <RocketLaunchIcon className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">Configurar Nuevo Plan</h2>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide">Establece los parámetros del nuevo nivel de servicio.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 rounded-lg sm:rounded-xl transition-all"
              >
                <XMarkIcon className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar space-y-6 sm:space-y-8 lg:space-y-10">
              {/* Formulario e Inputs */}
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre del Plan</label>
                    <input 
                      type="text" 
                      className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500/20 outline-none dark:text-white font-bold transition-all text-sm sm:text-base" 
                      placeholder="Corporativo" 
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Precio (S/)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500/20 outline-none dark:text-white font-bold transition-all text-sm sm:text-base" 
                      placeholder="199" 
                    />
                  </div>
                </div>
                <div className="md:w-1/3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-center border border-blue-100/50 dark:border-blue-900/20">
                  <p className="text-center text-[9px] sm:text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tighter leading-relaxed">
                    Límites vacíos = ilimitados (∞).
                  </p>
                </div>
              </div>

              {/* Grid de Iconos de Límites */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: 'Usuarios', icon: UserGroupIcon, color: 'text-orange-500' },
                  { label: 'Documentos', icon: DocumentTextIcon, color: 'text-purple-500' },
                  { label: 'Locales', icon: BuildingOfficeIcon, color: 'text-emerald-500' },
                  { label: 'Monto Ventas', icon: BanknotesIcon, color: 'text-blue-500' }
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5 sm:space-y-2">
                    <label className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      <item.icon className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${item.color}`} /> {item.label}
                    </label>
                    <input 
                      type="text" 
                      placeholder="∞" 
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 focus:border-blue-500 outline-none dark:text-white font-black transition-all text-sm" 
                    />
                  </div>
                ))}
              </div>

              {/* Módulos */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CpuChipIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                  <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">Módulos Activos</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                  {Object.entries(modulos).map(([key, value]) => (
                    <label 
                      key={key} 
                      className={`flex items-center justify-between p-2.5 sm:p-3 lg:p-3.5 rounded-xl cursor-pointer border-2 transition-all ${
                        value 
                        ? 'bg-blue-50/30 dark:bg-blue-500/5 border-blue-500/40' 
                        : 'bg-white dark:bg-gray-900/40 border-gray-50 dark:border-gray-800 opacity-50'
                      }`}
                    >
                      <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 dark:text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <input 
                        type="checkbox" 
                        checked={value} 
                        onChange={() => setModulos({ ...modulos, [key]: !value })} 
                        className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded accent-blue-600" 
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f1115] flex justify-end gap-2 sm:gap-3 shrink-0">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-xs sm:text-sm"
              >
                Cancelar
              </button>
              <button className="px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 bg-blue-600 text-white rounded-xl font-black shadow-lg shadow-blue-500/20 hover:scale-105 transition-all text-xs sm:text-sm">
                Guardar Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planes;
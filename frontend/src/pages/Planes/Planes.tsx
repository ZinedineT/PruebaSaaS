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
    <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-10 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-all">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Planes de Suscripción</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Configura las ofertas comerciales y límites del sistema.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="group relative flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <PlusIcon className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Crear Nuevo Plan</span>
        </button>
      </div>

      {/* CARDS DE PLANES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {planes.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative flex flex-col bg-white dark:bg-[#161b22] rounded-[2.5rem] transition-all duration-300 border-2 ${
              plan.recomendado 
              ? 'border-blue-500 shadow-2xl shadow-blue-500/10 scale-105 z-10' 
              : 'border-transparent shadow-sm hover:border-gray-200 dark:hover:border-gray-800'
            }`}
          >
            {plan.recomendado && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" /> Recomendado
              </div>
            )}

            <div className="p-10 space-y-6 flex-grow">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">{plan.nombre}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900 dark:text-white">S/ {plan.precio}</span>
                  <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">/ Mes</span>
                </div>
              </div>

              {/* LÍMITES CON ICONOS */}
              <div className="py-6 border-y border-gray-100 dark:border-gray-800 space-y-4">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-gray-500">
                    <UserGroupIcon className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-tight">Clientes</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-black">{plan.clientes}</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-gray-500">
                    <DocumentTextIcon className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-tight">Comprobantes</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-black">{plan.comprobantes}</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-gray-500">
                    <BuildingOfficeIcon className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-tight">Locales</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-black">{plan.establecimientos}</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-gray-500">
                    <BanknotesIcon className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-tight">Ventas S/</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-black">{plan.ventas}</span>
                </div>
              </div>

              {/* CARACTERÍSTICAS */}
              <div className="space-y-3 pt-2">
                {plan.caracteristicas.map((caract, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-green-600 dark:text-green-400 font-bold" />
                    </div>
                    {caract}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 pt-0">
              <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
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

      {/* MODAL PARA CREAR PLAN */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setShowModal(false)} />
          
          <div className="relative bg-white dark:bg-[#161b22] rounded-[3rem] max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                  <RocketLaunchIcon className="w-8 h-8 text-blue-500" />
                  Configurar Nuevo Plan
                </h2>
                <p className="text-sm text-gray-400 font-medium">Define límites y módulos activos para este nivel.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-2xl transition-all">
                <XMarkIcon className="w-7 h-7" />
              </button>
            </div>

            <div className="p-10 overflow-y-auto max-h-[calc(92vh-180px)] space-y-10 custom-scrollbar">
              {/* FORMULARIO BÁSICO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nombre del Plan</label>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white font-bold" placeholder="Ejem: Corporativo" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Precio Mensual (S/)</label>
                    <input type="number" className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/10 outline-none dark:text-white font-bold" placeholder="199" />
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-[2rem] p-6 flex items-center justify-center border border-blue-100 dark:border-blue-900/30">
                   <p className="text-center text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tighter leading-relaxed">
                     Los límites marcados con 0 o vacíos se entenderán como ilimitados (∞).
                   </p>
                </div>

                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
                   {[
                    { label: 'Usuarios', icon: UserGroupIcon, color: 'text-orange-500' },
                    { label: 'Documentos', icon: DocumentTextIcon, color: 'text-purple-500' },
                    { label: 'Sucursales', icon: BuildingOfficeIcon, color: 'text-emerald-500' },
                    { label: 'Monto Ventas', icon: BanknotesIcon, color: 'text-blue-500' }
                   ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        <item.icon className={`w-3 h-3 ${item.color}`} /> {item.label}
                      </label>
                      <input type="text" placeholder="∞" className="w-full px-5 py-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 outline-none dark:text-white font-black" />
                    </div>
                   ))}
                </div>
              </div>

              {/* MÓDULOS ACTIVOS (Grid de Toggles) */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <CpuChipIcon className="w-6 h-6 text-gray-400" />
                  <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Módulos del Sistema</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.entries(modulos).map(([key, value]) => (
                    <label key={key} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                      value 
                      ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-500/50 shadow-sm' 
                      : 'bg-white dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 opacity-60'
                    }`}>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <input type="checkbox" checked={value} onChange={() => setModulos({ ...modulos, [key]: !value })} className="w-4 h-4 rounded-full accent-blue-600" />
                    </label>
                  ))}
                </div>
              </div>

              {/* APPS ADICIONALES */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <SparklesIcon className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Apps & Verticales</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {Object.entries(apps).map(([key, value]) => (
                    <label key={key} className={`flex flex-col gap-3 p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                      value 
                      ? 'bg-purple-50/50 dark:bg-purple-900/10 border-purple-500/50 shadow-sm' 
                      : 'bg-white dark:bg-gray-800/40 border-gray-100 dark:border-gray-800'
                    }`}>
                      <input type="checkbox" checked={value} onChange={() => setApps({ ...apps, [key]: !value })} className="w-4 h-4 self-end accent-purple-600" />
                      <span className="text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-tight">{key.replace(/([A-Z])/g, ' $1')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-8 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                Cancelar
              </button>
              <button className="px-10 py-3 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:scale-105 transition-all active:scale-95">
                Crear Plan Maestro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planes;
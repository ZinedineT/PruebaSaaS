import React, { useState } from 'react';
import { PlusIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Plan {
  id: number;
  nombre: string;
  precio: number;
  clientes: string;
  comprobantes: string;
  establecimientos: string;
  ventas: string;
  caracteristicas: string[];
}

const Planes: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modulos, setModulos] = useState({
    inicio: true,
    ventas: true,
    compras: true,
    productosServicios: true,
    inventario: true,
    clientesProveedores: true,
    guiasRemision: true,
    reportes: true,
    finanzas: true,
    contabilidad: true,
    documentosAvanzados: true,
    configuracion: true,
    usuariosLocales: true,
    cuenta: true,
  });

  const [apps, setApps] = useState({
    hoteles: false,
    farmacia: false,
    suscripcionServicios: false,
    suscripciones: false,
    restaurante: false,
    produccion: false,
    tramiteDocumentario: false,
    generadorLinkPago: false,
    generadorApp: false,
    reporteSoftwareContable: false,
  });

  const planes: Plan[] = [
    {
      id: 1,
      nombre: 'Básico',
      precio: 49,
      clientes: '5',
      comprobantes: '100',
      establecimientos: '1',
      ventas: '10,000',
      caracteristicas: ['Soporte básico', 'API limitada', '1 usuario admin']
    },
    {
      id: 2,
      nombre: 'Premium',
      precio: 99,
      clientes: '50',
      comprobantes: '1,000',
      establecimientos: '3',
      ventas: '50,000',
      caracteristicas: ['Soporte prioritario', 'API completa', '5 usuarios admin', 'Reportes avanzados']
    },
    {
      id: 3,
      nombre: 'Ilimitado',
      precio: 199,
      clientes: '∞',
      comprobantes: '∞',
      establecimientos: '∞',
      ventas: '∞',
      caracteristicas: ['Soporte 24/7', 'API ilimitada', 'Usuarios ilimitados', 'Reportes personalizados', 'Módulos avanzados']
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Planes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gestiona los planes de suscripción</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Nuevo Plan
        </button>
      </div>

      {/* Cards de Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planes.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.nombre}</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">S/ {plan.precio}</span>
                <span className="text-gray-600 dark:text-gray-400">/mes</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Clientes:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{plan.clientes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Comprobantes:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{plan.comprobantes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Establecimientos:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{plan.establecimientos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Ventas mensuales:</span>
                <span className="font-semibold text-gray-900 dark:text-white">S/ {plan.ventas}</span>
              </div>
              <div className="pt-4 space-y-2">
                {plan.caracteristicas.map((caract, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    {caract}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                Seleccionar Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear plan */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Crear Nuevo Plan</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Formulario del plan */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del Plan</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio (S/)</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Límite de usuarios</label>
                  <input type="text" placeholder="∞ o número" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Límite de documentos</label>
                  <input type="text" placeholder="∞ o número" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Límite de establecimientos</label>
                  <input type="text" placeholder="∞ o número" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Límite de ventas mensuales</label>
                  <input type="text" placeholder="∞ o número" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
                </div>
              </div>

              {/* Módulos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Módulos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.entries(modulos).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input type="checkbox" checked={value} onChange={() => setModulos({ ...modulos, [key]: !value })} className="rounded" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Apps */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Apps</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.entries(apps).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input type="checkbox" checked={value} onChange={() => setApps({ ...apps, [key]: !value })} className="rounded" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg">
                  Crear Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planes;
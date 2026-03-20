import React, { useState } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const Contabilidad: React.FC = () => {
  const [selectedPeriodo, setSelectedPeriodo] = useState('2024-01');
  const [selectedFormato, setSelectedFormato] = useState('CONCAR');

  const clientes = [
    { dominio: 'fushi.cistcorfact.test', nombre: 'TOJI FUSHI', ruc: '12112211212', correo: 'fushi@gmail.com' },
    { dominio: 'empresa2.cistcorfact.test', nombre: 'EMPRESA DOS', ruc: '20987654321', correo: 'contacto@empresa2.com' },
    { dominio: 'empresa3.cistcorfact.test', nombre: 'EMPRESA TRES', ruc: '20555555555', correo: 'info@empresa3.com' },
  ];

  const formatos = ['CONCAR', 'SISCONT', 'FOXCONT', 'CONTASIS'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contabilidad</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Exportar datos contables de clientes</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Clientes</h2>
          <div className="flex gap-3">
            <select
              value={selectedPeriodo}
              onChange={(e) => setSelectedPeriodo(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="2024-01">Enero 2024</option>
              <option value="2024-02">Febrero 2024</option>
              <option value="2024-03">Marzo 2024</option>
            </select>
            <select
              value={selectedFormato}
              onChange={(e) => setSelectedFormato(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {formatos.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Dominio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">RUC</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Correo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {clientes.map((cliente, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{cliente.dominio}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{cliente.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{cliente.ruc}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{cliente.correo}</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      <DocumentArrowDownIcon className="w-4 h-4" />
                      Exportar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contabilidad;
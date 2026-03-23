import React, { useState } from 'react';
import { 
  DocumentArrowDownIcon, 
  TableCellsIcon, 
  CalendarDaysIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

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
    <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <TableCellsIcon className="text-blue-500 w-10 h-10" />
            Contabilidad
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium italic">
            Módulo de exportación de libros y registros contables.
          </p>
        </div>

        {/* SELECTORES GLOBALES */}
        <div className="flex flex-wrap gap-4 bg-white dark:bg-[#161b22] p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
            <select
              value={selectedPeriodo}
              onChange={(e) => setSelectedPeriodo(e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-gray-700 dark:text-gray-200 focus:ring-0 outline-none cursor-pointer"
            >
              <option value="2024-01">Enero 2024</option>
              <option value="2024-02">Febrero 2024</option>
              <option value="2024-03">Marzo 2024</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <DocumentArrowDownIcon className="w-5 h-5 text-purple-500" />
            <select
              value={selectedFormato}
              onChange={(e) => setSelectedFormato(e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-gray-700 dark:text-gray-200 focus:ring-0 outline-none cursor-pointer uppercase"
            >
              {formatos.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TABLA DE CLIENTES */}
      <div className="bg-white dark:bg-[#161b22] rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50 text-gray-400 uppercase text-[11px] font-black tracking-[0.1em]">
                <th className="px-8 py-5 text-left border-b border-gray-100 dark:border-gray-800">Cliente / Dominio</th>
                <th className="px-6 py-5 text-left border-b border-gray-100 dark:border-gray-800">Identificación</th>
                <th className="px-6 py-5 text-left border-b border-gray-100 dark:border-gray-800">Contacto</th>
                <th className="px-8 py-5 text-right border-b border-gray-100 dark:border-gray-800">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {clientes.map((cliente, idx) => (
                <tr key={idx} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                        {cliente.nombre.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                          {cliente.nombre}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                          <GlobeAltIcon className="w-3 h-3" />
                          {cliente.dominio}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold shadow-sm">
                      <IdentificationIcon className="w-4 h-4 text-blue-400" />
                      {cliente.ruc}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <EnvelopeIcon className="w-4 h-4 text-gray-300" />
                      {cliente.correo}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 transition-all shadow-sm active:scale-95 group-hover:shadow-md">
                      <DocumentArrowDownIcon className="w-4 h-4" />
                      Exportar {selectedFormato}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER DE LA TABLA (OPCIONAL) */}
        <div className="px-8 py-4 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Mostrando {clientes.length} Clientes</span>
          <span>Periodo: {selectedPeriodo}</span>
        </div>
      </div>
    </div>
  );
};

export default Contabilidad;
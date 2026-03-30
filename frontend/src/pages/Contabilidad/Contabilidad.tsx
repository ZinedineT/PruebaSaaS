import React, { useState } from 'react';
import { 
  DocumentArrowDownIcon, 
  CalendarDaysIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import { ChartBarIcon } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 border-b border-gray-200 dark:border-gray-800 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2 sm:gap-3">
            <ChartBarIcon className="text-blue-500" size={24} />
            Contabilidad
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 font-medium italic">
            Módulo de exportación de libros y registros contables.
          </p>
        </div>

        {/* SELECTORES GLOBALES */}
        <div className="flex flex-wrap gap-2 sm:gap-3 bg-white dark:bg-[#161b22] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl">
            <CalendarDaysIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
            <select
              value={selectedPeriodo}
              onChange={(e) => setSelectedPeriodo(e.target.value)}
              className="bg-white dark:bg-[#161b22] border-none text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 focus:ring-0 outline-none cursor-pointer"
            >
              <option value="2024-01">Enero 2024</option>
              <option value="2024-02">Febrero 2024</option>
              <option value="2024-03">Marzo 2024</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl">
            <DocumentArrowDownIcon className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500" />
            <select
              value={selectedFormato}
              onChange={(e) => setSelectedFormato(e.target.value)}
              className="bg-white dark:bg-[#161b22] border-none text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 focus:ring-0 outline-none cursor-pointer uppercase"
            >
              {formatos.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TABLA DE CLIENTES */}
      <div className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Versión Desktop: Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50 text-gray-400 uppercase text-[10px] sm:text-[11px] font-black tracking-[0.1em]">
                <th className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-left border-b border-gray-100 dark:border-gray-800">Cliente / Dominio</th>
                <th className="px-3 sm:px-5 lg:px-6 py-4 sm:py-5 text-left border-b border-gray-100 dark:border-gray-800">Identificación</th>
                <th className="px-3 sm:px-5 lg:px-6 py-4 sm:py-5 text-left border-b border-gray-100 dark:border-gray-800">Contacto</th>
                <th className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-right border-b border-gray-100 dark:border-gray-800">Acciones</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {clientes.map((cliente, idx) => (
                <tr key={idx} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                  <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                      <div className="w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 text-sm sm:text-base">
                        {cliente.nombre.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                          {cliente.nombre}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 font-medium">
                          <GlobeAltIcon className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                          <span className="truncate max-w-[150px] sm:max-w-none">{cliente.dominio}</span>
                        </div>
                      </div>
                    </div>
                   </td>
                  <td className="px-3 sm:px-5 lg:px-6 py-4 sm:py-6">
                    <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs font-bold shadow-sm">
                      <IdentificationIcon className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" />
                      {cliente.ruc}
                    </div>
                   </td>
                  <td className="px-3 sm:px-5 lg:px-6 py-4 sm:py-6">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <EnvelopeIcon className="w-3 sm:w-4 h-3 sm:h-4 text-gray-300" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{cliente.correo}</span>
                    </div>
                   </td>
                  <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-right">
                    <button className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 transition-all shadow-sm active:scale-95 group-hover:shadow-md">
                      <DocumentArrowDownIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                      Exportar {selectedFormato}
                    </button>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>

        {/* Versión Móvil: Cards */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {clientes.map((cliente, idx) => (
            <div key={idx} className="p-4 space-y-3 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
              {/* Header con nombre y avatar */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                  {cliente.nombre.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                    {cliente.nombre}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                    <GlobeAltIcon className="w-3 h-3" />
                    <span className="text-[11px]">{cliente.dominio}</span>
                  </div>
                </div>
              </div>

              {/* RUC */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold shadow-sm">
                  <IdentificationIcon className="w-3.5 h-3.5 text-blue-400" />
                  {cliente.ruc}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <EnvelopeIcon className="w-4 h-4 text-gray-300" />
                <span className="text-xs sm:text-sm break-all">{cliente.correo}</span>
              </div>

              {/* Botón de acción */}
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 transition-all shadow-sm active:scale-95">
                <DocumentArrowDownIcon className="w-4 h-4" />
                Exportar {selectedFormato}
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER DE LA TABLA */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Mostrando {clientes.length} Clientes</span>
          <span>Periodo: {selectedPeriodo}</span>
        </div>
      </div>
    </div>
  );
};

export default Contabilidad;
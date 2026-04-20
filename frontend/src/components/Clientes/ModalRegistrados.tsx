// src/components/Clientes/ModalRegistrados.tsx

import React, { useState } from 'react';
import { X, Search, FilterX, History, UserX, Copy, MoreHorizontal, UserCheck } from 'lucide-react';
import HistorialCliente from './HistorialCliente'; 
import HabilitarCliente from './HabilitarCliente';

// INTERFACES (TIPADO)
interface ClienteRegistrado {
  id: string;
  nombre: string;
  ruc: string;
  nombreComercial: string;
  alias: string;
  contactoPrincipal: string;
  telefono: string;
  emailAdmin: string;
  plan: string;
  ciclo: string;
  estado: string;
  fechaRegistro?: string;
}

interface ModalRegistradosProps {
  isOpen: boolean;
  onClose: () => void;
  clientesRegistrados: ClienteRegistrado[];
  onValidarCliente: (clienteId: string) => void;
  onEliminarCliente: (clienteId: string) => void;
}

const ModalRegistrados: React.FC<ModalRegistradosProps> = ({ 
  isOpen, 
  onClose, 
  clientesRegistrados, 
  onValidarCliente, 
  onEliminarCliente 
}) => {
  const [menuAbiertoId, setMenuAbiertoId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroPlan, setFiltroPlan] = useState('');
  const [filtroCiclo, setFiltroCiclo] = useState('');
  
  // Estado para el modal de historial
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [clienteHistorial, setClienteHistorial] = useState<ClienteRegistrado | null>(null);
  const [isHabilitarModalOpen, setIsHabilitarModalOpen] = useState(false);
  const [clienteParaHabilitar, setClienteParaHabilitar] = useState<ClienteRegistrado | null>(null);
  
  if (!isOpen) return null;

  // Filtrado de datos
  const clientesFiltrados = clientesRegistrados.filter((cliente: ClienteRegistrado) => {
  const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cliente.ruc.includes(searchTerm) ||
                          cliente.nombreComercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cliente.alias.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesPlan = filtroPlan ? cliente.plan === filtroPlan : true;
  const matchesCiclo = filtroCiclo ? cliente.ciclo === filtroCiclo : true;
  return matchesSearch && matchesPlan && matchesCiclo;
});

  // Función para abrir el historial
  const abrirHistorial = (cliente: ClienteRegistrado) => {
    setClienteHistorial(cliente);
    setIsHistoryModalOpen(true);
    setMenuAbiertoId(null);
  };
  const handleAbrirHabilitar = (cliente: ClienteRegistrado) => {
  setClienteParaHabilitar(cliente);
  setIsHabilitarModalOpen(true);
  setMenuAbiertoId(null);
  };

  const handleHabilitar = (clienteId: string, observaciones: string) => {
    onValidarCliente(clienteId);
    console.log(`✅ Cliente ${clienteId} habilitado. Obs: ${observaciones}`);
  };

  const handleObservar = (clienteId: string, observaciones: string) => {
    // Aquí puedes cambiar el estado a 'OBSERVADO' si lo deseas
    console.log(`👁️ Cliente ${clienteId} marcado para observación. Obs: ${observaciones}`);
  };

  const handleRechazar = (clienteId: string, observaciones: string) => {
    onEliminarCliente(clienteId);
    console.log(`❌ Cliente ${clienteId} rechazado. Obs: ${observaciones}`);
  };

  return (
    <>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-[#0f1115] rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Clientes Registrados</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Validar o eliminar nuevos registros</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Filtros Internos */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar por razón social, RUC, nombre comercial o alias"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <select
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium"
                  value={filtroPlan}
                  onChange={(e) => setFiltroPlan(e.target.value)}
                >
                  <option value="">Plan ▼</option>
                  <option value="Profesional">Profesional</option>
                  <option value="Emprendedor">Emprendedor</option>
                  <option value="Empresarial">Empresarial</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium"
                  value={filtroCiclo}
                  onChange={(e) => setFiltroCiclo(e.target.value)}
                >
                  <option value="">Ciclo ▼</option>
                  <option value="MENSUAL">Mensual</option>
                  <option value="ANUAL">Anual</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => { setSearchTerm(''); setFiltroPlan(''); setFiltroCiclo(''); }}
                className="flex items-center gap-2 text-rose-500 text-xs font-black uppercase px-3 py-2 rounded-lg hover:bg-rose-50 transition"
              >
                <FilterX size={14} /> Limpiar filtros
              </button>
            </div>
          </div>

          {/* Tabla de Registrados */}
          <div className="overflow-y-auto p-6">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-left text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                  <th className="pb-4 pl-4">Cliente</th>
                  <th className="pb-4">RUC</th>
                  <th className="pb-4">Contacto</th>
                  <th className="pb-4">Plan</th>
                  <th className="pb-4">Registrado</th>
                  <th className="pb-4 text-center">Acciones</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20">
                    <td className="py-4 pl-4">
                      <p className="font-black text-sm dark:text-white">{cliente.nombre}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{cliente.nombreComercial}</p>
                      <p className="text-[10px] text-gray-400 font-bold">Alias: {cliente.alias}</p>
                      </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 group/copy cursor-pointer">
                        <span className="text-xs font-mono font-bold dark:text-gray-300">{cliente.ruc}</span>
                        <Copy size={12} className="text-gray-400 group-hover/copy:text-blue-500" />
                      </div>
                      </td>
                    <td className="py-4">
                      <p className="text-xs font-bold dark:text-white">{cliente.contactoPrincipal}</p>
                      <p className="text-[10px] text-gray-500">{cliente.telefono}</p>
                      <p className="text-[10px] text-blue-500 truncate max-w-[150px]">{cliente.emailAdmin}</p>
                      </td>
                    <td className="py-4">
                      <span className="font-black text-[9px] uppercase px-2 py-1 rounded-md bg-blue-50 text-blue-600">
                        {cliente.plan}
                      </span>
                      <p className="text-[9px] text-gray-400 mt-1">{cliente.ciclo}</p>
                      </td>
                    <td className="py-4 text-xs font-mono font-bold dark:text-gray-400">
                      {cliente.fechaRegistro || '2026-03-15'}
                      </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleAbrirHabilitar(cliente)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-100 transition"
                        >
                          <UserCheck size={12} /> Validar cliente
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setMenuAbiertoId(menuAbiertoId === cliente.id ? null : cliente.id)}
                            className="p-2 hover:bg-gray-100 rounded-xl"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {menuAbiertoId === cliente.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border z-20">
                              <button
                                onClick={() => abrirHistorial(cliente)} // ← Abre el modal de historial
                                className="w-full px-4 py-2 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <History size={14} /> Ver historial
                              </button>
                              <button
                                onClick={() => onEliminarCliente(cliente.id)}
                                className="w-full px-4 py-2 text-left text-xs font-bold text-rose-500 hover:bg-rose-50 flex items-center gap-2"
                              >
                                <UserX size={14} /> Eliminar cliente
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
            {clientesFiltrados.length === 0 && (
              <div className="text-center py-12 text-gray-400 font-bold">No hay clientes registrados para mostrar.</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Historial - REUTILIZADO */}
    <div className="relative z-[1100]">
      <HistorialCliente 
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        cliente={clienteHistorial}
      />
      <HabilitarCliente
        isOpen={isHabilitarModalOpen}
        onClose={() => setIsHabilitarModalOpen(false)}
        cliente={clienteParaHabilitar}
        onHabilitar={handleHabilitar}
        onObservar={handleObservar}
        onRechazar={handleRechazar}
      />
    </div>
    </>
  );
};

export default ModalRegistrados;
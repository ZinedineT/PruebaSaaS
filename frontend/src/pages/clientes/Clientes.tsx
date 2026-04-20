import React, { useEffect, useState } from 'react';
import { 
  Users, Settings,UserPlus, History,Search, FilterX, Eye, Lock, Unlock, Copy,UserCheck,UserX,UserCog,Rocket,AlertTriangle,MoreHorizontal,ShieldCheck,Ban
} from 'lucide-react';
import IconButton from '../../components/ui/IconButton';
import ModalRegistrados from '../../components/Clientes/ModalRegistrados'; 
import DetallesCliente from '../../components/Clientes/DetallesCliente';
import GestionAcceso from '../../components/Clientes/GestionAcceso';
import EditarCliente from '../../components/Clientes/EditarCliente';
import ActualizarEstado from '../../components/Clientes/ActualizarEstado';
import HistorialCliente from '../../components/Clientes/HistorialCliente';
import NuevoClienteModal from '../../components/Clientes/NuevoClienteModal';
const Clientes = () => {
  //Estado de clientes (simulado)
    const [clientesData, setClientesData] = useState([
    {
      id: '1',
      nombre: 'AB COMERCIAL SAC',
      ruc: '20123456789',
      nombreComercial: 'ABC Tienda',
      alias: 'ABC',
      subdominio: 'minegocio',
      estado: 'HABILITADO',
      estadoAcceso: 'ACTIVO',
      plan: 'Profesional',
      suscripcion: 'Vigente',
      fechaRegistro: '2026-03-15', 
      fechaInicio: '15/03/2026',
      fechaVence: '14/03/2027',
      ciclo: 'MENSUAL',
      estadoSuscripcion: 'VIGENTE',
      estadoOnboarding: 'COMPLETADO',
      contactoPrincipal: 'María Torres',
      telefono: '999 888 777',
      emailAdmin: 'admin@abc.com',
      observaciones: ''
    },
    {
      id: '2',
      nombre: 'INVERSIONES XYZ SAC',
      ruc: '20987654321',
      nombreComercial: 'XYZ Store',
      alias: 'XYZ',
      subdominio: 'xyzstore',
      estado: 'REGISTRADO',
      estadoAcceso: 'BLOQUEADO_PAGO', 
      plan: 'Emprendedor',
      suscripcion: 'Por vencer',
      fechaRegistro: '2026-03-18', 
      fechaInicio: '22/05/2025',
      fechaVence: '21/05/2026',
      ciclo: 'MENSUAL',
      estadoSuscripcion: 'POR_VENCER',
      estadoOnboarding: 'PENDIENTE',
      contactoPrincipal: 'Carlos Ruiz',
      telefono: '988 777 666',
      emailAdmin: 'admin@xyz.com',
      observaciones: 'Cliente con retraso en pagos'
    }
  ]);
  // Estado para controlar el Modal de Registrados
  const [isRegistradosModalOpen, setIsRegistradosModalOpen] = useState(false);
  //refrescar
  const [isRefreshing, setIsRefreshing] = useState(false);
  // detalles modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  //Acceso gestion
  const [isAccesoModalOpen, setIsAccesoModalOpen] = useState(false);
  const [clienteAcceso, setClienteAcceso] = useState(null);
  // Editar cliente
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [menuAbiertoId, setMenuAbiertoId] = useState<string | null>(null);
  // 🔄 FUNCIÓN PARA ACTUALIZAR DATOS DEL CLIENTE DESDE EDICIÓN
  const actualizarDatosCliente = (ruc: string, datosActualizados: any) => {
    setClientesData(prevClientes => 
      prevClientes.map(cliente => 
        cliente.ruc === ruc 
          ? { 
              ...cliente,  // Mantiene todos los campos existentes
              // Datos del negocio
              nombre: datosActualizados.razonSocial,
              nombreComercial: datosActualizados.nombreComercial,
              alias: datosActualizados.alias,
              // Estados
              estado: datosActualizados.estadoCliente,
              estadoAcceso: datosActualizados.estadoAcceso,
              estadoSuscripcion: datosActualizados.estadoSuscripcion,
              estadoOnboarding: datosActualizados.estadoOnboarding,
              // Plan y ciclo
              plan: datosActualizados.plan,
              ciclo: datosActualizados.ciclo,
              // Contacto
              contactoPrincipal: datosActualizados.contactoPrincipal,
              telefono: datosActualizados.telefono,
              emailAdmin: datosActualizados.emailAdmin,
              // Subdominio
              subdominio: datosActualizados.subdominio,
              // Observaciones
              observaciones: datosActualizados.observaciones,
              // Convertir suscripción para mostrar en tabla
              suscripcion: datosActualizados.estadoSuscripcion === 'VIGENTE' ? 'Vigente' : 
                          datosActualizados.estadoSuscripcion === 'POR_VENCER' ? 'Por vencer' : 'Vencida'
            }
          : cliente
      )
    );
    console.log(`✏️ Cliente actualizado: ${ruc}`, datosActualizados);
  };
  // Actualizar estado
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  // Historial cliente
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  // Función para abrir el modal de nuevo cliente
  const [isNuevoModalOpen, setIsNuevoModalOpen] = useState(false);
  // Función para abrir el modal de edición
  const abrirEditar = (c: any) => {
    setClienteSeleccionado(c);
    setIsEditModalOpen(true);
    setMenuAbiertoId(null);
  };
  // Dentro del componente Clientes
  const handleValidarRegistrado = (clienteId: string) => {
    setClientesData(prevClientes =>
      prevClientes.map(cliente =>
        cliente.id === clienteId
          ? { ...cliente, estado: 'HABILITADO' }
          : cliente
      )
    );
    console.log(`✅ Cliente ${clienteId} validado y habilitado`);
  };
  const handleEliminarRegistrado = (clienteId: string) => {
  setClientesData(prevClientes => prevClientes.filter(cliente => cliente.id !== clienteId));
  console.log(`✅ Cliente ${clienteId} eliminado del sistema`);
  };
  // 3. Función detalle
  const verDetalle = (cliente: any) => {
    setClienteSeleccionado(cliente);
    setIsModalOpen(true);
  };
  // 🔄 FUNCIÓN PARA ACTUALIZAR ESTADO DE ACCESO
  const actualizarAccesoCliente = (ruc: string, nuevoEstadoAcceso: string, detalles: any) => {
    setClientesData(prevClientes => 
      prevClientes.map(cliente => 
        cliente.ruc === ruc 
          ? { ...cliente, estadoAcceso: nuevoEstadoAcceso as any }
          : cliente
      )
    );
    console.log(`🔓 Acceso actualizado: ${ruc} → ${nuevoEstadoAcceso}`, detalles);
  };
  const abrirGestionAcceso = (cliente: any) => {
    setClienteAcceso(cliente);
    setIsAccesoModalOpen(true);
  };
  // 🔄 FUNCIÓN PARA ACTUALIZAR ESTADO
  const actualizarEstadoCliente = (ruc: string, nuevoEstado: string) => {
    setClientesData(prevClientes => 
      prevClientes.map(cliente => 
        cliente.ruc === ruc 
          ? { ...cliente, estado: nuevoEstado }
          : cliente
      )
    );
    // Feedback visual opcional
    console.log(`🔄 Estado actualizado: ${ruc} → ${nuevoEstado}`);
  };
  // Función para abrir el modal (pasa el callback)
  const abrirEstado = (c: any) => {
    // Buscar el cliente actualizado con su estado real
    const clienteActualizado = clientesData.find(cli => cli.ruc === c.ruc);
    setClienteSeleccionado(clienteActualizado || c);
    setIsStatusModalOpen(true);
    setMenuAbiertoId(null);
  };
  const abrirHistorial = (c: any) => {
    setClienteSeleccionado(c);
    setIsHistoryModalOpen(true);
    setMenuAbiertoId(null);
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };
  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuAbiertoId) {
      const target = event.target as HTMLElement;
      // Verificar si el clic no fue en el botón de menú ni en el menú
      if (!target.closest('.relative') && !target.closest('button')) {
        setMenuAbiertoId(null);
      }
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, [menuAbiertoId]);
  return (
    <>
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* 1. ENCABEZADO SUPERIOR Y 2. SUBTÍTULO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <Users className="text-blue-600" size={32} />
            Clientes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
            Administración de clientes
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <IconButton
            onClick={handleRefresh}
            icon={isRefreshing}
            variant="secondary"
            size="lg"
            title="Actualizar lista"
          />
        {/* <button 
          onClick={() => setIsNuevoModalOpen(true)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/25 transition-all hover:-translate-y-1 active:scale-95 text-sm uppercase"
        >
          <UserPlus size={20} />
          Nuevo cliente
        </button> */}
        </div>
      </div>

      {/* 3. SECCIÓN: RESUMEN GENERAL (ESTILO BENTO) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Total clientes */}
        <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-3">
            <Users size={20} className="text-gray-900 dark:text-white" />
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">245</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Total clientes</p>
        </div>

        {/* Activos */}
        <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300">
          <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-full mb-3">
            <UserCheck size={20} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-500">210</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Activos</p>
        </div>

        {/* Bloqueados */}
        <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300">
          <div className="bg-rose-50 dark:bg-rose-500/10 p-3 rounded-full mb-3">
            <UserX size={20} className="text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-500">12</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Bloqueados</p>
        </div>

        {/* Registrados - BOTÓN CON [REVISAR] */}
        <button
          onClick={() => setIsRegistradosModalOpen(true)}
          className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className="bg-blue-50 dark:bg-blue-500/10 p-3 rounded-full mb-3">
            <UserCog size={20} className="text-blue-500" />
          </div>
            <p className="text-2xl font-black text-blue-500">
              {clientesData.filter(c => c.estado === 'REGISTRADO').length} {/* ← Dinámico */}
            </p>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">
            Registrados <span className="text-blue-500 underline ml-1">[Revisar]</span>
          </p>
        </button>

        {/* En Onboarding */}
        <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300">
          <div className="bg-amber-50 dark:bg-amber-500/10 p-3 rounded-full mb-3">
            <Rocket size={20} className="text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-500">18</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">En Onboarding</p>
        </div>

        {/* Por vencer */}
        <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300">
          <div className="bg-purple-50 dark:bg-purple-500/10 p-3 rounded-full mb-3">
            <AlertTriangle size={20} className="text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-500">9</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Por vencer</p>
        </div>
      </div>

      {/* 4. BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Búsqueda */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Buscar:</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por razón social, nombre comercial, RUC, alias o contacto" 
                className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-bold dark:text-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
              />
            </div>
          </div>
          
          {/* Filtros */}
          <div className="lg:col-span-6 grid grid-cols-4 gap-3">
            <select className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-black uppercase text-gray-500 dark:text-gray-300 appearance-none cursor-pointer">
              <option value="">Estado cliente ▼</option>
              <option value="HABILITADO">Habilitado</option>
              <option value="REGISTRADO">Registrado</option>
              <option value="SUSPENDIDO">Suspendido</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
            <select className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-black uppercase text-gray-500 dark:text-gray-300 appearance-none cursor-pointer">
              <option value="">Plan ▼</option>
              <option value="Pro">Pro</option>
              <option value="Emprendedor">Emprendedor</option>
              <option value="Empresarial">Empresarial</option>
            </select>
            <select className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-black uppercase text-gray-500 dark:text-gray-300 appearance-none cursor-pointer">
              <option value="">Acceso ▼</option>
              <option value="ACTIVO">Activo</option>
              <option value="BLOQUEADO_PAGO">Bloqueado pago</option>
              <option value="BLOQUEADO_MANUAL">Bloqueado manual</option>
              <option value="CORTE_TECNICO">Corte técnico</option>
              <option value="DESACTIVADO">Desactivado</option>
            </select>
            <select className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-black uppercase text-gray-500 dark:text-gray-300 appearance-none cursor-pointer">
              <option value="">Ciclo ▼</option>
              <option value="MENSUAL">Mensual</option>
              <option value="ANUAL">Anual</option>
            </select>
          </div>

          {/* Limpiar */}
          <div className="lg:col-span-1">
            <button className="w-full flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all">
              <FilterX size={16} />
              Limpiar
            </button>
          </div>
        </div>

      {/* 5. TABLA DE CLIENTES */}
      <div className="overflow-x-auto pt-4">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-50 dark:border-gray-800">
              <th className="pb-4 pl-4">Cliente</th>
              <th className="pb-4">RUC</th>
              <th className="pb-4">Contacto</th> 
              <th className="pb-4">Estado</th> 
              <th className="pb-4">Plan</th>
              <th className="pb-4">Acceso</th>
              <th className="pb-4">Suscripción</th>
              <th className="pb-4">Registrado</th>
              <th className="pb-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800 px-4">
            {clientesData.map((cliente) => (
              <tr key={cliente.ruc} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all">
                {/* Columna Cliente */}
                <td className="py-6 pl-4 px-4">
                  <p className="font-black text-sm dark:text-white">{cliente.nombre}</p>
                  <p className="text-[10px] text-gray-400 font-bold italic">{cliente.nombreComercial}</p>
                  <p className="text-[10px] text-gray-400 font-bold italic">Alias: {cliente.alias}</p>
                </td>
                
                {/* Columna RUC */}
                <td className="py-6 px-4">
                  <div className="flex items-center gap-2 group/copy cursor-pointer">
                    <span className="text-xs font-bold dark:text-gray-400 underline decoration-blue-500/30">{cliente.ruc}</span>
                    <Copy size={12} className="text-gray-300 group-hover/copy:text-blue-500 transition-colors" />
                  </div>
                </td>
                
                {/* Columna Contacto */}
                <td className="py-6 px-4">
                  <p className="text-xs font-bold dark:text-white">{cliente.contactoPrincipal}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{cliente.telefono}</p>
                  <p className="text-[10px] text-blue-500 truncate max-w-[150px]">{cliente.emailAdmin}</p>
                </td>
                
                {/* Columna Estado */}
                <td className="py-6 px-4">
                  <span className={`font-black text-[9px] uppercase px-2 py-1 rounded-md ${
                    cliente.estado === 'HABILITADO' 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                      : cliente.estado === 'REGISTRADO'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                      : cliente.estado === 'SUSPENDIDO'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                      : cliente.estado === 'CANCELADO'
                      ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                  }`}>
                    {cliente.estado}
                  </span>
                </td>
                
                {/* Columna Plan */}
                <td className="py-6 px-4">
                  <span className={`font-black text-[9px] uppercase px-2 py-1 rounded-md ${
                    {
                      'Profesional': 'text-blue-600 bg-blue-50 dark:bg-blue-500/10',
                      'Emprendedor': 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
                      'Empresarial': 'text-purple-600 bg-purple-50 dark:bg-purple-500/10'
                    }[cliente.plan] 
                  }`}>
                    {cliente.plan}
                  </span>
                  <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase">{cliente.ciclo}</p>
                </td>
                
                {/* Columna Acceso (SOLO UNA VEZ) */}
                <td className="py-6 px-4">
                  <div className="flex items-center justify-start gap-1.5">
                    {cliente.estadoAcceso === 'ACTIVO' && (
                      <>
                        <Unlock size={12} className="text-emerald-500" />
                        <span className="font-black text-[10px] uppercase text-emerald-500">Activo</span>
                      </>
                    )}
                    {cliente.estadoAcceso === 'BLOQUEADO_PAGO' && (
                      <>
                        <Lock size={12} className="text-rose-500" />
                        <span className="font-black text-[10px] uppercase text-rose-500">Bloq. pago</span>
                      </>
                    )}
                    {cliente.estadoAcceso === 'BLOQUEADO_MANUAL' && (
                      <>
                        <Lock size={12} className="text-orange-500" />
                        <span className="font-black text-[10px] uppercase text-orange-500">Bloq. manual</span>
                      </>
                    )}
                    {cliente.estadoAcceso === 'CORTE_TECNICO' && (
                      <>
                        <Settings size={12} className="text-purple-500" />
                        <span className="font-black text-[10px] uppercase text-purple-500">Corte téc.</span>
                      </>
                    )}
                    {cliente.estadoAcceso === 'DESACTIVADO' && (
                      <>
                        <Ban size={12} className="text-gray-500" />
                        <span className="font-black text-[10px] uppercase text-gray-500">Desactivado</span>
                      </>
                    )}
                  </div>
                </td>
                
                {/* Columna Suscripción */}
                <td className="py-6 px-4">
                  <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${
                    cliente.suscripcion === 'Vigente' 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                      : cliente.suscripcion === 'Por vencer'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                      : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600'  
                  }`}>
                    {cliente.suscripcion}
                  </span>
                  <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase">Inicio: {cliente.fechaInicio}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Vence: {cliente.fechaVence}</p>
                </td>
                
                {/* Columna Registrado */}
                <td className="py-6 px-4">
                  <p className="text-xs font-bold dark:text-gray-400">
                    {cliente.fechaRegistro || '2026-03-15'}
                  </p>
                </td>
                
                {/* Columna Acciones */}
                <td className="py-6 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => verDetalle(cliente)} 
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 rounded-xl transition-all"
                    >
                      <Eye size={18}/>
                    </button>
                    <button 
                      onClick={() => abrirGestionAcceso({
                        nombre: cliente.nombre,
                        ruc: cliente.ruc,
                        nombreComercial: cliente.nombreComercial,
                        alias: cliente.alias,
                        subdominio: cliente.subdominio,
                        estadoAcceso: cliente.estadoAcceso
                      })}
                      className={`p-2 rounded-xl transition-all ${
                        cliente.estadoAcceso === 'ACTIVO' 
                          ? 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-500' 
                          : cliente.estadoAcceso === 'BLOQUEADO_PAGO'
                          ? 'hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500'
                          : cliente.estadoAcceso === 'BLOQUEADO_MANUAL'
                          ? 'hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-500'
                          : cliente.estadoAcceso === 'CORTE_TECNICO'
                          ? 'hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-500'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-900/20 text-gray-500'
                      }`}
                    >
                      {cliente.estadoAcceso === 'ACTIVO' 
                        ? <Unlock size={18}/> 
                        : <Lock size={18}/>
                      }
                    </button>
                    
                    {/* Menú de 3 puntos */}
                    <div className="relative">
                      <button 
                        onClick={() => setMenuAbiertoId(menuAbiertoId === cliente.ruc ? null : cliente.ruc)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 rounded-xl transition-all"
                      >
                        <MoreHorizontal size={18}/>
                      </button>
                      
                      {menuAbiertoId === cliente.ruc && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1c2128] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-[100] py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                          <button 
                            onClick={() => abrirEditar(cliente)} 
                            className="w-full px-4 py-3 text-left text-[11px] font-black uppercase text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 transition-colors flex items-center gap-3"
                          >
                            <UserCog size={16} /> Editar Información
                          </button>
                          <button 
                            onClick={() => abrirEstado(cliente)}
                            className="w-full px-4 py-3 text-left text-[11px] font-black uppercase text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 transition-colors flex items-center gap-3"
                          >
                            <ShieldCheck size={16} /> Cambiar Estado
                          </button>
                          <button 
                            onClick={() => abrirHistorial(cliente)}
                            className="w-full px-4 py-3 text-left text-[11px] font-black uppercase text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-colors flex items-center gap-3"
                          >
                            <History size={16} /> Ver Historial
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
      </div>
      </div>
    </div>
      {/* Modales de detalles y acceso */}
      <DetallesCliente 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        cliente={clienteSeleccionado} 
      />
      <ModalRegistrados
      isOpen={isRegistradosModalOpen}
      onClose={() => setIsRegistradosModalOpen(false)}
      clientesRegistrados={clientesData.filter(c => c.estado === 'REGISTRADO')}
      onValidarCliente={handleValidarRegistrado}
      onEliminarCliente={handleEliminarRegistrado}
      />
      <GestionAcceso 
        isOpen={isAccesoModalOpen} 
        onClose={() => setIsAccesoModalOpen(false)} 
        cliente={clienteAcceso}
        onAccesoActualizado={actualizarAccesoCliente} 
      />
      <EditarCliente 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        cliente={clienteSeleccionado} 
        onClienteActualizado={actualizarDatosCliente}  
      />
      <ActualizarEstado 
        isOpen={isStatusModalOpen} 
        onClose={() => setIsStatusModalOpen(false)} 
        cliente={clienteSeleccionado} 
        onEstadoActualizado={actualizarEstadoCliente}
      />
      <HistorialCliente 
        isOpen={isHistoryModalOpen} 
        onClose={() => setIsHistoryModalOpen(false)} 
        cliente={clienteSeleccionado} 
      />
      <NuevoClienteModal 
        isOpen={isNuevoModalOpen} 
        onClose={() => setIsNuevoModalOpen(false)} 
      />
    </>
  );
};

export default Clientes;
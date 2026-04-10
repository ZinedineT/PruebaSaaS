import React, { useState, useEffect } from "react";
import {
  UsersIcon,
  UserMinusIcon,
  UserPlusIcon,
  ClockIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowPathIcon,
  EyeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

// --- TIPOS Y ROLES ---
type Role =
  | "super_admin"
  | "administrativo"
  | "soporte_n1"
  | "soporte_n2"
  | "ti_mantenimiento";

const userRole: Role = "super_admin";

// --- MOCK DATA CON PERIODOS ---
const mockDataByPeriod = {
  Hoy: {
    resumen: { activos: 1284, suspendidos: 96, nuevos: 34, bajas: 12 },
    cobranza: [
      { plan: "Emprendedor", pagado: 210, debe: 110, total: 320 },
      { plan: "Estándar", pagado: 360, debe: 140, total: 500 },
      { plan: "Profesional", pagado: 320, debe: 110, total: 430 },
    ],
    vencimientos: { clientes7: 14, clientes30: 38, cdt7: 9, cdt30: 21 },
    limites: [
      {
        cliente: "Minimarket El Sol",
        plan: "Estándar",
        uso: 2800,
        limite: 3000,
      },
      {
        cliente: "Botica San José",
        plan: "Emprendedor",
        uso: 1760,
        limite: 2000,
      },
      {
        cliente: "Comercial Fénix",
        plan: "Profesional",
        uso: 4350,
        limite: 5000,
      },
      {
        cliente: "Inversiones Rojas",
        plan: "Estándar",
        uso: 2410,
        limite: 3000,
      },
    ],
  },
  "Este mes": {
    resumen: { activos: 1284, suspendidos: 96, nuevos: 34, bajas: 12 },
    cobranza: [
      { plan: "Emprendedor", pagado: 2100, debe: 1100, total: 3200 },
      { plan: "Estándar", pagado: 3600, debe: 1400, total: 5000 },
      { plan: "Profesional", pagado: 3200, debe: 1100, total: 4300 },
    ],
    vencimientos: { clientes7: 14, clientes30: 38, cdt7: 9, cdt30: 21 },
    limites: [
      {
        cliente: "Minimarket El Sol",
        plan: "Estándar",
        uso: 2800,
        limite: 3000,
      },
      {
        cliente: "Botica San José",
        plan: "Emprendedor",
        uso: 1760,
        limite: 2000,
      },
      {
        cliente: "Comercial Fénix",
        plan: "Profesional",
        uso: 4350,
        limite: 5000,
      },
      {
        cliente: "Inversiones Rojas",
        plan: "Estándar",
        uso: 2410,
        limite: 3000,
      },
    ],
  },
  "Últimos 30 días": {
    resumen: { activos: 1284, suspendidos: 96, nuevos: 68, bajas: 24 },
    cobranza: [
      { plan: "Emprendedor", pagado: 4200, debe: 2200, total: 6400 },
      { plan: "Estándar", pagado: 7200, debe: 2800, total: 10000 },
      { plan: "Profesional", pagado: 6400, debe: 2200, total: 8600 },
    ],
    vencimientos: { clientes7: 28, clientes30: 76, cdt7: 18, cdt30: 42 },
    limites: [
      {
        cliente: "Minimarket El Sol",
        plan: "Estándar",
        uso: 2900,
        limite: 3000,
      },
      {
        cliente: "Botica San José",
        plan: "Emprendedor",
        uso: 1950,
        limite: 2000,
      },
      {
        cliente: "Comercial Fénix",
        plan: "Profesional",
        uso: 4800,
        limite: 5000,
      },
      {
        cliente: "Inversiones Rojas",
        plan: "Estándar",
        uso: 2700,
        limite: 3000,
      },
    ],
  },
};

// --- COMPONENTES POR ROL (preparado) ---
const blockPermissions: Record<Role, string[]> = {
  super_admin: [
    "resumen",
    "estado_planes",
    "cobranza",
    "comprobantes",
    "alertas",
    "limites",
  ],
  administrativo: [
    "resumen",
    "estado_planes",
    "cobranza",
    "comprobantes",
    "alertas",
    "limites",
  ],
  soporte_n1: ["resumen", "comprobantes", "alertas", "limites"],
  soporte_n2: ["resumen", "comprobantes", "alertas", "limites"],
  ti_mantenimiento: ["resumen", "estado_planes", "cobranza"],
};

// --- UTILIDAD: Estado según porcentaje ---
const getLimitStatus = (porcentaje: number) => {
  if (porcentaje >= 90)
    return {
      label: "Crítico",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-950/30",
    };
  if (porcentaje >= 75)
    return {
      label: "En alerta",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    };
  return {
    label: "Observación",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  };
};

// --- COMPONENTE CARD RESUMEN ---
const CardStat = ({ item }: any) => (
  <div className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${item.bg}`}>
        <item.icon className={`w-6 h-6 ${item.color}`} />
      </div>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
        Tiempo-Real
      </span>
    </div>
    <div className="mt-4">
      <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-none">
        {item.value}
      </h3>
      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tight mt-2">
        {item.name}
      </p>
      <p className="text-[9px] text-gray-400 mt-0.5">{item.desc}</p>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
const Dashboard: React.FC = () => {
  const [periodo, setPeriodo] = useState("Este mes");
  const [lastUpdate, setLastUpdate] = useState("10:42 a. m.");
  const [data, setData] = useState(mockDataByPeriod["Este mes"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockDataByPeriod[periodo as keyof typeof mockDataByPeriod]);
      const now = new Date();
      setLastUpdate(
        `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} ${now.getHours() >= 12 ? "p. m." : "a. m."}`,
      );
      setLoading(false);
    }, 500);
  }, [periodo]);

  const resumenStats = [
    {
      name: "Clientes Activos",
      value: data.resumen.activos.toLocaleString(),
      desc: "Clientes operativos",
      icon: UsersIcon,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      name: "Suspendidos por pago",
      value: data.resumen.suspendidos.toLocaleString(),
      desc: "Inhabilitados por deuda",
      icon: ClockIcon,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      name: "Nuevos del periodo",
      value: data.resumen.nuevos.toLocaleString(),
      desc: "Altas registradas",
      icon: UserPlusIcon,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      name: "Bajas del periodo",
      value: data.resumen.bajas.toLocaleString(),
      desc: "Salidas del periodo",
      icon: UserMinusIcon,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  const planesDistribucion = [
    { name: "Emprendedor", activos: 420, suspendidos: 40, total: 460 },
    { name: "Estándar", activos: 510, suspendidos: 31, total: 541 },
    { name: "Profesional", activos: 354, suspendidos: 25, total: 379 },
  ];

  const totalGeneral = data.cobranza.reduce((acc, p) => acc + p.total, 0);
  const totalPagado = data.cobranza.reduce((acc, p) => acc + p.pagado, 0);
  const avancePorcentaje = (totalPagado / totalGeneral) * 100;

  const hasBlock = (block: string) =>
    blockPermissions[userRole].includes(block);

  if (loading) {
    return (
      <LoadingSpinner
        message="Cargando dashboard..."
        fullScreen={true}
        size="md"
      />
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-50/50 dark:bg-[#0f1115] min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div>
          <div className="flex items-center gap-3">
            <HomeIcon className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Dashboard
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
            Centro general de cartera, cobranza, alertas y operación
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white dark:bg-[#161b22] p-1 rounded-xl border border-gray-100 dark:border-gray-800">
            {["Hoy", "Este mes", "Últimos 30 días"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                  periodo === p
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <ArrowPathIcon className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-black text-gray-500 uppercase">
              Actualizado {lastUpdate}
            </span>
          </div>
        </div>
      </div>

      {/* FILA 1: RESUMEN EJECUTIVO */}
      {hasBlock("resumen") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resumenStats.map((stat) => (
            <CardStat key={stat.name} item={stat} />
          ))}
        </div>
      )}

      {/* FILA 2: ESTADO POR PLAN + COBRANZA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bloque: Estado de clientes por plan - CON TUS BARRAS CSS */}
        {hasBlock("estado_planes") && (
          <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                  Estado de clientes por plan
                </h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Distribución actual por tipo de plan
                </p>
              </div>
              <button
                className="text-[10px] font-black text-blue-600 uppercase border-b-2 border-blue-600/20 hover:border-blue-600 flex items-center gap-1"
                onClick={() => navigate("/usuarios")}
              >
                <EyeIcon className="w-3 h-3" /> Ver clientes
              </button>
            </div>

            {/* Tabla estilo wireframe con totales dinámicos */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                  <tr className="text-left text-gray-500 dark:text-white font-bold uppercase text-[9px]">
                    <th className="pb-3">Estado</th>
                    <th className="pb-3 text-right">Empr.</th>
                    <th className="pb-3 text-right">Est.</th>
                    <th className="pb-3 text-right">Prof.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr className="text-gray-900 dark:text-white">
                    <td className="py-3 font-bold ">Activos</td>
                    <td className="py-3 text-right font-mono">
                      {
                        planesDistribucion.find((p) => p.name === "Emprendedor")
                          ?.activos
                      }
                    </td>
                    <td className="py-3 text-right font-mono">
                      {
                        planesDistribucion.find((p) => p.name === "Estándar")
                          ?.activos
                      }
                    </td>
                    <td className="py-3 text-right font-mono">
                      {
                        planesDistribucion.find((p) => p.name === "Profesional")
                          ?.activos
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-gray-900 dark:text-white">
                      Suspendidos pago
                    </td>
                    <td className="py-3 text-right font-mono text-rose-500">
                      {
                        planesDistribucion.find((p) => p.name === "Emprendedor")
                          ?.suspendidos
                      }
                    </td>
                    <td className="py-3 text-right font-mono text-rose-500">
                      {
                        planesDistribucion.find((p) => p.name === "Estándar")
                          ?.suspendidos
                      }
                    </td>
                    <td className="py-3 text-right font-mono text-rose-500">
                      {
                        planesDistribucion.find((p) => p.name === "Profesional")
                          ?.suspendidos
                      }
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 text-gray-900 dark:text-white dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <td className="py-3 font-black text-gray-900 dark:text-white">
                      Total
                    </td>
                    <td className="py-3 text-right font-black font-mono">
                      {(planesDistribucion.find((p) => p.name === "Emprendedor")
                        ?.activos || 0) +
                        (planesDistribucion.find(
                          (p) => p.name === "Emprendedor",
                        )?.suspendidos || 0)}
                    </td>
                    <td className="py-3 text-right font-black font-mono">
                      {(planesDistribucion.find((p) => p.name === "Estándar")
                        ?.activos || 0) +
                        (planesDistribucion.find((p) => p.name === "Estándar")
                          ?.suspendidos || 0)}
                    </td>
                    <td className="py-3 text-right font-black font-mono">
                      {(planesDistribucion.find((p) => p.name === "Profesional")
                        ?.activos || 0) +
                        (planesDistribucion.find(
                          (p) => p.name === "Profesional",
                        )?.suspendidos || 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TUS BARRAS CSS ORIGINALES */}
            <div className="mt-6 space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              {planesDistribucion.map((plan) => {
                const total = plan.activos + plan.suspendidos;
                const actPercent = (plan.activos / total) * 100;
                const susPercent = (plan.suspendidos / total) * 100;
                return (
                  <div key={plan.name} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-black uppercase">
                      <span className="text-gray-700 dark:text-gray-300">
                        {plan.name}
                      </span>
                      <span className="text-gray-400">
                        {plan.activos} /{" "}
                        <span className="text-rose-500">
                          {plan.suspendidos}
                        </span>
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${actPercent}%` }}
                        className="bg-emerald-500 h-full rounded-l-full"
                      />
                      <div
                        style={{ width: `${susPercent}%` }}
                        className="bg-rose-500/60 h-full rounded-r-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bloque: Cobranza del periodo por plan */}
        {hasBlock("cobranza") && (
          <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                  Cobranza del periodo por plan
                </h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Monto esperado, pagado y pendiente
                </p>
              </div>
              <button
                onClick={() => navigate("/gestion-planes")}
                className="text-[10px] font-black text-blue-600 uppercase border-b-2 border-blue-600/20 hover:border-blue-600 inline-flex items-center gap-1"
              >
                <EyeIcon className="w-3 h-3" /> Ver cobranza
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                  <tr className="text-left text-gray-900 dark:text-white font-bold uppercase text-[9px]">
                    <th className="pb-3">Plan</th>
                    <th className="pb-3 text-right">Total</th>
                    <th className="pb-3 text-right">Pagado</th>
                    <th className="pb-3 text-right">Debe</th>
                    <th className="pb-3 text-right">Avance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {data.cobranza.map((row) => {
                    const avance = (row.pagado / row.total) * 100;
                    return (
                      <tr
                        key={row.plan}
                        className="text-gray-900 dark:text-white"
                      >
                        <td className="py-3 font-bold text-gray-900 dark:text-white">
                          {row.plan}
                        </td>
                        <td className="py-3 text-right font-bold">
                          S/ {row.total.toLocaleString()}
                        </td>
                        <td className="py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                          S/ {row.pagado.toLocaleString()}
                        </td>
                        <td className="py-3 text-right font-bold text-rose-500">
                          S/ {row.debe.toLocaleString()}
                        </td>
                        <td className="py-3 text-right font-bold text-gray-500">
                          <div className="flex items-center gap-2 justify-end">
                            <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${avance}%` }}
                              />
                            </div>
                            <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400">
                              {Math.round(avance)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t border-gray-200 dark:border-gray-700">
                  <tr className="font-bold text-gray-900 dark:text-white">
                    <td className="pt-3">Total general</td>
                    <td className="pt-3 text-right">
                      S/ {totalGeneral.toLocaleString()}
                    </td>
                    <td className="pt-3 text-right text-emerald-600 dark:text-emerald-400">
                      S/ {totalPagado.toLocaleString()}
                    </td>
                    <td className="pt-3 text-right text-rose-500 dark:text-rose-400">
                      S/ {(totalGeneral - totalPagado).toLocaleString()}
                    </td>
                    <td className="pt-3 text-right font-bold text-gray-500">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${avancePorcentaje}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-blue-600">
                          {Math.round(avancePorcentaje)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6 text-right"></div>
          </div>
        )}
      </div>

      {/* FILA 3: SALUD COMPROBANTES + ALERTAS VENCIMIENTO - 50% / 50% */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salud de comprobantes */}
        {hasBlock("comprobantes") && (
          <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-1">
                  Salud de comprobantes
                </h2>
                <p className="text-gray-900 dark:text-gray-400 text-[9px] font-bold mb-6">
                  ⚠️ Comprobantes pendientes de envío, rechazo o anulación
                </p>
              </div>
              <button
                onClick={() => navigate("/comprobantes")}
                className="text-[10px] font-black text-blue-600 uppercase border-b-2 border-blue-600/20 hover:border-blue-600"
              >
                Ver comprobantes
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  label: "Pend. envío",
                  value: 57,
                  status: "Revisión",
                  color: "text-blue-500",
                  bg: "bg-blue-50",
                  icon: ShieldCheckIcon,
                },
                {
                  label: "Rechazados",
                  value: 23,
                  status: "Crítico",
                  color: "text-rose-500",
                  bg: "bg-rose-50",
                  icon: XCircleIcon,
                },
                {
                  label: "Pend. anulación",
                  value: 11,
                  status: "Seguimiento",
                  color: "text-amber-500",
                  bg: "bg-amber-50",
                  icon: ExclamationTriangleIcon,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800"
                >
                  <item.icon className={`w-5 h-5 ${item.color} mb-4`} />
                  <p className="text-3xl font-black dark:text-white">
                    {item.value}
                  </p>
                  <p className="text-[10px] font-black uppercase text-gray-400 mt-1">
                    {item.label}
                  </p>
                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-[8px] font-black uppercase ${item.color} ${item.bg} dark:bg-opacity-10`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alertas de vencimiento - CON REGLA DE NEGOCIO */}
        {hasBlock("alertas") && (
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/20">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black tracking-tight mb-1">
                  Alertas de vencimiento
                </h2>
                <p className="text-blue-100 text-[9px] font-bold mb-6">
                  ⚠️ Solo clientes anuales (no aplica a corte mensual)
                </p>
              </div>
              <button
                onClick={() => navigate("/vencimientos")}
                className="text-[10px] font-black text-white/80 uppercase border-b-2 border-white/30 hover:border-white"
              >
                Ver vencimientos
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center gap-3 mb-4">
                  <UsersIcon className="w-5 h-5 text-blue-200" />
                  <span className="text-[11px] font-black uppercase">
                    Clientes anuales por vencer
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-black">
                      {data.vencimientos.clientes7}
                    </p>
                    <p className="text-[8px] font-bold uppercase text-blue-200">
                      En 7 días
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-black">
                      {data.vencimientos.clientes30}
                    </p>
                    <p className="text-[8px] font-bold uppercase text-blue-200">
                      En 30 días
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheckIcon className="w-5 h-5 text-blue-200" />
                  <span className="text-[11px] font-black uppercase">
                    CDT por vencer
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-black">
                      {data.vencimientos.cdt7}
                    </p>
                    <p className="text-[8px] font-bold uppercase text-blue-200">
                      En 7 días
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-black">
                      {data.vencimientos.cdt30}
                    </p>
                    <p className="text-[8px] font-bold uppercase text-blue-200">
                      En 30 días
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center"></div>
          </div>
        )}
      </div>

      {/* FILA 4: CLIENTES CERCA DE SU LÍMITE */}
      {hasBlock("limites") && (
        <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
                Clientes cerca de su límite
              </h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                uso vs límite de comprobantes
              </p>
            </div>
            <button
              onClick={() => navigate("/limites")}
              className="text-[10px] font-black text-blue-600 uppercase border-b-2 border-blue-600/20 hover:border-blue-600"
            >
              Ver todos
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr className="text-left text-gray-500 dark:text-gray-400 font-bold uppercase text-[9px]">
                  <th className="pb-4">Cliente</th>
                  <th className="pb-4">Plan</th>
                  <th className="pb-4">Uso</th>
                  <th className="pb-4">Estado</th>
                  <th className="pb-4">Progreso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.limites.map((item) => {
                  const porcentaje = (item.uso / item.limite) * 100;
                  const status = getLimitStatus(porcentaje);
                  const barColor =
                    porcentaje >= 90
                      ? "bg-rose-500"
                      : porcentaje >= 75
                        ? "bg-amber-500"
                        : "bg-blue-500";
                  return (
                    <tr
                      key={item.cliente}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors"
                    >
                      <td className="py-4 font-bold text-xs text-gray-900 dark:text-white">
                        {item.cliente}
                      </td>
                      <td className="py-4 font-bold text-xs text-gray-600 dark:text-gray-400 text-xs">
                        {item.plan}
                      </td>
                      <td className="py-4 font-bold text-xs text-gray-900 dark:text-white">
                        {item.uso.toLocaleString()} /{" "}
                        {item.limite.toLocaleString()}
                      </td>
                      <td className="py-4">
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${status.color} ${status.bg}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${barColor} rounded-full transition-all duration-500`}
                              style={{ width: `${Math.min(porcentaje, 100)}%` }}
                            />
                          </div>
                          <span className="font-bold text-[12px] text-gray-900 dark:text-white">
                            {Math.round(porcentaje)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Indicador de rol activo */}
      <div className="text-center text-[8px] text-gray-400 uppercase tracking-wider border-t border-gray-200 dark:border-gray-800 pt-6 mt-4">
        Modo: {userRole.replace("_", " ")} • Dashboard preparado para permisos
        por rol
      </div>
    </div>
  );
};

export default Dashboard;

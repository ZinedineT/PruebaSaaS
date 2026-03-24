import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layout, 
  CreditCard, 
  Search, 
  Smartphone, 
  Upload, 
  Save,
  Globe,
  Settings,
  Share2
} from 'lucide-react';

const Configuracion: React.FC = () => {
  // Mantengo tus estados originales intactos
  const [certificado, setCertificado] = useState({
    certificado: null as File | null,
    usuarioSecundario: '',
    rucUsuario: '',
    contrasena: ''
  });

  const [configGlobal, setConfigGlobal] = useState({
    usarConfigGlobal: false,
    logoPreview: null as string | null,
    posicionFormulario: 'derecha',
    mostrarLogoFormulario: true,
    posicionLogo: 'superior-izquierda',
    mostrarRedesSociales: {
      facebook: true,
      twitter: false,
      instagram: false,
      linkedin: false
    },
    mostrarPublicidad: false,
    habilitarContrasenaSegura: true
  });

  const [culqi, setCulqi] = useState({ tokenPublico: '', tokenPrivado: '' });
  const [apiPeru, setApiPeru] = useState({
    url: 'https://apiperu.dev',
    token: '4b297f3cf07f893870d7d3db9b22e10ea47a8340e2bef32a3b8ca94153ae5a1c'
  });
  const [appMovil, setAppMovil] = useState({ url: '' });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 bg-gray-50 dark:bg-[#0f1115] min-h-screen transition-colors duration-300">
      
      {/* HEADER DINÁMICO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 border-b border-gray-200 dark:border-gray-800 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2 sm:gap-3">
            <Settings className="text-blue-500" size={24} />
            Configuración
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 font-medium">
            Panel de control global del sistema y API integradas.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold shadow-xl shadow-blue-500/25 transition-all hover:-translate-y-1 active:scale-95 text-sm sm:text-base">
          <Save size={18} />
          Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* COLUMNA IZQUIERDA: SEGURIDAD Y APIS */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* SECCIÓN SUNAT */}
          <section className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 p-5 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl sm:rounded-2xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Certificado PSE - SUNAT</h2>
                <p className="text-xs sm:text-sm text-gray-500">Credenciales de facturación electrónica</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="sm:col-span-2 group">
                <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400 mb-1.5 sm:mb-2 ml-1 uppercase tracking-wider">Certificado Digital</label>
                <div className="relative border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center bg-gray-50/50 dark:bg-gray-800/30 group-hover:border-orange-400 transition-all cursor-pointer">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <Upload className="mx-auto text-gray-400 group-hover:text-orange-500 mb-1.5 sm:mb-2 transition-colors" size={28} />
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Arrastra tu archivo .pfx o .p12 aquí</p>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Usuario Secundario</label>
                <input 
                  type="text" 
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all dark:text-white font-medium text-sm sm:text-base" 
                  placeholder="MODDATOS" 
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">RUC + Usuario</label>
                <input 
                  type="text" 
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all dark:text-white font-medium text-sm sm:text-base" 
                  placeholder="20123456789USUARIO" 
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Contraseña SOL</label>
                <input 
                  type="password" 
                  title="Contraseña" 
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all dark:text-white text-sm sm:text-base" 
                  placeholder="••••••••••••" 
                />
              </div>
            </div>
          </section>

          {/* CULQI & API PERU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div className="bg-white dark:bg-[#161b22] rounded-xl sm:rounded-[2rem] p-5 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-purple-600">
                <CreditCard size={20} />
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">Culqi</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <input 
                  type="text" 
                  placeholder="Token Público" 
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none text-xs sm:text-sm dark:text-white outline-none focus:ring-2 focus:ring-purple-500" 
                />
                <input 
                  type="password" 
                  placeholder="Token Privado" 
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none text-xs sm:text-sm dark:text-white outline-none focus:ring-2 focus:ring-purple-500" 
                />
              </div>
            </div>

            <div className="bg-white dark:bg-[#161b22] rounded-xl sm:rounded-[2rem] p-5 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-emerald-600">
                <Search size={20} />
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">API Perú</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <input 
                  type="text" 
                  value={apiPeru.url} 
                  disabled 
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-700/30 text-gray-400 text-[10px] sm:text-xs border-none cursor-not-allowed" 
                />
                <input 
                  type="text" 
                  placeholder="API Token" 
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none text-xs sm:text-sm dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: PERSONALIZACIÓN */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          
          {/* LOGIN CONFIG */}
          <section className="bg-white dark:bg-[#161b22] rounded-2xl sm:rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-50 dark:border-gray-800">
              <div className="flex items-center gap-2 sm:gap-3 text-blue-500">
                <Layout size={24} />
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-800 dark:text-white">Interfaz Login</h2>
              </div>
              {/* TOGGLE CONFIG GLOBAL */}
              <label className="flex items-center gap-2 sm:gap-3 cursor-pointer group self-start sm:self-auto">
                <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase group-hover:text-blue-500 transition-colors">Global</span>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 sm:w-12 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 sm:peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[3px] sm:after:top-[4px] after:left-[3px] sm:after:left-[4px] after:bg-white after:rounded-full after:h-3.5 sm:after:h-4 after:w-3.5 sm:after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </label>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* LOGOS */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2 sm:space-y-3 text-center">
                  <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Logo Principal</p>
                  <div className="h-28 sm:h-32 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-[1.5rem] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/30 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                    <Upload size={16} className="text-gray-300 group-hover:text-blue-500 mb-1.5" />
                    <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold">747x547 PNG</span>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3 text-center">
                  <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Logo Secundario</p>
                  <div className="h-28 sm:h-32 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-[1.5rem] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/30 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                    <Upload size={16} className="text-gray-300 group-hover:text-blue-500 mb-1.5" />
                    <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold">700x300 PNG</span>
                  </div>
                </div>
              </div>

              {/* SELECTORES DE POSICIÓN */}
              <div className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">Formulario</label>
                    <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Derecha</option>
                      <option>Izquierda</option>
                      <option>Centro</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">Logo Empresa</label>
                    <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Superior Izquierda</option>
                      <option>Superior Derecha</option>
                      <option>Centro</option>
                    </select>
                  </div>
                </div>

                {/* BOTONES SOCIALES */}
                <div className="pt-4 sm:pt-6">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                    <Share2 size={14} className="text-blue-500" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Redes Sociales</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {['Facebook', 'Twitter', 'Instagram', 'Linkedin'].map((red) => (
                      <button key={red} className={`py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold rounded-lg border transition-all ${
                        red === 'Facebook' ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800' : 'bg-transparent border-gray-100 dark:border-gray-800 text-gray-400 hover:border-blue-400'
                      }`}>
                        {red.substring(0, 2).toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles Finales */}
                <div className="grid grid-cols-1 gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <label className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-blue-50/50 transition-colors">
                    <span className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300">Mostrar logo en form.</span>
                    <input type="checkbox" defaultChecked className="w-4 sm:w-5 h-4 sm:h-5 accent-blue-600 rounded-lg" />
                  </label>
                  <label className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-blue-50/50 transition-colors">
                    <span className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300">Publicidad</span>
                    <input type="checkbox" className="w-4 sm:w-5 h-4 sm:h-5 accent-blue-600 rounded-lg" />
                  </label>
                  <label className="flex items-center justify-between p-3 sm:p-4 bg-blue-600 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-600/20 cursor-pointer">
                    <span className="text-xs sm:text-sm font-bold text-white">Contraseña Segura</span>
                    <input type="checkbox" defaultChecked className="w-4 sm:w-5 h-4 sm:h-5 accent-white" />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* APP MÓVIL CARD */}
          <section className="bg-[#1e293b] dark:bg-blue-600 rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 lg:p-8 text-white relative overflow-hidden group shadow-2xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 p-4 sm:p-6 lg:p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Smartphone size={80} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                <Globe size={20} />
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">Aplicación Móvil</h3>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4 font-medium italic">Enlace de descarga oficial (Play Store / App Store)</p>
              <input 
                type="text" 
                placeholder="https://link-de-tu-app.com" 
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 placeholder:text-white/40 text-white outline-none focus:bg-white/20 transition-all font-medium text-sm sm:text-base" 
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
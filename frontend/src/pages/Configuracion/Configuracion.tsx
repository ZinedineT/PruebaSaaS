import React, { useState } from 'react';

const Configuracion: React.FC = () => {
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

  const [culqi, setCulqi] = useState({
    tokenPublico: '',
    tokenPrivado: ''
  });

  const [apiPeru, setApiPeru] = useState({
    url: 'https://apiperu.dev',
    token: '4b297f3cf07f893870d7d3db9b22e10ea47a8340e2bef32a3b8ca94153ae5a1c'
  });

  const [appMovil, setAppMovil] = useState({
    url: ''
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuración</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Configuración global del sistema</p>
      </div>

      <div className="space-y-6">
        {/* Certificado PSE - Datos Sunat */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Certificado PSE - Datos Sunat</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Certificado</label>
              <input type="file" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usuario Secundario SUNAT</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">RUC + Usuario</label>
              <input type="text" placeholder="Ejemplo: 01234567890ELUSUARIO" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
              <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Configuración global para login */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configuración global para el login de los clientes</h2>
          
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Usar configuración global</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo (747 x 547px PNG o SVG)</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Click para subir imagen</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo secundario (700 x 300px)</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Click para subir imagen</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Posición del formulario</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                <option>Derecha</option>
                <option>Izquierda</option>
                <option>Centro</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 mt-6">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Mostrar logo en el formulario</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Posición del logo de la empresa</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                <option>Superior izquierda</option>
                <option>Superior derecha</option>
                <option>Centro</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Mostrar botones de redes sociales</h3>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Instagram', 'Linkedin'].map((red) => (
                <label key={red} className="flex items-center gap-1">
                  <input type="checkbox" defaultChecked={red === 'Facebook'} className="rounded" />
                  <span className="text-sm">{red}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Mostrar publicidad</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Habilitar contraseña segura</span>
            </label>
          </div>
        </div>

        {/* Culqi */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Culqi</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Token Público</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Token Privado</label>
              <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Consulta RUC/DNI */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Consulta RUC/DNIe</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
              <input type="text" defaultValue="https://apiperu.dev" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Token</label>
              <input type="text" defaultValue="4b297f3cf07f893870d7d3db9b22e10ea47a8340e2bef32a3b8ca94153ae5a1c" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
            </div>
          </div>
        </div>

        {/* App Móvil */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">URL de descarga de Aplicación móvil</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
            <input type="text" placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
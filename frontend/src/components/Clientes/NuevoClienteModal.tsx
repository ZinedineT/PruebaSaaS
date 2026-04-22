import React, { useState, useRef } from 'react';
import { X, Mail,Wallet, BookOpenTextIcon,FileEdit, Building2, User, ChevronRight, ChevronLeft, CheckCircle2, Copy, QrCode, Search } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
interface NuevoClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NuevoClienteModal: React.FC<NuevoClienteModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(isOpen, onClose, modalRef);
  const [step, setStep] = useState(1);
  const [metodoPago, setMetodoPago] = useState<'transferencia' | 'yape'>('transferencia');

  if (!isOpen) return null;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white dark:bg-[#161b22] w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* HEADER CON STEPPER INDICATOR */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">Registro de Nueva Cuenta</h2>
              <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em]">Paso {step} de 3</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <X size={20} className="dark:text-gray-400" />
            </button>
          </div>
          
          {/* Línea de progreso */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'}`} />
            ))}
          </div>
        </div>

        <div className="p-8 overflow-y-auto">
          
          {/* PASO 1: VALIDAR CORREO (Pantalla 3A) */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} />
                </div>
                <h3 className="text-lg font-black dark:text-white uppercase">Validar Correo</h3>
                <p className="text-xs text-gray-500 font-medium">Ingresa el correo administrativo para comenzar.</p>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <input type="email" placeholder="admin@cliente.com" className="w-full pl-5 pr-32 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                  <button className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-blue-700 transition-all">
                    Enviar Código
                  </button>
                </div>
                
                <div className="p-6 bg-blue-50/50 dark:bg-blue-500/5 rounded-2xl border border-blue-100 dark:border-blue-500/10 text-center space-y-4">
                  <p className="text-[10px] text-blue-600 font-black uppercase">Se envió un código de 6 dígitos</p>
                  <div className="flex justify-center gap-2">
                    {[1,2,3,4,5,6].map((i) => (
                      <input key={i} type="text" maxLength={1} className="w-10 h-12 bg-white dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 rounded-xl text-center font-black dark:text-white outline-none" />
                    ))}
                  </div>
                  <button className="text-[10px] font-black text-gray-400 uppercase hover:text-blue-500 transition-colors">¿No te llegó el código? Reenviar</button>
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: DATOS DE LA CUENTA (Pantalla 3B) */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Correo validado y paso */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase">Correo validado ✅</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpenTextIcon size={32} />
                </div>
                <h3 className="text-lg font-black dark:text-white uppercase">Datos de la Cuenta</h3>
                <p className="text-xs text-gray-500 font-medium">Ingresa los datos solicitados para continuar con tu registro.</p>
              </div>
              <section className="space-y-4">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Building2 size={14} /> Datos del Negocio
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 relative">
                    <input type="text" placeholder="RUC" className="w-full pl-5 pr-32 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none" />
                    <button className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-gray-800 text-white text-[9px] font-black uppercase rounded-lg flex items-center gap-2">
                      <Search size={12}/> Consultar RUC
                    </button>
                  </div>
                  <input type="text" placeholder="Razón Social" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none md:col-span-2" />
                  <input type="text" placeholder="Nombre Comercial (Opcional)" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none md:col-span-2" />
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <User size={14} /> Contacto & Plan
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Contacto Principal" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none" />
                  <input type="text" placeholder="Teléfono" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none" />
                  <select className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none">
                    <option>Plan Estándar</option>
                    <option>Plan Pro</option>
                  </select>
                  <select className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none">
                    <option>Mensual</option>
                    <option>Anual</option>
                  </select>
                </div>
              </section>
              <section className="space-y-4">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileEdit size={14} /> Observaciones
                </h4>
                <textarea 
                  rows={4}
                  placeholder="Escribe aquí observaciones adicionales sobre la cuenta..."
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                ></textarea>
              </section>
            </div>
          )}

          {/* PASO 3: REGISTRAR PAGO (Pantalla 3C) */}
          {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">     
            {/* Título */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wallet size={32} />
              </div>
              <h3 className="text-lg font-black dark:text-white uppercase">Registra tu pago</h3>
              <p className="text-[11px] text-gray-500 font-medium">Registra tu pago para continuar.</p>
            </div>

            {/* Monto a pagar */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/10 flex justify-between items-center">
              <span className="text-xs font-black text-emerald-600 uppercase">Monto a pagar:</span>
              <span className="text-xl font-black text-emerald-600 tracking-tighter">S/ 150.00</span>
            </div>

            {/* MÉTODO DE PAGO */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Método de pago</h4>
              <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-900 rounded-2xl">
                <button 
                  onClick={() => setMetodoPago('transferencia')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${metodoPago === 'transferencia' ? 'bg-white dark:bg-gray-800 shadow-sm dark:text-white' : 'text-gray-400'}`}
                >
                  Transferencia bancaria
                </button>
                <button 
                  onClick={() => setMetodoPago('yape')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${metodoPago === 'yape' ? 'bg-white dark:bg-gray-800 shadow-sm dark:text-white' : 'text-gray-400'}`}
                >
                  Yape / Plin
                </button>
              </div>
            </div>

            {/* Información según método de pago */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-700">
              {metodoPago === 'transferencia' ? (
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Titular: Cistcorfact SAC</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-3 rounded-xl">
                      <span className="text-xs font-bold dark:text-gray-300">Nro. de cuenta: 123-4567890-0-22</span>
                      <button onClick={() => navigator.clipboard.writeText('123-4567890-0-22')} className="hover:text-blue-500 transition-colors">
                        <Copy size={14} className="text-gray-400" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-3 rounded-xl">
                      <span className="text-xs font-bold dark:text-gray-300">CCI: 002-123-456789000123-45</span>
                      <button onClick={() => navigator.clipboard.writeText('002-123-456789000123-45')} className="hover:text-blue-500 transition-colors">
                        <Copy size={14} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase text-center">Titular: Cistcorfact SAC</p>
                  <div className="grid grid-cols-2 gap-4">
                    {/* QR Yape */}
                    <div className="text-center space-y-2">
                      <div className="bg-white p-4 rounded-2xl flex justify-center">
                        <QrCode size={100} className="text-blue-500" />
                      </div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">QR Yape</p>
                      <div className="flex items-center justify-center gap-2 bg-white dark:bg-gray-900 p-2 rounded-xl">
                        <span className="text-[10px] font-bold">999 888 777</span>
                        <button onClick={() => navigator.clipboard.writeText('999888777')} className="hover:text-blue-500">
                          <Copy size={12} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                    {/* QR Plin */}
                    <div className="text-center space-y-2">
                      <div className="bg-white p-4 rounded-2xl flex justify-center">
                        <QrCode size={100} className="text-purple-500" />
                      </div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">QR Plin</p>
                      <div className="flex items-center justify-center gap-2 bg-white dark:bg-gray-900 p-2 rounded-xl">
                        <span className="text-[10px] font-bold">988 777 666</span>
                        <button onClick={() => navigator.clipboard.writeText('988777666')} className="hover:text-purple-500">
                          <Copy size={12} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-gray-400 text-center italic">Guarda el número de operación de tu pago para registrarlo aquí.</p>
                </div>
              )}
            </div>

            {/* 3. DATOS DEL PAGO */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">3. Datos del pago</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 ml-2 uppercase block mb-1">Nro. de operación:</label>
                  <input 
                    type="text" 
                    placeholder="" 
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 ml-2 uppercase block mb-1">Fecha de pago:</label>
                    <input 
                      type="date" 
                      className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 ml-2 uppercase block mb-1">Monto pagado:</label>
                    <input 
                      type="text" 
                      placeholder="S/" 
                      className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
       </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-between gap-3">
          {step > 1 ? (
            <button onClick={prevStep} className="px-6 py-4 flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-gray-700 transition-all">
              <ChevronLeft size={16} /> Volver
            </button>
          ) : (
            <div></div>
          )}
          
          <button 
            onClick={step === 3 ? onClose : nextStep}
            className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 flex items-center gap-2"
          >
            {step === 3 ? <><CheckCircle2 size={16} /> Finalizar Registro</> : <>Continuar <ChevronRight size={16} /></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NuevoClienteModal;
// src/components/ui/ConfirmDialog.tsx
import React from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = 'danger',
  isLoading = false
}) => {
  if (!isOpen) return null;

  const colors = {
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-red-500/20",
    warning: "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20",
    info: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
  };

  const iconColors = {
    danger: "text-red-600 bg-red-50 dark:bg-red-900/20",
    warning: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    info: "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={isLoading ? undefined : onClose} 
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-[#1c2128] w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-3 rounded-2xl ${iconColors[variant]}`}>
            <ExclamationTriangleIcon className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium px-4">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 ${colors[variant]}`}
          >
            {isLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
// D:\proyecto_prueba\frontend\src\components\ui\IconButton.tsx
import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface IconButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  title?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  variant = 'secondary',
  size = 'md',
  loading = false,
  title = 'Actualizar',
  className = '',
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20',
    secondary: 'bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-blue-500 hover:border-blue-200 dark:hover:border-blue-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20',
  };

  const sizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      title={title}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-xl
        transition-all
        duration-200
        hover:scale-105
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        flex
        items-center
        justify-center
        shadow-sm
        ${className}
      `}
    >
      {loading ? (
        <svg className={`animate-spin ${iconSizes[size]} text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        icon || <ArrowPathIcon className={iconSizes[size]} />
      )}
    </button>
  );
};

export default IconButton;
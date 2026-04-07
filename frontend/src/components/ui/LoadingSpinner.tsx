import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Cargando...', 
  fullScreen = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const content = (
    <div className="text-center">
      <ArrowPathIcon className={`${sizeClasses[size]} text-blue-500 animate-spin mx-auto mb-4`} />
      <p className="text-gray-500 dark:text-gray-400 font-bold">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0f1115]">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
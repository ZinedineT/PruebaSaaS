// src/hooks/useConfirm.ts
import { useState, useCallback } from 'react';

interface ConfirmOptions {
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  variant?: 'danger' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
}

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmOptions>({
    title: '',
    description: '',
    onConfirm: () => {},
    variant: 'danger',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar'
  });
  const [isLoading, setIsLoading] = useState(false);

  const ask = useCallback((options: ConfirmOptions) => {
    setConfig(options);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    try {
      await config.onConfirm();
    } finally {
      setIsLoading(false);
      close();
    }
  }, [config, close]);

  return {
    ask,
    confirmProps: {
      isOpen,
      title: config.title,
      description: config.description,
      variant: config.variant,
      confirmText: config.confirmText,
      cancelText: config.cancelText,
      onClose: close,
      onConfirm: handleConfirm,
      isLoading,
    }
  };
};
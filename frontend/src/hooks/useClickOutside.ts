import { useEffect, RefObject } from 'react';

/**
 * Hook para detectar clics fuera de un elemento
 * @param isOpen - Si el modal/menú está abierto
 * @param onClose - Función para cerrar
 * @param ref - Referencia al elemento que queremos monitorear
 */
export const useClickOutside = (
  isOpen: boolean,
  onClose: () => void,
  ref: RefObject<HTMLElement | null>  // ← Tipo corregido
) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Si la referencia no existe o el elemento no está en el DOM
      if (!ref.current) return;
      
      // Si el clic fue DENTRO del elemento, NO cerrar
      if (ref.current.contains(target)) return;
      
      // Si llegamos aquí, el clic fue FUERA → cerrar
      onClose();
    };

    // Usar 'mousedown' para mejor respuesta (se ejecuta antes que 'click')
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, ref]);
};
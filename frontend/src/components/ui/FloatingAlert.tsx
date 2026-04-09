// components/ui/FloatingAlert.tsx
import React, { useEffect } from "react";
import { CheckIcon, XMarkIcon, InformationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export type AlertType = "success" | "error" | "info" | "warning";

interface FloatingAlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
  duration?: number; // Tiempo en ms, 0 = no auto-cierre
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const icons = {
  success: CheckIcon,
  error: XMarkIcon,
  info: InformationCircleIcon,
  warning: ExclamationTriangleIcon,
};

const colors = {
  success: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-green-500",
    text: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  error: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-red-500",
    text: "text-red-600 dark:text-red-400",
    iconBg: "bg-red-100 dark:bg-red-900/30",
  },
  info: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  warning: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-yellow-500",
    text: "text-yellow-600 dark:text-yellow-400",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
  },
};

const positions = {
  "top-right": "top-5 right-5",
  "top-left": "top-5 left-5",
  "bottom-right": "bottom-5 right-5",
  "bottom-left": "bottom-5 left-5",
};

export const FloatingAlert: React.FC<FloatingAlertProps> = ({
  type,
  message,
  onClose,
  duration = 5000,
  position = "top-right",
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const Icon = icons[type];
  const color = colors[type];
  const positionClass = positions[position];

  return (
    <div
      className={`fixed ${positionClass} z-50 flex items-center p-4 rounded-xl shadow-2xl border animate-in slide-in-from-right-10 ${color.bg} ${color.border}`}
      role="alert"
    >
      <div className={`p-2 rounded-full mr-3 ${color.iconBg}`}>
        <Icon className={`w-5 h-5 ${color.text}`} />
      </div>
      <span className={`font-medium ${color.text} flex-1`}>{message}</span>
      <button
        onClick={onClose}
        className={`ml-4 ${color.text} hover:opacity-70 transition-opacity`}
        aria-label="Cerrar"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
// components/ui/ActionButton.tsx
import React from "react";

export type ActionType = "save" | "update" | "delete" | "create" | "cancel" | "custom";
export type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "outline";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  actionType?: ActionType;
  variant?: ButtonVariant;
  loadingText?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode; // Icono opcional
}

const actionLabels: Record<ActionType, { default: string; loading: string }> = {
  save: { default: "Guardar", loading: "Guardando..." },
  update: { default: "Actualizar", loading: "Actualizando..." },
  delete: { default: "Eliminar", loading: "Eliminando..." },
  create: { default: "Crear", loading: "Creando..." },
  cancel: { default: "Cancelar", loading: "Cancelando..." },
  custom: { default: "", loading: "" },
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30",
  secondary: "bg-gray-900 hover:bg-black text-white shadow-lg shadow-gray-500/30 dark:bg-blue-600 dark:hover:bg-blue-700",
  danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30",
  success: "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg shadow-yellow-500/30",
  outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950",
};

const sizeStyles = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  loading = false,
  actionType = "custom",
  variant = "primary",
  loadingText,
  children,
  fullWidth = false,
  size = "md",
  icon,
  disabled,
  className = "",
  onClick,
  ...props
}) => {
  const displayText = actionType !== "custom" && typeof children === "string" && !children
    ? actionLabels[actionType].default
    : children;

  const loadingDisplayText = loadingText || actionLabels[actionType].loading;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-xl font-bold transition-all active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        flex items-center justify-center gap-2
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingDisplayText}
        </>
      ) : (
        <>
          {icon}
          {displayText}
        </>
      )}
    </button>
  );
};
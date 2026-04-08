import React from "react";

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-[#0f1115] min-h-screen">
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        {children || (
          <div className="text-gray-400 text-sm">
            Contenido en construcción...
          </div>
        )}
      </div>
    </div>
  );
};

export default PageWrapper;
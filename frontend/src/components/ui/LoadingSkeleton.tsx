import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'chart' | 'dashboard';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'dashboard', 
  count = 1 
}) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="mt-4">
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 animate-pulse">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Dashboard completo (default)
  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-50/50 dark:bg-[#0f1115] min-h-screen">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
      
      {/* Cards skeleton */}
      <LoadingSkeleton type="card" count={4} />
      
      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#161b22] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 animate-pulse">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export { LoadingSpinner, LoadingSkeleton };
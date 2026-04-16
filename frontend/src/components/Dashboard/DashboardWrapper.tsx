// src/components/DashboardWrapper.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import Dashboard from '../../pages/dashboard/Dashboard';

const DashboardWrapper: React.FC = () => {
  const { canSeeDashboard, getDefaultRoute } = usePermissions();
  
  if (!canSeeDashboard()) {
    return <Navigate to={getDefaultRoute()} replace />;
  }
  
  return <Dashboard />;
};

export default DashboardWrapper;
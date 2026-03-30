// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import GestionUsuarios from './pages/GestionUsuarios/GestionUsuarios'; 
import GestionPlanes from './pages/GestionPlanes/GestionPlanes';
import Planes from './pages/Planes/Planes';
import Contabilidad from './pages/Contabilidad/Contabilidad';
import Configuracion from './pages/Configuracion/Configuracion';
import Actualizacion from './pages/Actualizacion/Actualizacion';
import Backup from './pages/Backup/Backup';
import Informacion from './pages/Informacion/Informacion';
import Wiki from './pages/Wiki/Wiki';
import Logs from './pages/Logs/Logs';
import Reportes from './pages/Reportes/Reportes';
import Perfil from './pages/Perfil/Perfil';

// Componente para rutas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Cargando...</div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Componente que contiene las rutas con autenticación
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Ruta pública */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
      />
      
      {/* Rutas protegidas con Layout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <Layout>
              <Perfil />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/usuarios" 
        element={
          <ProtectedRoute>
            <Layout>
              <GestionUsuarios />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/planes" 
        element={
          <ProtectedRoute>
            <Layout>
              <Planes />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/gestion-planes" 
        element={
          <ProtectedRoute>
            <Layout>
              <GestionPlanes />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/contabilidad" 
        element={
          <ProtectedRoute>
            <Layout>
              <Contabilidad />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/configuracion" 
        element={
          <ProtectedRoute>
            <Layout>
              <Configuracion />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/actualizacion" 
        element={
          <ProtectedRoute>
            <Layout>
              <Actualizacion />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/backup" 
        element={
          <ProtectedRoute>
            <Layout>
              <Backup />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/informacion" 
        element={
          <ProtectedRoute>
            <Layout>
              <Informacion />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/wiki" 
        element={
          <ProtectedRoute>
            <Layout>
              <Wiki />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/logs" 
        element={
          <ProtectedRoute>
            <Layout>
              <Logs />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/reportes" 
        element={
          <ProtectedRoute>
            <Layout>
              <Reportes />
            </Layout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
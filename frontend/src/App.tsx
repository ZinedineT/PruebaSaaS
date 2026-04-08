// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import GestionUsuarios from "./pages/configuracion/GestionUsuarios";
import GestionPlanes from "./pages/clientes/GestionPlanes";
import Planes from "./pages/configuracion/Planes";
import Contabilidad from "./pages/operaciones/Contabilidad";
import Configuracion from "./pages/configuracion/Configuracion";
import Backup from "./pages/plataforma/Backup";
import Informacion from "./pages/plataforma/Informacion";
import Logs from "./pages/plataforma/Logs";
import Perfil from "./pages/auth/Perfil";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Componente para rutas protegidas
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  role?: string;
}> = ({ children, role }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <LoadingSpinner message="Cargando vista principal..." fullScreen={true} />
    );
  }

  // Primero validar auth
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // Luego validar rol (solo si existe user)
  if (role && user && user.role !== role) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
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
          <ProtectedRoute role="super_admin">
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
        path="/suscripciones"
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
        path="/logs"
        element={
          <ProtectedRoute>
            <Layout>
              <Logs />
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

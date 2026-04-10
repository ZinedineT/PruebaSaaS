// src/App.tsx
import React from "react";
import { BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import { Toaster } from 'sonner';
import './styles/ui/toaster.css';
import { ThemeProvider, useTheme} from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

// Clientes
import Clientes from "./pages/clientes/Clientes";
import GestionPlanes from "./pages/clientes/GestionPlanes";
import Onboarding from "./pages/clientes/Onboarding";

// Operaciones
import Operaciones from "./pages/operaciones/Operaciones";
import Contabilidad from "./pages/operaciones/Contabilidad";

// Configuración
import Configuracion from "./pages/configuracion/Configuracion";
import GestionUsuarios from "./pages/configuracion/GestionUsuarios";
import Planes from "./pages/configuracion/Planes";

// Auditoría
import Auditoria from "./pages/auditoria/Auditoria";

// Plataforma
import Backup from "./pages/plataforma/Backup";
import Informacion from "./pages/plataforma/Informacion";
import Logs from "./pages/plataforma/Logs";
import Procesos from "./pages/plataforma/Procesos";

// Auth
import Perfil from "./pages/auth/Perfil";

// UI
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

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user && user.role !== role) return <Navigate to="/" />;

  return <>{children}</>;
};

// Componente principal de rutas
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  return (
   <>  
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        expand={false} 
        theme={theme}
        toastOptions={{
          className: 'my-custom-toast',
          style: {
            borderRadius: '1.25rem', // Equivale a rounded-2xl
          },
        }}
      />
    <Routes>
      {/* Ruta pública */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />

      {/* Dashboard */}
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

      {/* Clientes */}
      <Route
        path="/clientes"
        element={
          <ProtectedRoute>
            <Layout>
              <Clientes />
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
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Layout>
              <Onboarding />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Operaciones */}
      <Route
        path="/operaciones"
        element={
          <ProtectedRoute>
            <Layout>
              <Operaciones />
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

      {/* Configuración */}
      <Route
        path="/configuracion/planes"
        element={
          <ProtectedRoute>
            <Layout>
              <Planes />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracion/global"
        element={
          <ProtectedRoute>
            <Layout>
              <Configuracion />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracion/seguridad"
        element={
          <ProtectedRoute>
            <Layout>
              <Configuracion />
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
        path="/usuarios"
        element={
          <ProtectedRoute role="super_admin">
            <Layout>
              <GestionUsuarios />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Auditoría */}
      <Route
        path="/auditoria"
        element={
          <ProtectedRoute>
            <Layout>
              <Auditoria />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Plataforma */}
      <Route
        path="/plataforma/procesos"
        element={
          <ProtectedRoute>
            <Layout>
              <Procesos />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/plataforma/mantenimiento"
        element={
          <ProtectedRoute>
            <Layout>
              <Backup />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/plataforma/herramientas"
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

      {/* Sistema */}
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

      {/* Perfil */}
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
    </Routes>
    </> 
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
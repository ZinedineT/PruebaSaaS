import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Planes from './pages/Planes/Planes';
import Contabilidad from './pages/Contabilidad/Contabilidad';
import Configuracion from './pages/Configuracion/Configuracion';
import Actualizacion from './pages/Actualizacion/Actualizacion';
import Backup from './pages/Backup/Backup';
import Informacion from './pages/Informacion/Informacion';
import Wiki from './pages/Wiki/Wiki';
import Logs from './pages/Logs/Logs';
import Reportes from './pages/Reportes/Reportes';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planes" element={<Planes />} />
            <Route path="/contabilidad" element={<Contabilidad />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/actualizacion" element={<Actualizacion />} />
            <Route path="/backup" element={<Backup />} />
            <Route path="/informacion" element={<Informacion />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
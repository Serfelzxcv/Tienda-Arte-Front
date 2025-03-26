import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/protected_route';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/pages/Home/Home';
import AlbumsContent from './components/pages/albums/Albums';
import PaintingsContent from './components/pages/paintings/Paintings';
import SculpturesContent from './components/pages/sculptures/Sculptures';


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />}>
            <Route index element={<Navigate to="paintings" replace />} />
            <Route path="paintings" element={<PaintingsContent />} />
            <Route path="sculptures" element={<SculpturesContent />} />
            <Route path="albums" element={<AlbumsContent />} />
          </Route>
          
          {/* Redirección desde la raíz */}
          <Route path="/" element={<Navigate to="/home/paintings" replace />} />
        </Route>

        {/* Ruta de fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
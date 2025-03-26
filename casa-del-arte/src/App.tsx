import { Navigate, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { AuthProvider } from './context/auth_context';
import ProtectedRoute from './components/protected_route';
import Login from './components/login/Login';
import Register from './components/register/register';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          {/* Otras rutas protegidas */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
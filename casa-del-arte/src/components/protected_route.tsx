import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth_context';
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
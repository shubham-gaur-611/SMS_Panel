import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // If not logged in, redirect to login page
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render child routes
  return <Outlet />;
};


export const LoginRoute = () => {
  const { isAuthenticated } = useAuth();

  // If logged in, redirect to dashboard
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in, render child routes
  return <Outlet />;
};
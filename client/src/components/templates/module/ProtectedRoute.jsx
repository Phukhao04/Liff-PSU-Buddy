import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllow, redirect = '/', children }) => {
  if (!isAllow) return <Navigate to={redirect} replace />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

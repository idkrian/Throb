import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Gate for the authenticated app shell. Sends unauthenticated (or expired)
 * visitors to /login, remembering where they were headed.
 */
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

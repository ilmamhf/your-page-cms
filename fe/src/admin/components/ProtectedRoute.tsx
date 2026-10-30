import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../../api/token";

/**
 * Guards every /admin route. No token -> bounce to the login page.
 */
const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

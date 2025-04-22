import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <Outlet />; // Renderiza as rotas filhas
};

export default ProtectedRoute;
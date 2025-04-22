import { Auth, Dashboard, Modules } from "@/layouts";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { clearAuthToken, isTokenExpired } from "./utils/auth";
import ProtectedRoute from "./components/protected-route";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      if (location.pathname.startsWith('/auth/sign-in')) return;

      if (isTokenExpired()) {
        clearAuthToken();
        navigate('/auth/sign-in', { replace: true });
      }
    };

    if (!location.pathname.startsWith('/auth/sign-in')) {
      checkAuth();
    }

    const intervalId = setInterval(checkAuth, 60000);
    return () => clearInterval(intervalId);
  }, [location.pathname, navigate]);

  return (
    <Routes>
      {/* Rotas protegidas - agora usando Outlet */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/dashboard/" element={<Navigate to="/dashboard/home" replace />} />
        <Route path="/modules/" element={<Navigate to="/dashboard/home" replace />} />
        <Route path="/modules/*" element={<Modules />} />
      </Route>
      
      {/* Rotas públicas */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
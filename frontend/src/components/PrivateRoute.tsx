// src/components/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (user) return <Outlet />;

  if (loading) return <div style={{ padding: 24 }}>Carregando...</div>;

  return <Navigate to="/login" replace state={{ from: location }} />;
}

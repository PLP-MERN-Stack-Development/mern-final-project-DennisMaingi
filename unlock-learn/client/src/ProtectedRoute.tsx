// src/ProtectedRoute.tsx
import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactElement; // ✅ single valid React element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Optional: show loading indicator while checking auth
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return user ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;

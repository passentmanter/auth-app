// guards/GuestGuard.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface GuestGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: GuestGuardProps) => {
  // const { isAuthenticated, isLoading } = useAuth();

  const isAuthenticated = false;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
};

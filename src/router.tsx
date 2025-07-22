import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, ReactNode, Suspense } from "react";
import { AuthGuard } from "./guards/AuthGuard";
import { GuestGuard } from "./guards/GuestGuard";
import GuestLayout from "./layouts/GuestLayout";
import DashboardLayout from "./layouts/DashboardLayout";


const LoginPage = lazy(() => import("./pages/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const OTP = lazy(() => import("./pages/OTPVerification"));

const Dashboard = lazy(() => import("./pages/DashboardPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const withSuspense = (Component: ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{Component}</Suspense>
);

export const router = createBrowserRouter([
  // Redirect root to dashboard
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  // Guest-only routes with shared GuestLayout
  {
    element: (
      <GuestGuard>
        <GuestLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "login",
        element: withSuspense(<LoginPage />),
      },
      {
        path: "register",
        element: withSuspense(<Register />),
      },
      {
        path: "otp",
        element: withSuspense(<OTP />),
      },
    ],
  },

  // Auth-only routes with dashboard layout
  {
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "dashboard",
        element: withSuspense(<Dashboard />),
      },
    ],
  },

  // Not Found route
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
]);

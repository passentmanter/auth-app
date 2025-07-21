// layouts/Layout.tsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      {/* Add shared nav/header here */}
      <Outlet />
    </div>
  );
}

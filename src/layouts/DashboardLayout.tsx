import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-blue-600 text-white p-4">MyApp Header</header>
    <main className="flex-grow p-4">
      <Outlet />
    </main>
    <footer className="bg-gray-200 text-center p-4">© 2025 MyApp</footer>
  </div>
);

export default DashboardLayout;

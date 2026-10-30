import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-app md:h-screen md:flex-row md:overflow-hidden">
      {/* sidebar: top bar on small screens, fixed rail on desktop */}
      <Sidebar />

      <main className="flex-1 overflow-auto bg-app">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

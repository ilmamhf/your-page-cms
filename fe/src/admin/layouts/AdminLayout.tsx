import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* sidebar */}
      <Sidebar />

      <main className="flex-1 w-full overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

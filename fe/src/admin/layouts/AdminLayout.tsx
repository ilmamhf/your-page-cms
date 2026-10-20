import { Link, Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* sidebar */}
      <Sidebar />

      <main className="p-4 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

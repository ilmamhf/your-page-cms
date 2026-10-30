import { Link, useNavigate } from "react-router";
import api from "../../api/axios";
import { clearToken } from "../../api/token";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch {
      // token may already be invalid; log out locally either way
    } finally {
      clearToken();
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside className="border-r h-screen w-[240px] flex flex-col items-center p-4 bg-indigo-950 text-amber-50">
      <Link
        to={"/admin"}
        className="flex text-2xl"
      >
        MyBussAdmin
      </Link>

      <nav className="mt-4 px-2 space-y-2">
        <Link
          to={"/admin"}
          className="flex"
        >
          Dashboard
        </Link>
        <Link
          to={"/admin/website"}
          className="flex"
        >
          Website
        </Link>
        <Link
          to={"/admin/content"}
          className="flex"
        >
          Content
        </Link>
        <Link
          to={"/admin/profile"}
          className="flex"
        >
          Profile
        </Link>
      </nav>

      <button
        className="mt-auto border border-amber-50 px-3 py-1 text-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;

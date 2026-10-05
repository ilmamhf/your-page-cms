import { Link, Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="">
      {/* sidebar */}
      <aside className="border-r h-screen w-[240px] fixed flex flex-col items-center p-4">
        <Link
          to={"/admin"}
          className="flex"
        >
          MyBussAdmin
        </Link>
        <nav className="mt-4 px-2 space-y-1">
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
            to={"/admin/settings"}
            className="flex"
          >
            Settings
          </Link>
        </nav>
      </aside>

      <main className="ml-[240px] p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

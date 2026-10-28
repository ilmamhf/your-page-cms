import { Link } from "react-router";

const Sidebar = () => {
  return (
    <aside className="border-r h-screen w-[240px] flex flex-col items-center p-4">
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
    </aside>
  );
};

export default Sidebar;

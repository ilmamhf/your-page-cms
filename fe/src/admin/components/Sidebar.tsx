import { Link, NavLink, useNavigate } from "react-router";
import api from "../../api/axios";
import { clearToken } from "../../api/token";
import Icon from "../../components/Icon";
import type { IconName } from "../../components/Icon";
import Logo from "../../components/Logo";

type NavItem = { to: string; label: string; icon: IconName; end?: boolean };

const groups: { label?: string; items: NavItem[] }[] = [
  {
    items: [{ to: "/admin", label: "Dashboard", icon: "layout", end: true }],
  },
  {
    label: "Website",
    items: [{ to: "/admin/website", label: "Sections", icon: "layers" }],
  },
  {
    label: "Content",
    items: [{ to: "/admin/content", label: "Services & Work", icon: "image" }],
  },
  {
    label: "Settings",
    items: [{ to: "/admin/profile", label: "Business Info", icon: "user" }],
  },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-primary text-white"
      : "text-white/60 hover:bg-white/5 hover:text-white",
  ].join(" ");

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
    <aside className="flex shrink-0 items-center gap-3 border-b border-navy-soft bg-navy px-4 py-3 md:h-screen md:w-[248px] md:flex-col md:items-stretch md:gap-0 md:border-b-0 md:border-r md:px-4 md:py-5">
      <Link
        to={"/admin"}
        className="flex items-center gap-2.5 md:mb-6"
      >
        <Logo
          name="MyBussAdmin"
          size="sm"
        />
        <span className="hidden truncate font-semibold text-white md:inline">
          MyBussAdmin
        </span>
      </Link>

      <nav className="flex flex-1 items-center gap-1 overflow-x-auto md:w-full md:flex-col md:items-stretch md:gap-0 md:overflow-visible">
        {groups.map((group, i) => (
          <div
            key={group.label ?? i}
            className="flex items-center gap-1 md:mb-4 md:block"
          >
            {group.label && (
              <span
                className="hidden px-3 pb-1.5 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/35 md:block"
                aria-hidden="true"
              >
                {group.label}
              </span>
            )}
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
                title={item.label}
              >
                <Icon
                  name={item.icon}
                  className="size-4 shrink-0"
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <button
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white md:mt-auto"
        onClick={handleLogout}
      >
        <Icon
          name="arrow-up-right"
          className="size-4 shrink-0"
        />
        <span className="whitespace-nowrap">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;

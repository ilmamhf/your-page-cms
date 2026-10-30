import { useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import api from "../../api/axios";
import { applyTheme } from "../../utils/color";

const AdminLayout = () => {
  // Apply theme colors from CMS profile
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await api.get("/website-profile-cms");
        const data = response.data.data;
        const primary = data.website_profile?.theme_primary;
        const secondary = data.website_profile?.theme_secondary;
        if (primary && secondary) {
          applyTheme(primary, secondary);
        } else {
          applyTheme(null, null);
        }
      } catch {
        // Ignore - theme will fall back to defaults
        applyTheme(null, null);
      }
    };
    fetchTheme();
  }, []);

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

import "./App.css";
import { Route, Routes } from "react-router";
import WebsiteLayout from "./website/layouts/WebsiteLayout";
import AdminLayout from "./admin/layouts/AdminLayout";
import Website from "./admin/pages/website/Website";
import Content from "./admin/pages/Content";
import Dashboard from "./admin/pages/Dashboard";
import Settings from "./admin/pages/Settings";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<WebsiteLayout />}
      />
      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route
          index
          element={<Dashboard />}
        />
        <Route
          path="website"
          element={<Website />}
        />
        <Route
          path="content"
          element={<Content />}
        />
        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>
    </Routes>
  );
}

export default App;

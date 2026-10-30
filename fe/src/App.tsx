import "./App.css";
import { Route, Routes } from "react-router";
import WebsiteLayout from "./website/layouts/WebsiteLayout";
import AdminLayout from "./admin/layouts/AdminLayout";
import Website from "./admin/pages/website/WebsitePage";
import ContentPage from "./admin/pages/content/ContentPage";
import Dashboard from "./admin/pages/Dashboard";
import LoginPage from "./admin/pages/LoginPage";
import ProfilePage from "./admin/pages/ProfilePage";
import ProtectedRoute from "./admin/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<WebsiteLayout />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        element={<ProtectedRoute />}
      >
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
            element={<ContentPage />}
          />
          <Route
            path="profile"
            element={<ProfilePage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router";
import WebsiteLayout from "./website/layouts/WebsiteLayout";
import AdminLayout from "./admin/layouts/AdminLayout";

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
      />
    </Routes>
  );
}

export default App;

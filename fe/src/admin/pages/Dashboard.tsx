import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl pb-2">Welcome to the CMS</h1>
      <p className="pb-4 text-gray-600">
        Manage everything that shows up on your landing page.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/website"
          className="border p-4 hover:bg-gray-50"
        >
          <div className="text-xl">Website</div>
          <p className="text-sm text-gray-600">Pages, sections and hero content.</p>
        </Link>
        <Link
          to="/admin/content"
          className="border p-4 hover:bg-gray-50"
        >
          <div className="text-xl">Content</div>
          <p className="text-sm text-gray-600">Services, portofolios and metrics.</p>
        </Link>
        <Link
          to="/admin/profile"
          className="border p-4 hover:bg-gray-50"
        >
          <div className="text-xl">Profile</div>
          <p className="text-sm text-gray-600">Company info and social media.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

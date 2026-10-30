import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../../api/axios";
import { errorMessage } from "../../api/error";
import FeedbackBar from "../components/FeedbackBar";
import Icon from "../../components/Icon";
import type { IconName } from "../../components/Icon";
import type { LandingPageData, ContentsData } from "../../types/landing";

const emptyContents: ContentsData = {
  services: [],
  portofolios: [],
  metrics: [],
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    pages: 0,
    sections: 0,
    services: 0,
    portofolios: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCounts = async () => {
    setLoading(true);
    setError(null);

    try {
      const [sectionsRes, contentRes] = await Promise.all([
        api.get("/sections-cms"),
        api.get("/content-cms"),
      ]);

      const pages = (sectionsRes.data.data as LandingPageData).pages ?? [];
      const content = { ...emptyContents, ...contentRes.data.data };

      setStats({
        pages: pages.length,
        sections: pages.reduce((total, page) => total + page.sections.length, 0),
        services: content.services.length,
        portofolios: content.portofolios.length,
      });
    } catch (err) {
      setError(errorMessage(err, "Failed to load the dashboard."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const statItems: { label: string; value: number; icon: IconName }[] = [
    { label: "Pages", value: stats.pages, icon: "layout" },
    { label: "Sections", value: stats.sections, icon: "layers" },
    { label: "Services", value: stats.services, icon: "image" },
    { label: "Portfolio projects", value: stats.portofolios, icon: "check" },
  ];

  const quickLinks: { to: string; title: string; description: string }[] = [
    {
      to: "/admin/website",
      title: "Sections",
      description: "Pages, sections and hero content.",
    },
    {
      to: "/admin/content",
      title: "Content",
      description: "Services, portofolios and metrics.",
    },
    {
      to: "/admin/profile",
      title: "Business info",
      description: "Company details and social media.",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.01em]">Dashboard</h1>
          <p className="mt-1 text-sm text-mute">
            Manage everything that shows up on your landing page.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
        >
          View site
          <Icon
            name="arrow-up-right"
            className="size-4"
          />
        </a>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2">
          <div className="flex-1">
            <FeedbackBar
              type="error"
              message={error}
            />
          </div>
          <button
            className="btn-outline shrink-0 px-3 py-1.5 text-xs"
            onClick={fetchCounts}
          >
            Retry
          </button>
        </div>
      )}

      {/* one stat strip, cells divided like the kit's summary panel */}
      <div className="panel grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="border-t border-line p-5 md:border-t-0"
          >
            <div className="flex items-center gap-2 text-mute">
              <Icon
                name={stat.icon}
                className="size-4"
              />
              <p className="text-sm">{stat.label}</p>
            </div>
            <p className="mt-2 text-3xl font-bold tracking-[-0.02em] tabular-nums">
              {loading ? "—" : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* quick actions as a list of rows */}
      <div className="panel mt-6 divide-line">
        <p className="border-b border-line px-5 py-4 text-sm font-semibold">
          Quick actions
        </p>
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="group flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0"
          >
            <span className="font-semibold transition-colors group-hover:text-primary">
              {link.title}
            </span>
            <p className="flex-1 text-sm leading-relaxed text-mute">
              {link.description}
            </p>
            <Icon
              name="arrow-right"
              className="size-4 shrink-0 text-mute transition-colors group-hover:text-primary"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

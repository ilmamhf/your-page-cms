import { useEffect, useState } from "react";
import api from "../../api/axios";
import { errorMessage } from "../../api/error";
import type { LandingPageData, Page } from "../../types/landing";
import Icon from "../../components/Icon";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ContactSection from "../sections/ContactSection";
import SectionRenderer from "../components/SectionRenderer";
import { applyTheme } from "../../utils/color";

const WebsiteLayout = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [profile, setProfile] = useState<LandingPageData["website_profile"]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLandingPage = async () => {
    try {
      const response = await api.get("/landing-page");
      const landingData = response.data.data as LandingPageData;

      setPages(landingData.pages);
      setProfile(landingData.website_profile ?? null);
    } catch (err) {
      setError(errorMessage(err, "Failed to load the page."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLandingPage();
  }, []);

  // Apply theme colors from profile to CSS custom properties
  useEffect(() => {
    if (profile?.theme_primary && profile?.theme_secondary) {
      applyTheme(profile.theme_primary, profile.theme_secondary);
    } else {
      applyTheme(null, null);
    }
  }, [profile?.theme_primary, profile?.theme_secondary]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchLandingPage();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Icon
          name="spinner"
          className="size-5 animate-spin text-primary"
        />
        <span className="ml-3 text-sm text-mute">Loading the page…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center px-6">
        <div className="panel flex max-w-md flex-col items-start gap-4 p-8">
          <div className="flex items-center gap-3 text-red-600">
            <Icon
              name="alert"
              className="size-5 shrink-0"
            />
            <p className="text-sm">{error}</p>
          </div>
          <button
            className="btn-outline"
            onClick={handleRetry}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar companyName={profile?.name} />

      <main>
        {pages.map((page: Page, pageIndex) => (
          <div
            key={page.id}
            id={page.name.toLowerCase()}
            className="scroll-mt-16"
          >
            {page.sections.map((section, sectionIndex) => (
              <SectionRenderer
                section={section}
                key={section.id}
                isLead={pageIndex === 0 && sectionIndex === 0}
              />
            ))}
          </div>
        ))}

        <div id="contact">
          <ContactSection
            email={profile?.email ?? undefined}
            phone={profile?.phone_number ?? undefined}
          />
        </div>
      </main>

      <Footer
        companyName={profile?.name}
        location={profile?.location}
        socialMedias={profile?.social_medias ?? []}
        email={profile?.email}
        phone={profile?.phone_number}
      />
    </div>
  );
};

export default WebsiteLayout;

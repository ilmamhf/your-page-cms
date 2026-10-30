import { useEffect, useState } from "react";
import api from "../../api/axios";
import { errorMessage } from "../../api/error";
import type { LandingPageData, Page } from "../../types/landing";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ContactSection from "../sections/ContactSection";
import SectionRenderer from "../components/SectionRenderer";

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

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchLandingPage();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <p className="text-red-600">{error}</p>
        <button
          className="border px-4 py-2"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="md:px-8 xl:px-40">
      <Navbar companyName={profile?.name} />
      <div>
        {pages.map((page: Page) => (
          <div
            key={page.id}
            id={page.name.toLowerCase()}
            className="scroll-mt-24"
          >
            {page.sections.map((section) => (
              <SectionRenderer
                section={section}
                key={section.id}
              />
            ))}
          </div>
        ))}
        <div id="contact">
          <ContactSection />
        </div>
        <Footer
          companyName={profile?.name}
          location={profile?.location}
          socialMedias={profile?.social_medias ?? []}
        />
      </div>
    </div>
  );
};

export default WebsiteLayout;

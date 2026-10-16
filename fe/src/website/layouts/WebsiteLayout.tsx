import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ContactSection from "../sections/ContactSection";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import type { Page, LandingPageData } from "../../types/landing";
import SectionRenderer from "../components/SectionRenderer";

const WebsiteLayout = () => {
  const [pages, setPages] = useState<Page[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  const fetchLandingPage = async () => {
    try {
      const response = await api.get("/landing-page");
      const landingData = response.data.data as LandingPageData;
      setPages(landingData.pages);
      console.log(pages);
    } catch (err) {
      console.error("Error getting data: ", err);
    }
  };

  useEffect(() => {
    fetchLandingPage();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {pages.map((page: Page) => (
          <div
            key={page.id}
            id={page.name.toLowerCase()}
          >
            {page.sections.map((section) => (
              <SectionRenderer
                section={section}
                key={section.id}
              />
            ))}
          </div>
        ))}
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default WebsiteLayout;

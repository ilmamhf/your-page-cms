import CardProject from "../components/CardProject";
import CardService from "../components/CardService";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SectionCard from "../sections/SectionCard";
import ContactSection from "../sections/ContactSection";
import GridProject from "../sections/GridProject";
import GridService from "../sections/GridService";
import HeroSection1 from "../sections/HeroSection1";
import HeroSection2 from "../sections/HeroSection2";
import HeroSection3 from "../sections/HeroSection3";
import testImage from "../../assets/vite.svg";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import type { Page, ApiResponse, LandingPageData } from "../../types/landing";
import SectionRenderer from "../components/SectionRenderer";

const WebsiteLayout = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
              <SectionRenderer section={section} />
            ))}
          </div>
        ))}
        {/* <section>
          <HeroSection1
            hero_text="Hello Cruel World :)"
            image_url={testImage}
          ></HeroSection1>

          <section className="flex p-8 gap-8 justify-between">
            <CardService name="Web Development" />
            <CardService />
            <CardService />
          </section>

          <SectionCard
            title="Featured Work"
            description="Our latest projects"
          >
            <CardProject />
            <CardProject />
            <CardProject />
          </SectionCard>
        </section>

        <section>
          <HeroSection2 />
          <HeroSection3 />
        </section>

        <section>
          <HeroSection1 />
          <GridService />
          <GridService />
        </section>

        <section>
          <HeroSection1 />
          <GridProject />
          <GridProject />
        </section> */}

        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default WebsiteLayout;

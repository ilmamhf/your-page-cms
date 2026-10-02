import CardProject from "../components/CardProject";
import CardService from "../components/CardService";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SectionCard from "../components/SectionCard";
import ContactSection from "../sections/ContactSection";
import GridProject from "../sections/GridProject";
import GridService from "../sections/GridService";
import HeroSection1 from "../sections/HeroSection1";
import HeroSection2 from "../sections/HeroSection2";
import HeroSection3 from "../sections/HeroSection3";
import testImage from "../../assets/vite.svg";

const WebsiteLayout = () => {
  return (
    <>
      <Navbar />
      <div>
        <section>
          <HeroSection1
            hero="Hello Cruel World :)"
            image={testImage}
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
        </section>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default WebsiteLayout;

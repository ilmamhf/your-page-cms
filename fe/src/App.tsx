import "./App.css";
import CardProject from "./components/CardProject";
import CardService from "./components/CardService";
import HeroSection1 from "./sections/HeroSection1";
import HeroSection2 from "./sections/HeroSection2";
import HeroSection3 from "./sections/HeroSection3";
import Navbar from "./components/Navbar";
import testImage from "./assets/vite.svg";
import SectionCard from "./components/SectionCard";
import ServiceGrid from "./sections/GridService";
import ProjectGrid from "./sections/GridProject";
import ContactSection from "./sections/ContactSection";
import Footer from "./components/Footer";

function App() {
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
          <ServiceGrid />
          <ServiceGrid />
        </section>

        <section>
          <HeroSection1 />
          <ProjectGrid />
          <ProjectGrid />
        </section>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default App;

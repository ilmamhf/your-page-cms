import type { PortofolioItem, Section, ServiceItem } from "../../types/landing";
import GridProject from "../sections/GridProject";
import GridService from "../sections/GridService";
import HeroSection1 from "../sections/HeroSection1";
import HeroSection3 from "../sections/HeroSection3";
import SectionCard from "../sections/SectionCard";

interface SectionRendererProps {
  section: Section;
}

const SectionRenderer = ({ section }: SectionRendererProps) => {
  //   if only list of singular items, use item cards, else use section with title etc
  console.log("Hero text:", section.hero_detail?.hero_text);
  if (!section.title) {
    switch (section.section_type) {
      case "services": {
        return <GridService services={section.items as ServiceItem[]} />;
      }

      case "portofolios": {
        return <GridProject projects={section.items as PortofolioItem[]} />;
      }
    }
  } else {
    switch (section.section_type) {
      case "hero":
        return (
          <HeroSection1
            eyebrow={section.hero_detail?.eyebrow}
            hero_text={section.hero_detail?.hero_text}
            description={section.hero_detail?.description}
            image_url={section.hero_detail?.image_url}
          />
        );

      case "services":
        return <SectionCard section={section} />;

      case "portofolios":
        return <SectionCard section={section} />;

      case "metrics":
        return <HeroSection3 section={section} />;
    }
  }
};

export default SectionRenderer;

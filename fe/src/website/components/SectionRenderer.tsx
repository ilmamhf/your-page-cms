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
  // sections without a title render as a plain grid of item cards,
  // sections with a title get the full card layout around them
  if (!section.title) {
    switch (section.section_type) {
      case "services":
        return <GridService services={(section.items ?? []) as ServiceItem[]} />;

      case "portofolios":
        return <GridProject projects={(section.items ?? []) as PortofolioItem[]} />;

      default:
        return null;
    }
  }

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
    case "portofolios":
      return <SectionCard section={section} />;

    case "metrics":
      return <HeroSection3 section={section} />;

    default:
      return null;
  }
};

export default SectionRenderer;

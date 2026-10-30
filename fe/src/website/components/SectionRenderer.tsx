import type { PortofolioItem, Section, ServiceItem } from "../../types/landing";
import GridProject from "../sections/GridProject";
import GridService from "../sections/GridService";
import HeroSection1 from "../sections/HeroSection1";
import HeroSection3 from "../sections/HeroSection3";
import SectionCard from "../sections/SectionCard";

interface SectionRendererProps {
  section: Section;
  /** True for the first section on the page — it gets the full hero. */
  isLead?: boolean;
}

const SectionRenderer = ({ section, isLead = false }: SectionRendererProps) => {
  // Item grids without a title render as a plain grid of cards;
  // everything else gets a heading treatment.
  if (
    !section.title &&
    (section.section_type === "services" || section.section_type === "portofolios")
  ) {
    switch (section.section_type) {
      case "services":
        return (
          <section className="shell border-t border-line py-10 md:py-12">
            <GridService services={(section.items ?? []) as ServiceItem[]} />
          </section>
        );

      case "portofolios":
        return (
          <section className="shell border-t border-line py-10 md:py-12">
            <GridProject projects={(section.items ?? []) as PortofolioItem[]} />
          </section>
        );

      default:
        return null;
    }
  }

  switch (section.section_type) {
    case "hero":
      return (
        <HeroSection1
          variant={isLead ? "lead" : "banner"}
          eyebrow={section.hero_detail?.eyebrow}
          hero_text={section.hero_detail?.hero_text ?? section.title}
          description={section.hero_detail?.description ?? section.subtitle ?? undefined}
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

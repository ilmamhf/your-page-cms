import type { PortofolioItem, Section, ServiceItem } from "../../types/landing";
import GridService from "./GridService";
import GridProject from "./GridProject";

interface SectionCardProps {
  section: Section;
}

const SectionCard = ({ section }: SectionCardProps) => {
  const isPortfolio = section.section_type === "portofolios";

  const renderItems = () => {
    const items = section.items ?? [];

    switch (section.section_type) {
      case "services":
        return <GridService services={items as ServiceItem[]} />;
      case "portofolios":
        return <GridProject projects={items as PortofolioItem[]} />;
      default:
        return null;
    }
  };

  return (
    <section className="shell border-t border-line py-14 md:py-16">
      {/* header row, like the kit's "Our Featured Work" */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[54ch]">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-ink md:text-3xl">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="mt-2 text-base leading-relaxed text-mute">
              {section.subtitle}
            </p>
          )}
        </div>

        {isPortfolio && (
          <a
            href="#portofolio"
            className="shrink-0 text-sm font-semibold text-primary transition-colors hover:text-primary-deep"
          >
            View all projects
          </a>
        )}
      </div>

      {renderItems()}
    </section>
  );
};

export default SectionCard;

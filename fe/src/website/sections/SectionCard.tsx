import type { PortofolioItem, Section, ServiceItem } from "../../types/landing";
import GridService from "./GridService";
import GridProject from "./GridProject";

interface SectionCardProps {
  section: Section;
}

const SectionCard = ({ section }: SectionCardProps) => {
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
    <section className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">{section.title}</h1>
          <p>{section.subtitle}</p>
        </div>
      </div>
      <div className="-mx-8 ">{renderItems()}</div>
    </section>
  );
};

export default SectionCard;

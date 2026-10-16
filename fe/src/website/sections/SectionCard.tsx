import CardProject from "../components/CardProject";
import type { PortofolioItem, Section, ServiceItem } from "../../types/landing";
import CardService from "../components/CardService";

interface SectionCardProps {
  section: Section;
}

const SectionCard = ({ section }: SectionCardProps) => {
  return (
    <section className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">{section.title}</h1>
          <p>{section.subtitle}</p>
        </div>
        {/* {action} */}
      </div>
      <div className="flex py-4 gap-8 justify-between">
        {section.items?.map((item) => {
          switch (section.section_type) {
            case "services":
              return <CardService service={item as ServiceItem} />;
            case "portofolios":
              return <CardProject project={item as PortofolioItem} />;
          }
        })}
      </div>
    </section>
  );
};

export default SectionCard;

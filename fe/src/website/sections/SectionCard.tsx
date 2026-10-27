import type { PortofolioItem, Section, ServiceItem } from "../../types/landing";
import GridService from "./GridService";
import GridProject from "./GridProject";

interface SectionCardProps {
  section: Section;
}

const childrenComponents: Record<
  string,
  ((props: any) => React.JSX.Element) | undefined
> = {
  services: (props: { items: ServiceItem[] }) => (
    <GridService services={props.items} />
  ),
  portofolios: (props: { items: PortofolioItem[] }) => (
    <GridProject projects={props.items} />
  ),
};

const SectionCard = ({ section }: SectionCardProps) => {
  const RenderComponent = childrenComponents[section.section_type];
  return (
    <section className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">{section.title}</h1>
          <p>{section.subtitle}</p>
        </div>
        {/* {action} */}
      </div>
      <div className="-mx-8 ">
        {RenderComponent ? RenderComponent({ items: section.items }) : null}
      </div>
    </section>
  );
};

export default SectionCard;

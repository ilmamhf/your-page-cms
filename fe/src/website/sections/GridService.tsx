import CardService from "../components/CardService";
import type { ServiceItem } from "../../types/landing";

interface GridServiceProps {
  services: ServiceItem[];
}

const GridService = ({ services }: GridServiceProps) => {
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {services.slice(0, 4).map((service) => (
        <CardService service={service} key={service.id} />
      ))}
    </div>
  );
};

export default GridService;
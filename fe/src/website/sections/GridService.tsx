import CardService from "../components/CardService";
import type { ServiceItem } from "../../types/landing";

interface GridServiceProps {
  services: ServiceItem[];
}

const GridService = ({ services }: GridServiceProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 md:p-8 gap-6">
      {services.slice(0, 3).map((service, index) => (
        <CardService
          service={service}
          key={index}
        />
      ))}
    </div>
  );
};

export default GridService;

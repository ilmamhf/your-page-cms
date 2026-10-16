import CardService from "../components/CardService";
import type { ServiceItem } from "../../types/landing";

interface GridServiceProps {
  services: ServiceItem[];
}

// const sample: CardServiceProps[] = [
//   {
//     icon: reactLogo,
//     name: "Service Name",
//     description: "lorem ipsum dolor sit amet",
//   },
//   {
//     icon: reactLogo,
//     name: "Service Name",
//     description: "lorem ipsum dolor sit amet",
//   },
//   {
//     icon: reactLogo,
//     name: "Service Name",
//     description: "lorem ipsum dolor sit amet",
//   },
// ];

const GridService = ({ services }: GridServiceProps) => {
  return (
    <div className="flex p-8 gap-8 justify-between">
      {services.map((service, index) => (
        <CardService
          service={service}
          key={index}
        />
      ))}
    </div>
  );
};

export default GridService;

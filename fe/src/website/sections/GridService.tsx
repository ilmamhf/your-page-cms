import CardService, { type CardServiceProps } from "../components/CardService";
import reactLogo from "../../assets/react.svg";

interface GridServiceProps {
  services?: CardServiceProps[];
}

const sample: CardServiceProps[] = [
  {
    icon: reactLogo,
    name: "Service Name",
    description: "lorem ipsum dolor sit amet",
  },
  {
    icon: reactLogo,
    name: "Service Name",
    description: "lorem ipsum dolor sit amet",
  },
  {
    icon: reactLogo,
    name: "Service Name",
    description: "lorem ipsum dolor sit amet",
  },
];

const GridService = ({ services = sample }: GridServiceProps) => {
  return (
    <div className="flex p-8 gap-8 justify-between">
      {services.map((service, index) => (
        <CardService
          key={index}
          {...service}
        />
      ))}
    </div>
  );
};

export default GridService;

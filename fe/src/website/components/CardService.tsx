import type { ServiceItem } from "../../types/landing";

export interface CardServiceProps {
  service: ServiceItem;
}

const CardService = ({ service }: CardServiceProps) => {
  return (
    <div className="border p-4">
      <img
        src={service.icon_url}
        alt="icon"
        className="size-12"
      />
      <p className="font-bold">{service.title}</p>
      <p>{service.description}</p>
    </div>
  );
};

export default CardService;

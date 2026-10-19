import type { ServiceItem } from "../../types/landing";

export interface CardServiceProps {
  service: ServiceItem;
}

const CardService = ({ service }: CardServiceProps) => {
  return (
    <div className="border p-4 max-w-xs min-h-36 flex flex-col">
      <img
        src={service.icon_url}
        alt="icon"
        className="size-12 md:size-16"
      />
      <div className="flex flex-col flex-1">
        <p className="font-bold">{service.title}</p>
        <p>{service.description}</p>
      </div>
    </div>
  );
};

export default CardService;

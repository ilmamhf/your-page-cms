import type { ServiceItem } from "../../types/landing";
import Icon from "../../components/Icon";

export interface CardServiceProps {
  service: ServiceItem;
}

/**
 * Service card — icon displayed directly without wrapper for maximum clarity.
 */
const CardService = ({ service }: CardServiceProps) => {
  return (
    <div>
      {/* Icon directly — no wrapper, no background, full visibility */}
      <div className="mb-4 text-primary" aria-hidden="true">
        {service.icon_url ? (
          <img
            src={service.icon_url}
            alt=""
            className="size-8 object-contain"
          />
        ) : (
          <Icon name="layers" className="size-8" />
        )}
      </div>
      <h3 className="font-semibold text-ink">{service.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-mute">
        {service.description}
      </p>
    </div>
  );
};

export default CardService;
import type { ServiceItem } from "../../types/landing";
import Icon from "../../components/Icon";
import { resolveImageUrl } from "../../utils/image";

export interface CardServiceProps {
  service: ServiceItem;
}

/**
 * Service card — icon displayed directly for maximum clarity.
 * Gracefully handles missing icon_url by showing a default icon.
 */
const CardService = ({ service }: CardServiceProps) => {
  return (
    <div className="h-full">
      {/* Icon — no wrapper, no background, full visibility */}
      <div className="mb-4 text-primary" aria-hidden="true">
        {service.icon_url ? (
          <img
            src={resolveImageUrl(service.icon_url)}
            alt=""
            className="size-8 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <Icon name="layers" className={`size-8 ${service.icon_url ? 'hidden' : ''}`} aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-ink">{service.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-mute">
        {service.description}
      </p>
    </div>
  );
};

export default CardService;
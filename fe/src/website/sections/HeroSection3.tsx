import type { MetricItem, Section } from "../../types/landing";
import CardStats from "../components/CardStats";

interface HeroSection3Props {
  section: Section;
}

/**
 * Metrics band — the one bold moment on the page: a full navy panel with the
 * numbers set large. Eyebrow/image come from the section's hero detail when
 * the CMS has filled them in; nothing falls back to placeholder content.
 */
const HeroSection3 = ({ section }: HeroSection3Props) => {
  const stats = (section.items ?? []) as MetricItem[];
  const eyebrow = section.hero_detail?.eyebrow;
  const imageUrl = section.hero_detail?.image_url;

  return (
    <section className="shell">
      <div className="rounded-2xl bg-navy px-6 py-12 text-white sm:px-10 md:px-14 md:py-16">
        <div className={imageUrl ? "grid gap-10 md:grid-cols-12 md:gap-14" : ""}>
          <div className={imageUrl ? "md:col-span-7" : ""}>
            {eyebrow && (
              <p className="eyebrow text-white/50">{eyebrow}</p>
            )}
            {section.title && (
              <h2 className="mt-4 max-w-[20ch] text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-[-0.03em] text-balance">
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-white/65 md:text-lg">
                {section.subtitle}
              </p>
            )}
          </div>

          {imageUrl && (
            <figure className="overflow-hidden rounded-xl md:col-span-5">
              <img
                src={imageUrl}
                alt=""
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          )}
        </div>

        {stats.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-y-10 border-t border-white/10 pt-10 md:mt-14 md:grid-cols-4 md:pt-12">
            {stats.map((stat) => (
              <CardStats
                key={stat.id}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix || undefined}
              />
            ))}
          </dl>
        )}
      </div>
    </section>
  );
};

export default HeroSection3;

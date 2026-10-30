import { resolveImageUrl } from "../../utils/image";

interface HeroSection1Props {
  /**
   * "lead" = the first hero on the page (full composition with actions);
   * "banner" = subsequent section leads (quiet type block + image band).
   */
  variant?: "lead" | "banner";
  eyebrow?: string;
  hero_text?: string;
  description?: string;
  image_url?: string | null;
}

/**
 * Renders a hero section from real CMS data only — no placeholder fallbacks.
 * Anything the CMS hasn't filled in is simply not rendered.
 */
const HeroSection1 = ({
  variant = "lead",
  eyebrow,
  hero_text,
  description,
  image_url,
}: HeroSection1Props) => {
  if (variant === "banner") {
    return (
      <section className="shell border-t border-line py-14 md:py-18">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          {/* Copy column — narrower measure for better reading */}
          <div className="md:col-span-7 self-center">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {hero_text && (
              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-balance">
                {hero_text}
              </h2>
            )}
            {description && (
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-mute md:text-lg">
                {description}
              </p>
            )}
          </div>

          {/* Image column — squarer, more intentional aspect */}
          {image_url && (
            <figure className="md:col-span-5 self-start">
              <div className="overflow-hidden rounded-2xl border border-line bg-cloud aspect-[4/3] md:aspect-[5/4]">
                <img
                  src={resolveImageUrl(image_url)}
                  alt={hero_text ? `${hero_text} illustration` : "Hero illustration"}
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="shell pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
        {/* copy + actions */}
        <div className={image_url ? "md:col-span-7" : "md:col-span-9"}>
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          {hero_text && (
            <h1 className="text-[clamp(2.5rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
              {hero_text}
            </h1>
          )}
          {description && (
            <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-mute md:text-lg">
              {description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Contact us
            </a>
            <a href="#services" className="btn-outline">
              Our services
            </a>
          </div>
        </div>

        {/* image — squarer on lead hero too */}
        {image_url && (
          <div className="md:col-span-5">
            <figure className="overflow-hidden rounded-2xl border border-line bg-cloud">
              <img
                src={resolveImageUrl(image_url)}
                alt={hero_text ? `${hero_text} illustration` : "Hero illustration"}
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection1;
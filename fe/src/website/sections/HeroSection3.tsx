import sample from "../../assets/image-sample-1.png";
import type { MetricItem, Section } from "../../types/landing";
import CardStats from "../components/CardStats";

interface HeroSection3Props {
  section: Section;
}

const HeroSection3 = ({ section }: HeroSection3Props) => {
  return (
    <section className="p-8 grid grid-cols-3 items-stretch overflow-hidden">
      {/* kiri */}
      <div className="relative w-full h-full">
        <img
          src={sample}
          alt="img"
          className="h-full w-full object-cover absolute inset-0"
        />
      </div>

      {/* kanan */}
      <div className="col-span-2 flex flex-col px-4">
        <p className="text-xl">{section.hero_detail?.eyebrow}</p>
        <p className="text-6xl -ml-1 mb-2">{section.title}</p>
        <p className="text-xl">{section.subtitle}</p>
        <div className="flex gap-6">
          {section.items?.map((item) => {
            return (
              <CardStats
                stat={item as MetricItem}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection3;

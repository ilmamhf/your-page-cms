import sample from "../assets/image-sample-1.png";
import CardStats from "./CardStats";

const HeroSection3 = () => {
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
        <p className="text-xl">small jargon</p>
        <p className="text-6xl -ml-1">Hero Text</p>
        <p className="text-xl">
          lorem ipsum dolor sit amet consectetur adipiscing elit et nostrud
          consequat vero officia officia minim in occaecat laboris dignissimos
          voluptas molestias nostrud imperdiet iusto non quidem tempor et est
          exercitation dolore odio in dolore labore eiusmod officia omnis lorem
          velit est eos culpa dolorem non assumenda ad velit incididunt est
        </p>
        <div className="flex gap-6">
          <CardStats />
          <CardStats />
          <CardStats />
        </div>
      </div>
    </section>
  );
};

export default HeroSection3;

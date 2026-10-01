import sample from "../assets/image-sample-1.png";

interface HeroSection1Props {
  title?: string;
  description?: string;
  img?: string;
}

const HeroSection2 = ({
  title = "Hero Text",
  description = "lorem ipsum dolor sit amet consectetur adipiscing elit et nostrud consequat vero officia officia minim in occaecat laboris dignissimos voluptas molestias nostrud imperdiet iusto non quidem tempor et est exercitation dolore odio in dolore labore eiusmod officia omnis lorem velit est eos culpa dolorem non assumenda ad velit incididunt est",
  img = sample,
}) => {
  return (
    <section className="relative overflow-hidden p-8">
      <div className="absolute inset-0">
        <img
          src={img}
          alt="img"
          className="w-full h-full absolute inset-0 object-cover object-right"
        />

        <div className="absolute inset-0 bg-linear-to-r from-white to-white/0"></div>
      </div>

      <div className="relative z-10 grid grid-cols-3">
        {/* kiri */}
        <div className="col-span-2 flex flex-col">
          <p className="text-6xl -ml-1">{title}</p>
          <p className="text-xl">{description}</p>
        </div>

        {/* kanan */}
        <div className="col-span-1"></div>
      </div>
    </section>
  );
};

export default HeroSection2;

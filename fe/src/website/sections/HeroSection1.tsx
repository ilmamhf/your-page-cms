import sample from "../../assets/image-sample-1.png";

interface HeroSection1Props {
  eyebrow?: string;
  hero_text?: string;
  description?: string;
  children?: React.ReactNode;
  image_url?: string | null;
}

const HeroSection1 = ({
  eyebrow = "Lorem Ipsum",
  hero_text = "Hero Text",
  description = "lorem ipsum dolor sit amet consectetur adipiscing elit et nostrud consequat vero officia officia minim in occaecat laboris dignissimos voluptas molestias nostrud imperdiet iusto non quidem tempor et est exercitation dolore odio in dolore labore eiusmod officia omnis lorem velit est eos culpa dolorem non assumenda ad velit incididunt est",
  children = (
    <>
      <div className="p-4 border w-32 items-center justify-center flex">
        <div>button 1</div>
      </div>
      <div className="p-4 border w-32 items-center justify-center flex">
        <div>button 2</div>
      </div>
    </>
  ),
  image_url = sample,
}: HeroSection1Props) => {
  return (
    <section className="p-8 grid grid-cols-5 items-stretch overflow-hidden">
      {/* kiri */}
      <div className="md:col-span-4  flex flex-col">
        <p className="text-xl">{eyebrow}</p>
        <p className="text-6xl -ml-1 py-4">{hero_text}</p>
        <p className="text-xl">{description}</p>
        <div className="flex gap-6 pt-4">{children}</div>
      </div>

      {/* kanan */}
      <div className="relative w-full h-full col-span-2 justify-self-end md:col-span-1 aspect-square">
        {image_url ? (
          <img
            src={image_url}
            alt="img"
            className="h-full w-full object-cover absolute inset-0"
          />
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection1;

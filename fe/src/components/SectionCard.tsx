import CardProject from "./CardProject";

interface SectionCardProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

const SectionCard = ({
  title = "Featured Work",
  description = "lorem ipsum dolor sit amet consectetur adipiscing elit",
  action = (
    <div className="flex items-center justify-center border p-2">View all</div>
  ),
  children = (
    <>
      <CardProject />
      <CardProject />
      <CardProject />
    </>
  ),
}: SectionCardProps) => {
  return (
    <section className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">{title}</h1>
          <p>{description}</p>
        </div>
        {action}
      </div>
      <div className="flex py-4 gap-8 justify-between">{children}</div>
    </section>
  );
};

export default SectionCard;

import sample from "../../assets/image-sample-1.png";

export interface CardProjectProps {
  img?: string;
  title?: string;
  detail?: string;
}

const CardProject = ({
  img = sample,
  title = "Project Name",
  detail = "description",
}: CardProjectProps) => {
  return (
    <div className="border">
      <img
        src={img}
        alt="img"
        className="bg-amber-300 h-32 w-64 object-cover"
      />
      <div className="p-4">
        <p className="font-bold">{title}</p>
        <p>{detail}</p>
      </div>
    </div>
  );
};

export default CardProject;

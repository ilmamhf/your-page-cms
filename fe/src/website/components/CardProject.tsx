import sample from "../../assets/image-sample-1.png";
import type { PortofolioItem } from "../../types/landing";

export interface CardProjectProps {
  project: PortofolioItem;
}

const CardProject = ({ project }: CardProjectProps) => {
  return (
    <div className="border">
      <img
        src={project.image_url}
        alt="img"
        className="bg-amber-300 h-32 w-64 object-cover"
      />
      <div className="p-4">
        <p className="font-bold">{project.title}</p>
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default CardProject;

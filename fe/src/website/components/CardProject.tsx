import type { PortofolioItem } from "../../types/landing";

export interface CardProjectProps {
  project: PortofolioItem;
}

const CardProject = ({ project }: CardProjectProps) => {
  return (
    <div className="border w-full aspect-square h-full">
      <img
        src={project.image_url}
        alt="img"
        className="h-5/8 w-full object-cover"
      />
      <div className="p-4">
        <p className="font-bold">{project.title}</p>
        <p className="line-clamp-1 xl:line-clamp-3">{project.description}</p>
      </div>
    </div>
  );
};

export default CardProject;

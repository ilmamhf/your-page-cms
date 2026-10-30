import type { PortofolioItem } from "../../types/landing";

export interface CardProjectProps {
  project: PortofolioItem;
}

const CardProject = ({ project }: CardProjectProps) => {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-xl border border-line bg-cloud">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-[4/3] w-full" />
        )}
      </div>
      <h3 className="mt-3.5 font-semibold text-ink">{project.title}</h3>
      <p className="mt-1 text-sm text-mute line-clamp-1">{project.description}</p>
    </article>
  );
};

export default CardProject;

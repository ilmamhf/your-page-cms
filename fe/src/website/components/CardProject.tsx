import type { PortofolioItem } from "../../types/landing";
import Icon from "../../components/Icon";
import { resolveImageUrl } from "../../utils/image";

export interface CardProjectProps {
  project: PortofolioItem;
}

const PROJECT_PLACEHOLDERS = [
  'bg-primary-soft',
  'bg-emerald-soft',
  'bg-amber-soft',
  'bg-blue-soft',
  'bg-violet-soft',
] as const;

const CardProject = ({ project }: CardProjectProps) => {
  const placeholderClass = PROJECT_PLACEHOLDERS[project.id % PROJECT_PLACEHOLDERS.length];

  return (
    <article className="group h-full flex flex-col">
      <div className="overflow-hidden rounded-xl border border-line bg-cloud flex-shrink-0">
        {project.image_url ? (
          <img
            src={resolveImageUrl(project.image_url)}
            alt={`${project.title} project screenshot`}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div
          className={`aspect-[4/3] w-full flex items-center justify-center ${placeholderClass} ${project.image_url ? 'hidden' : ''}`}
          aria-hidden="true"
        >
          <Icon name="image" className="size-10 text-muted" aria-hidden="true" />
        </div>
      </div>
      <div className="mt-3.5 flex-1 flex flex-col">
        <h3 className="font-semibold text-ink line-clamp-1">{project.title}</h3>
        <p className="mt-1 text-sm text-mute line-clamp-2 flex-1">{project.description}</p>
      </div>
    </article>
  );
};

export default CardProject;
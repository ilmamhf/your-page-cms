import CardProject from "../components/CardProject";

import type { PortofolioItem } from "../../types/landing";

interface GridProjectProps {
  projects: PortofolioItem[];
}

const GridProject = ({ projects }: GridProjectProps) => {
  return (
    <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.slice(0, 6).map((project) => (
        <CardProject
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
};

export default GridProject;

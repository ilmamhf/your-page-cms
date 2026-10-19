import CardProject from "../components/CardProject";

import type { PortofolioItem } from "../../types/landing";

interface GridProjectProps {
  projects: PortofolioItem[];
}

const GridProject = ({ projects }: GridProjectProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 p-4 md:p-8 gap-6 w-full">
      {projects.slice(0, 4).map((project, index) => (
        <CardProject
          key={index}
          project={project}
        />
      ))}
    </div>
  );
};

export default GridProject;

import CardProject from "../components/CardProject";

import type { PortofolioItem } from "../../types/landing";

interface GridProjectProps {
  projects: PortofolioItem[];
}

// const sample: CardProjectProps[] = [
//   {
//     img: imgSample,
//     title: "Project Name",
//     detail: "lorem ipsum dolor sit amet",
//   },
//   {
//     img: imgSample,
//     title: "Project Name",
//     detail: "lorem ipsum dolor sit amet",
//   },
//   {
//     img: imgSample,
//     title: "Project Name",
//     detail: "lorem ipsum dolor sit amet",
//   },
// ];

const GridProject = ({ projects }: GridProjectProps) => {
  return (
    <div className="flex p-8 gap-8 justify-between">
      {projects.map((project, index) => (
        <CardProject
          key={index}
          project={project}
        />
      ))}
    </div>
  );
};

export default GridProject;

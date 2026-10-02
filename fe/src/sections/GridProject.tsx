import CardProject, { type CardProjectProps } from "../components/CardProject";
import imgSample from "../assets/image-sample-1.png";

interface GridProjectProps {
  projects?: CardProjectProps[];
}

const sample: CardProjectProps[] = [
  {
    img: imgSample,
    title: "Project Name",
    detail: "lorem ipsum dolor sit amet",
  },
  {
    img: imgSample,
    title: "Project Name",
    detail: "lorem ipsum dolor sit amet",
  },
  {
    img: imgSample,
    title: "Project Name",
    detail: "lorem ipsum dolor sit amet",
  },
];

const GridProject = ({ projects = sample }: GridProjectProps) => {
  return (
    <div className="flex p-8 gap-8 justify-between">
      {projects.map((service, index) => (
        <CardProject
          key={index}
          {...service}
        />
      ))}
    </div>
  );
};

export default GridProject;

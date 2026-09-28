import sample from "../assets/image-sample-1.png";

const CardProject = () => {
  return (
    <div className="border">
      <img
        src={sample}
        alt="img"
        className="bg-amber-300 h-32 w-64 object-cover"
      />
      <div className="p-4">
        <p className="font-bold">Project Name</p>
        <p>description</p>
      </div>
    </div>
  );
};

export default CardProject;

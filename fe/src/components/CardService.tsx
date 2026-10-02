import reactLogo from "../assets/react.svg";

export interface CardServiceProps {
  icon?: string;
  name?: string;
  description?: string;
}

const CardService = ({
  icon = reactLogo,
  name = "Service Name",
  description = "lorem ipsum dolor sit amet",
}: CardServiceProps) => {
  return (
    <div className="border p-4">
      <img
        src={icon}
        alt="icon"
        className="size-12"
      />
      <p className="font-bold">{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default CardService;

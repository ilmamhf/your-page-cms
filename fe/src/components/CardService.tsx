import reactLogo from "../assets/react.svg";

const CardService = () => {
  return (
    <div className="border p-4">
      <img
        src={reactLogo}
        alt="icon"
        className="size-12"
      />
      <p className="font-bold">Service name</p>
      <p>lorem ipsum dolor sit amet</p>
    </div>
  );
};

export default CardService;

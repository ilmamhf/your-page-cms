import sampleIcon from "../../assets/react.svg";

interface FooterProps {
  companyName?: string;
  location?: string;
  linkedin?: string;
  instagram?: string;
  x?: string;
  facebook?: string;
}

const Footer = ({
  companyName,
  location,
  linkedin,
  instagram,
  x,
  facebook,
}: FooterProps) => {
  return (
    <section className="flex flex-row items-center justify-between p-8 border-t">
      <div>
        <div className="flex flex-row items-center gap-4">
          <img
            src={sampleIcon}
            alt="icon"
            width={48}
          />
          <p className="text-2xl">{companyName}</p>
        </div>
        <p>Get in contact</p>
        <div className="flex gap-2 py-2">
          <img
            src={sampleIcon}
            alt="icon"
            width={32}
          />
          <p>{location}</p>
        </div>
        <div className="flex flex-row gap-2">
          <a href="">
            <img
              src={sampleIcon}
              alt="icon"
              width={32}
            />
          </a>
          <a href="">
            <img
              src={sampleIcon}
              alt="icon"
              width={32}
            />
          </a>
          <a href="">
            <img
              src={sampleIcon}
              alt="icon"
              width={32}
            />
          </a>
        </div>
      </div>

      <div className="flex flex-col">
        <p>Quick Links</p>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#portofolio">Portofolio</a>
        <a href="#contact">Contact</a>
      </div>
    </section>
  );
};

export default Footer;

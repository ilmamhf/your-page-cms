import type { PublicSocialMedia } from "../../types/landing";
import sampleIcon from "../../assets/react.svg";

interface FooterProps {
  companyName?: string;
  location?: string | null;
  socialMedias?: PublicSocialMedia[];
}

const Footer = ({ companyName, location, socialMedias = [] }: FooterProps) => {
  return (
    <section className="flex flex-row items-center justify-between p-8 border-t">
      <div>
        <div className="flex flex-row items-center gap-4">
          <img
            src={sampleIcon}
            alt="logo"
            width={48}
          />
          <p className="text-2xl">{companyName ?? "Our Company"}</p>
        </div>
        <p>Get in contact</p>
        {location && (
          <div className="flex gap-2 py-2">
            <img
              src={sampleIcon}
              alt="location"
              width={32}
            />
            <p>{location}</p>
          </div>
        )}
        {socialMedias.length > 0 && (
          <div className="flex flex-row gap-2">
            {socialMedias.map((social) => (
              <a
                href={social.link ?? undefined}
                target="_blank"
                rel="noreferrer"
                key={social.name}
                title={social.name}
              >
                <img
                  src={social.icon_url ?? sampleIcon}
                  alt={social.name}
                  width={32}
                />
              </a>
            ))}
          </div>
        )}
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

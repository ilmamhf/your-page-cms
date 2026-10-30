import type { PublicSocialMedia } from "../../types/landing";
import Icon from "../../components/Icon";
import Logo from "../../components/Logo";
import { resolveImageUrl } from "../../utils/image";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portofolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

/** Links stored without a protocol still need one to open externally. */
const normalizeUrl = (link: string) =>
  /^https?:\/\//i.test(link) ? link : `https://${link}`;

interface FooterProps {
  companyName?: string;
  location?: string | null;
  socialMedias?: PublicSocialMedia[];
  email?: string | null;
  phone?: string | null;
}

const Footer = ({
  companyName,
  location,
  socialMedias = [],
  email,
  phone,
}: FooterProps) => {
  return (
    <footer className="bg-navy text-white">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <Logo name={companyName} />
            <p className="font-semibold">{companyName ?? "Our Company"}</p>
          </div>

          {location && (
            <div className="mt-5 flex items-start gap-2.5 text-sm text-white/60">
              <Icon
                name="pin"
                className="mt-0.5 size-4 shrink-0 text-primary"
              />
              <p className="max-w-xs leading-relaxed">{location}</p>
            </div>
          )}

          {socialMedias.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {socialMedias.map((social) => (
                <a
                  href={social.link ? normalizeUrl(social.link) : undefined}
                  target="_blank"
                  rel="noreferrer"
                  key={social.name}
                  title={social.name}
                  aria-label={social.name}
                  className="grid size-9 place-content-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-white"
                >
                  {social.icon_url ? (
                    <img
                      src={resolveImageUrl(social.icon_url)}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 object-contain"
                    />
                  ) : (
                    <Icon
                      name="link"
                      className="size-4"
                    />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            Quick links
          </p>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            Get in touch
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-white"
                >
                  {email}
                </a>
              </li>
            )}
            {phone && (
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {phone}
                </a>
              </li>
            )}
            {!email && !phone && (
              <li className="max-w-[26ch] leading-relaxed">
                Open for collaboration, questions, or a quick hello.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell py-5 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {companyName ?? "Our Company"}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

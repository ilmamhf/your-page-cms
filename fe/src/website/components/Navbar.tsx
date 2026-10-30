import Logo from "../../components/Logo";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portofolio", label: "Portfolio" },
];

interface NavbarProps {
  companyName?: string;
}

const Navbar = ({ companyName }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <Logo name={companyName} />
          <span className="whitespace-nowrap font-semibold tracking-[-0.01em] text-ink">
            {companyName ?? "My Web"}
          </span>
        </a>

        <nav className="ml-auto flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-mute transition-colors hover:bg-cloud hover:text-ink sm:inline-flex"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

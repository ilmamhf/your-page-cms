interface LogoProps {
  /** Company name — its first letter becomes the mark. */
  name?: string;
  size?: "sm" | "md";
}

/** Blue rounded mark + optional wordmark, matching the kit's brand lockup. */
const Logo = ({ name = "Company", size = "md" }: LogoProps) => {
  const letter = (name.trim()[0] ?? "C").toUpperCase();
  const box = size === "sm" ? "size-7 rounded-md text-sm" : "size-9 text-lg";

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-content-center bg-primary font-bold text-white ${box}`}
    >
      {letter}
    </span>
  );
};

export default Logo;

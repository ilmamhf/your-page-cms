interface IconProps {
  name: IconName;
  className?: string;
  /** Stroke width — bump to 2 for a heavier feel where needed. */
  strokeWidth?: number;
}

export type IconName =
  | "mail"
  | "phone"
  | "pin"
  | "arrow-right"
  | "arrow-up-right"
  | "plus"
  | "trash"
  | "image"
  | "upload"
  | "alert"
  | "check"
  | "link"
  | "layers"
  | "layout"
  | "user"
  | "spinner";

const paths: Record<IconName, React.ReactNode> = {
  mail: (
    <>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11Z" />
      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
    </>
  ),
  image: (
    <>
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
      />
      <circle
        cx="8.5"
        cy="9.5"
        r="1.5"
      />
      <path d="m4 17 5-4 4 3 3-2 4 3" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4 2.7 20h18.6L12 4Z" />
      <path d="M12 10v4" />
      <path d="M12 17.2v.1" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  link: (
    <>
      <path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.3 1.3" />
      <path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.3-1.3" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  layout: (
    <>
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
      />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
    </>
  ),
  user: (
    <>
      <circle
        cx="12"
        cy="8"
        r="3.5"
      />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  spinner: (
    <>
      <circle
        cx="12"
        cy="12"
        r="8.5"
        opacity="0.25"
      />
      <path d="M20.5 12a8.5 8.5 0 0 0-8.5-8.5" />
    </>
  ),
};

/** Small, coherent stroke-icon set used across the site and CMS. */
const Icon = ({ name, className = "size-4", strokeWidth = 1.5 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {paths[name]}
  </svg>
);

export default Icon;

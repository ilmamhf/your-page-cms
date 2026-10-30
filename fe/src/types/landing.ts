export interface Page {
  id: number;
  name: string;
  sections: Section[];
}

export type SectionItem = ServiceItem | PortofolioItem | MetricItem;

export interface Section {
  id: number;
  page_id: number;
  title: string;
  subtitle: string | null;
  section_type: "hero" | "services" | "portofolios" | "metrics";
  order: number;
  is_active: boolean;
  hero_detail: SectionHeroDetail | null;
  items: SectionItem[] | null;
}

export interface SectionHeroDetail {
  id?: number;
  section_id?: number;
  eyebrow: string;
  hero_text: string;
  description: string;
  image_url: string | null;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon_url: string;
  order: number;
  is_active: boolean;
}

export interface PortofolioItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  order: number;
  is_active: boolean;
}

export interface MetricItem {
  id: number;
  label: string;
  value: number;
  suffix: string;
  order: number;
  is_active: boolean;
}

/** Content page state: the three editable item pools. */
export interface ContentsData {
  services: ServiceItem[];
  portofolios: PortofolioItem[];
  metrics: MetricItem[];
}

export interface LandingPageData {
  /** Only present on the public /landing-page endpoint. */
  website_profile?: PublicWebsiteProfile | null;
  pages: Page[];
}

/** Slimmer shape returned by the public /landing-page endpoint. */
export interface PublicWebsiteProfile {
  name: string;
  email: string | null;
  phone_number: string | null;
  location: string | null;
  theme_primary: string | null;
  theme_secondary: string | null;
  social_medias: PublicSocialMedia[];
}

export interface PublicSocialMedia {
  name: string;
  link: string | null;
  icon_url: string | null;
}

export interface SocialMedia {
  /** Absent (0) for rows that have not been saved yet. */
  id: number;
  name: string;
  icon_url: string;
  link: string;
  order: number;
}

export interface CompanyProfile {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  theme_primary: string | null;
  theme_secondary: string | null;
}

export interface WebsiteProfileData {
  website_profile: CompanyProfile;
  social_medias: SocialMedia[];
}

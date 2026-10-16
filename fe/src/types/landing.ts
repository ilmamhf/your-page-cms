export interface Page {
    id: number;
    name: string;
    sections: Section[];
}

export type SectionItem = ServiceItem | PortofolioItem | MetricItem;

export interface Section{
    id: number;
    page_id: number;
    title: string;
    subtitle: string | null;
    section_type: 'hero' | 'services' | 'portofolios' | 'metrics';
    order: number;
    is_active: boolean;
    hero_detail: SectionHeroDetail | null;
    items: SectionItem[] | null
}

export interface SectionHeroDetail {
    id: number;
    section_id: number;
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

export interface ApiResponse<T> {
    data: T;
}

export interface LandingPageData {
    pages: Page[];
}
import { useState } from "react";
import type { Page, Section } from "../../../../types/landing";
import Icon from "../../../../components/Icon";

interface SectionListProps {
  pages: Page[];
  onSelect: (section: Section | null) => void;
  onAddSection: (pageId: number, sectionType: Section["section_type"]) => void;
  onDeleteSection: (id: number) => void;
}

const SECTION_TYPES: { value: Section["section_type"]; label: string; description: string }[] = [
  { value: "hero", label: "Hero", description: "Full-width hero with heading, actions, and image" },
  { value: "services", label: "Services", description: "Grid of service cards with icons" },
  { value: "portofolios", label: "Portfolio", description: "Grid of project cards with images" },
  { value: "metrics", label: "Metrics", description: "Stats band with key numbers" },
];

/** Get the display name for a section in the sidebar. */
function getSectionDisplayName(section: Section): string {
  // For hero and metrics, the meaningful title is in hero_detail.hero_text
  if (section.section_type === "hero" || section.section_type === "metrics") {
    return section.hero_detail?.hero_text ?? section.hero_detail?.eyebrow ?? "Untitled";
  }
  // For services/portfolios without a title, show the type
  if (!section.title) {
    return section.section_type === "services" ? "Services" : "Portfolio";
  }
  return section.title;
}

const SectionList = ({
  pages,
  onSelect,
  onAddSection,
  onDeleteSection,
}: SectionListProps) => {
  const [addMenuOpen, setAddMenuOpen] = useState<{ pageId: number } | null>(null);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold tracking-[-0.01em]">Sections</h2>
        <p className="mt-1 text-sm text-mute">
          Manage the sections that appear on your site.
        </p>
      </div>

      {pages.map((page: Page) => (
        <div
          className="panel mb-4 overflow-hidden"
          key={page.id}
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <span className="font-semibold">{page.name}</span>
            <button
              className="btn-primary px-3 py-1.5 text-xs"
              onClick={() => setAddMenuOpen({ pageId: page.id })}
            >
              <Icon
                name="plus"
                className="size-3.5"
              />
              Add section
            </button>
          </div>

          {/* Add section type dropdown */}
          {addMenuOpen?.pageId === page.id && (
            <div className="border-b border-line bg-app p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-mute">Choose section type</p>
              <div className="grid gap-2">
                {SECTION_TYPES.map((type) => (
                  <button
                    key={type.value}
                    className="text-left px-3 py-2 rounded-lg border border-line hover:bg-app/60 transition-colors"
                    onClick={() => {
                      onAddSection(page.id, type.value);
                      setAddMenuOpen(null);
                    }}
                  >
                    <span className="block font-medium text-ink">{type.label}</span>
                    <span className="block text-xs text-mute">{type.description}</span>
                  </button>
                ))}
                <button
                  className="text-left px-3 py-2 rounded-lg border border-line hover:bg-app/60 text-mute"
                  onClick={() => setAddMenuOpen(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* column headings (desktop) */}
          <div className="hidden grid-cols-[1fr_96px_84px] gap-3 border-b border-line bg-app px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-mute md:grid">
            <span>Section</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          {page.sections.length === 0 && (
            <p className="px-4 py-4 text-sm text-mute">No sections yet.</p>
          )}

          {page.sections.map((section: Section) => (
            <div
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 hover:bg-app/60 md:grid-cols-[1fr_96px_84px]"
              key={section.id}
            >
              <button
                className="min-w-0 truncate text-left transition-colors hover:text-primary"
                onClick={() => onSelect(section)}
              >
                <span className="block truncate text-sm font-medium text-ink">
                  {getSectionDisplayName(section)}
                </span>
                <span className="block truncate text-xs text-mute">
                  {section.section_type}
                </span>
              </button>

              <span className="hidden md:block">
                <span className={section.is_active ? "badge badge-live" : "badge badge-draft"}>
                  {section.is_active ? "Published" : "Draft"}
                </span>
              </span>

              <div className="flex items-center justify-end gap-1">
                <button
                  className="btn-quiet px-2 py-1.5 text-xs font-semibold text-primary hover:bg-primary-soft hover:text-primary-deep"
                  onClick={() => onSelect(section)}
                >
                  Edit
                </button>
                <button
                  aria-label={`Delete ${getSectionDisplayName(section)}`}
                  className="btn-quiet px-2 py-1.5 text-mute hover:bg-red-50 hover:text-red-600"
                  onClick={() => {
                    if (confirm("Delete this section?")) {
                      onDeleteSection(section.id);
                    }
                  }}
                >
                  <Icon
                    name="trash"
                    className="size-4"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SectionList;
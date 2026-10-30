import type { Page, Section } from "../../../../types/landing";
import Icon from "../../../../components/Icon";

interface SectionListProps {
  pages: Page[];
  onSelect: (section: Section | null) => void;
  onAddSection: (id: number) => void;
  onDeleteSection: (id: number) => void;
}

const SectionList = ({
  pages,
  onSelect,
  onAddSection,
  onDeleteSection,
}: SectionListProps) => {
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
              onClick={() => onAddSection(page.id)}
            >
              <Icon
                name="plus"
                className="size-3.5"
              />
              Add section
            </button>
          </div>

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
                  {section.title ?? "Untitled"}
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
                  aria-label={`Delete ${section.title ?? "section"}`}
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

import type { Page, Section } from "../../../../types/landing";

interface SectionListProps {
  pages: Page[];
  onSelect: (section: Section | null) => void;
  onAddSection: (id: string | number) => void;
  onDeleteSection: (id: string | number) => void;
}

const SectionList = ({
  pages,
  onSelect,
  onAddSection,
  onDeleteSection,
}: SectionListProps) => {
  return (
    <div className="grid gap-2">
      <div className="text-2xl">Section List</div>
      {pages.map((page: Page) => (
        <div className="border p-4">
          <div>Page {page.name}</div>
          <div className="grid grid-flow-row">
            {page.sections.map((section: Section) => (
              <button
                className="border p-2 flex justify-between"
                key={section.id}
                onClick={() => onSelect(section)}
              >
                <div>Section {section.section_type}</div>
                <button
                  className="border"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete ?")) {
                      onDeleteSection(section.id);
                    }
                  }}
                >
                  Delete
                </button>
              </button>
            ))}
          </div>
          <button
            className="border"
            onClick={() => onAddSection(page.id)}
          >
            Add new section
          </button>
        </div>
      ))}
    </div>
  );
};

export default SectionList;

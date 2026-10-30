import type { Page, Section } from "../../../../types/landing";

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
    <div className="grid">
      <div className="text-2xl pb-4">Website Sections Management</div>
      {pages.map((page: Page) => (
        <div
          className="border grid grid-cols-4"
          key={page.id}
        >
          <div className="p-2 border-2 font-medium text-center place-content-center text-xl">
            {page.name}
          </div>
          <div className="flex flex-col col-span-3">
            <div className="grid grid-flow-row">
              {page.sections.map((section: Section) => (
                <div
                  className="border-b flex justify-between items-center last:border-b-0"
                  key={section.id}
                >
                  <button
                    className="p-2 flex-1 text-left"
                    onClick={() => onSelect(section)}
                  >
                    {section.title ?? "List of "} {`(${section.section_type})`}
                  </button>
                  <button
                    className="border p-2 m-1"
                    onClick={() => {
                      if (confirm("Delete this section?")) {
                        onDeleteSection(section.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button
              className="border-t p-2"
              onClick={() => onAddSection(page.id)}
            >
              Add new section +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionList;

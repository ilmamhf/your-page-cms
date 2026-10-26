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
    <div className="grid">
      <div className="text-2xl pb-4">Website Sections Management</div>
      {pages.map((page: Page) => (
        <div className="border grid grid-cols-4">
          <div className="p-2 border-2 font-medium text-center place-content-center text-xl">
            {page.name}
          </div>
          <div className="flex flex-col col-span-3">
            <div className="grid grid-flow-row">
              {page.sections.map((section: Section) => (
                <button
                  className="border p-2 flex justify-between"
                  key={section.id}
                  onClick={() => onSelect(section)}
                >
                  <div className="self-center">
                    {section.title ?? "List of "} {`(${section.section_type})`}
                  </div>
                  <button
                    className="border p-2"
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
              className="border p-2"
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

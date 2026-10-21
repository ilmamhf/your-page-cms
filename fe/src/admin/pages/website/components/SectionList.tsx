import type { Page, Section } from "../../../../types/landing";

interface SectionListProps {
  pages: Page[];
  onSelect: (section: Section) => void;
}

const SectionList = ({ pages, onSelect }: SectionListProps) => {
  return (
    <div className="grid gap-2">
      <div className="text-2xl">Section List</div>
      {pages.map((page: Page) => (
        <div className="border p-4">
          <div>Page {page.name}</div>
          <div className="grid grid-flow-row">
            {page.sections.map((section: Section) => (
              <button
                className="border p-2 flex"
                key={section.id}
                onClick={() => onSelect(section)}
              >
                <div>Section {section.section_type}</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionList;

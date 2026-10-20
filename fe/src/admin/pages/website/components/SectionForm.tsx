import type { Section } from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import InputField from "../../../components/InputField";
import SectionTypeDropdown from "../../../components/SectionTypeDropdown";

interface SectionFormProps {
  section: Section;
  index: number;
  pageName: string;
  onUpdateSection: (updatedSection: Section) => void;
}

const SectionForm = ({
  section,
  index,
  pageName,
  onUpdateSection,
}: SectionFormProps) => {
  const handleChange = (field: keyof Section, value: any) => {
    onUpdateSection({
      ...section,
      [field]: value,
    });
  };

  return (
    <div className="border p-4 my-4">
      <div>
        {pageName}_{index + 1}
      </div>
      <div>
        <InputField
          label="title"
          id={String(pageName) + "_title_" + String(section.id)}
          value={section.title}
          onChange={(val) => handleChange("title", val)}
        />
        <InputField
          label="subtitle"
          id={String(pageName) + "_subtitle_" + String(section.id)}
          value={section.subtitle ? section.subtitle : ""}
          textarea={true}
          onChange={(val) => handleChange("subtitle", val)}
        />
        <SectionTypeDropdown
          value={section.section_type}
          onChange={(val) => handleChange("section_type", val)}
        />

        {/* order component idk how to make */}

        <Checkbox
          label="Is Active?"
          onChange={(val) => handleChange("is_active", val)}
        />
      </div>
    </div>
  );
};

export default SectionForm;

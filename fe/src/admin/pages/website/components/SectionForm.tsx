import { useEffect, useState } from "react";
import type {
  Section,
  SectionHeroDetail,
  SectionItem,
} from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import InputField from "../../../components/InputField";
import SectionTypeDropdown from "../../../components/SectionTypeDropdown";

interface SectionFormProps {
  section: Section | null;
}

const SectionForm = ({ section }: SectionFormProps) => {
  const [form, setForm] = useState<Section | null>(null);

  useEffect(() => {
    setForm(section);
  }, [section]);

  const handleChange = <K extends keyof Section>(
    field: K,
    value: Section[K],
  ) => {
    setForm((previous) => {
      if (previous === null) return previous;

      return {
        ...previous,
        [field]: value,
      };
    });
  };

  if (!section || !form) {
    return <div></div>;
  }

  return (
    <div className="p-4 w-full border h-screen">
      <div className="text-2xl">Edit Section</div>
      <div>
        <InputField
          label="title"
          id={"title_" + String(form.id)}
          value={form.title ?? ""}
          onChange={(val) => handleChange("title", val)}
        />
        <InputField
          label="subtitle"
          id={"subtitle_" + String(form.id)}
          value={form.subtitle ? form.subtitle : ""}
          textarea={true}
          onChange={(val) => handleChange("subtitle", val)}
        />
        <SectionTypeDropdown
          value={form.section_type}
          onChange={(val) =>
            handleChange("section_type", val as Section["section_type"])
          }
        />

        {/* order component idk how to make */}

        <Checkbox
          label="Is Active?"
          checked={form.is_active}
          onChange={(val) => handleChange("is_active", val)}
        />
      </div>
    </div>
  );
};

export default SectionForm;

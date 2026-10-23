import { useEffect, useState } from "react";
import type { Section, SectionHeroDetail } from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import InputField from "../../../components/InputField";
import SectionTypeDropdown from "../../../components/SectionTypeDropdown";
import api from "../../../../api/axios";
import axios from "axios";

interface SectionFormProps {
  section: Section | null;
  onSaveSuccess: (updatedSection: Section) => void;
}

const SectionForm = ({ section, onSaveSuccess }: SectionFormProps) => {
  const [form, setForm] = useState<Section | null>(null);

  useEffect(() => {
    console.log("Section dari parent:", section);
    setForm(section);
  }, [section]);

  const handleChange = <K extends keyof Section>(
    field: K,
    value: Section[K],
  ) => {
    setForm((previous) => {
      if (previous === null) return previous;
      return { ...previous, [field]: value };
    });
  };

  const handleHeroDetailChange = <K extends keyof SectionHeroDetail>(
    field: K,
    value: SectionHeroDetail[K],
  ) => {
    setForm((previous) => {
      if (previous === null) return previous;
      return {
        ...previous,
        hero_detail: {
          ...(previous.hero_detail as SectionHeroDetail), // Keep existing details safely
          [field]: value,
        },
      };
    });
  };

  const handleSave = async () => {
    if (!form) return;
    try {
      console.log(form);

      const response = await api.put(`/section/${form.id}`, {
        page_id: form.page_id,
        title: form.title,
        subtitle: form.subtitle,
        section_type: form.section_type,
        order: form.order ?? null,
        is_active: form.is_active,
        hero_detail: {
          section_id: form.id,
          hero_text: form.title,
          description: form.subtitle,
          eyebrow: form.hero_detail?.eyebrow,
          image_url: form.hero_detail?.image_url,
        },
      });

      console.log("Data updated successfully", response.data);

      const updatedData = form;

      onSaveSuccess(updatedData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("Response status: ", err.response?.status);
        console.log("Response data:", err.response?.data);
      } else {
        console.log("Failed updating data", err);
      }
    }
  };

  if (!section || !form) {
    return <div></div>;
  }

  const componentDetail = form.section_type === "hero" && (
    <>
      <InputField
        label="eyebrow"
        id={"eyebrow_" + String(form.id)}
        value={form.hero_detail?.eyebrow ?? ""}
        onChange={(val) => handleHeroDetailChange("eyebrow", val)}
      />
    </>
  );

  return (
    <div className="p-4 w-full border h-screen flex flex-col">
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

        {componentDetail}

        <div className="flex w-full justify-end">
          <button
            className="border px-4 py-2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;

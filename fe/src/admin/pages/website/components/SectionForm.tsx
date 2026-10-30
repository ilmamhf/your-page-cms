import { useState } from "react";
import type { Section, SectionHeroDetail } from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import FormShell, {
  FormPlaceholder,
} from "../../../components/FormShell";
import ImageInput from "../../../components/ImageInput";
import InputField from "../../../components/InputField";
import SectionTypeDropdown from "../../../components/SectionTypeDropdown";
import api from "../../../../api/axios";
import { errorMessage } from "../../../../api/error";

interface SectionFormProps {
  section: Section | null;
  onSaveSuccess: (updatedSection: Section) => void;
  onCancel: () => void;
}

type Feedback = { type: "success" | "error"; message: string } | null;

// The parent keys this form by section id, so it remounts on selection
// change and can initialize straight from props.
const SectionForm = ({ section, onSaveSuccess, onCancel }: SectionFormProps) => {
  const [form, setForm] = useState<Section | null>(section);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleChange = <K extends keyof Section>(field: K, value: Section[K]) => {
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
          id: previous.hero_detail?.id ?? 0,
          section_id: previous.hero_detail?.section_id ?? previous.id,
          eyebrow: previous.hero_detail?.eyebrow ?? "",
          hero_text: previous.hero_detail?.hero_text ?? "",
          description: previous.hero_detail?.description ?? "",
          image_url: previous.hero_detail?.image_url ?? null,
          [field]: value,
        },
      };
    });
  };

  const handleSave = async () => {
    if (!form) return;

    setFeedback(null);
    setSaving(true);

    try {
      const response = await api.put(`/section/${form.id}`, {
        page_id: form.page_id,
        title: form.title,
        subtitle: form.subtitle,
        section_type: form.section_type,
        order: form.order ?? null,
        is_active: form.is_active,
        hero_detail: {
          section_id: form.id,
          hero_text: form.hero_detail?.hero_text ?? form.title,
          description: form.hero_detail?.description ?? form.subtitle,
          eyebrow: form.hero_detail?.eyebrow,
          image_url: form.hero_detail?.image_url,
        },
      });

      const updatedSection = response.data.data as Section;
      onSaveSuccess(updatedSection);
      setFeedback({ type: "success", message: "Section saved." });
    } catch (err) {
      setFeedback({ type: "error", message: errorMessage(err, "Failed to save the section.") });
    } finally {
      setSaving(false);
    }
  };

  if (!section || !form) {
    return (
      <FormPlaceholder
        title="No section selected"
        hint="Pick a section on the left, or add a new one."
      />
    );
  }

  return (
    <FormShell
      title="Edit section"
      subtitle={form.title}
      feedback={feedback}
      saving={saving}
      onSave={handleSave}
      onCancel={onCancel}
      saveLabel="Save"
    >
      <InputField
        label="Title"
        id={"title_" + String(form.id)}
        value={form.title ?? ""}
        onChange={(val) => handleChange("title", val)}
      />
      <InputField
        label="Subtitle"
        id={"subtitle_" + String(form.id)}
        value={form.subtitle ?? ""}
        textarea={true}
        onChange={(val) => handleChange("subtitle", val)}
      />
      <SectionTypeDropdown
        value={form.section_type}
        onChange={(val) => handleChange("section_type", val as Section["section_type"])}
      />

      <div className="mt-2 border-t border-line pt-3">
        <Checkbox
          label="Show this section on the site"
          checked={form.is_active}
          onChange={(val) => handleChange("is_active", val)}
        />
      </div>

      {/* Hero and metrics sections carry an optional eyebrow + image. */}
      {["hero", "metrics"].includes(form.section_type) && (
        <div className="mt-4 border-t border-line pt-4">
          <InputField
            label="Eyebrow"
            id={"eyebrow_" + String(form.id)}
            value={form.hero_detail?.eyebrow ?? ""}
            placeholder="Small label above the heading"
            onChange={(val) => handleHeroDetailChange("eyebrow", val)}
          />
          <ImageInput
            label={form.section_type === "metrics" ? "Section image" : "Hero image"}
            value={form.hero_detail?.image_url ?? ""}
            previewSize={96}
            onChange={(url) => handleHeroDetailChange("image_url", url)}
          />
        </div>
      )}
    </FormShell>
  );
};

export default SectionForm;

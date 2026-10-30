import { useState } from "react";
import type { PortofolioItem, ContentsData } from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import FormShell from "../../../components/FormShell";
import ImageInput from "../../../components/ImageInput";
import InputField from "../../../components/InputField";
import api from "../../../../api/axios";
import { errorMessage } from "../../../../api/error";

interface PortofolioFormProps {
  portofolioItem: PortofolioItem | null;
  onSaveSuccess: <K extends keyof ContentsData>(
    updatedContent: ContentsData[K][number],
    contentType: K,
  ) => void;
  onCancel: () => void;
}

type Feedback = { type: "success" | "error"; message: string } | null;

// The parent keys this form by item id, so it remounts on selection change
// and can initialize straight from props.
const PortofolioForm = ({ portofolioItem, onSaveSuccess, onCancel }: PortofolioFormProps) => {
  const [formData, setFormData] = useState<PortofolioItem | null>(portofolioItem);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleChange = <K extends keyof PortofolioItem>(
    fieldName: K,
    value: PortofolioItem[K],
  ) => {
    setFormData((previous) => {
      if (previous === null) return previous;
      return { ...previous, [fieldName]: value };
    });
  };

  const handleSave = async () => {
    if (!formData) return;

    setFeedback(null);
    setSaving(true);

    try {
      const response = await api.put(`/portofolio/${formData.id}`, {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        is_active: formData.is_active,
        order: formData.order,
      });

      onSaveSuccess(response.data.data as PortofolioItem, "portofolios");
      setFeedback({ type: "success", message: "Portofolio saved." });
    } catch (err) {
      setFeedback({ type: "error", message: errorMessage(err, "Failed to save the portofolio.") });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormShell
      title="Edit portofolio"
      subtitle={formData?.title}
      feedback={feedback}
      saving={saving}
      onSave={handleSave}
      onCancel={onCancel}
    >
      <InputField
        label="Project name"
        id="portofolioName"
        value={formData?.title ?? ""}
        onChange={(val) => handleChange("title", val)}
      />
      <InputField
        label="Description"
        id="portofolioDesc"
        value={formData?.description ?? ""}
        textarea={true}
        onChange={(val) => handleChange("description", val)}
      />
      <ImageInput
        label="Image"
        value={formData?.image_url ?? ""}
        previewSize={96}
        onChange={(url) => handleChange("image_url", url)}
      />
      <div className="mt-2 border-t border-line pt-3">
        <Checkbox
          label="Show this portofolio on the site"
          checked={formData?.is_active ?? false}
          onChange={(val) => handleChange("is_active", val)}
        />
      </div>
    </FormShell>
  );
};

export default PortofolioForm;

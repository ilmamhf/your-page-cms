import { useState } from "react";
import type { PortofolioItem, ContentsData } from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import FeedbackBar from "../../../components/FeedbackBar";
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
}

type Feedback = { type: "success" | "error"; message: string } | null;

// The parent keys this form by item id, so it remounts on selection change
// and can initialize straight from props.
const PortofolioForm = ({ portofolioItem, onSaveSuccess }: PortofolioFormProps) => {
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
    <div className="p-4 w-full border-l h-screen overflow-y-auto flex flex-col">
      <div className="pb-3 text-2xl">Edit Portofolio</div>

      {feedback && <FeedbackBar type={feedback.type} message={feedback.message} />}

      <InputField
        label="Portofolio Name"
        id="portofolioName"
        value={formData?.title ?? ""}
        onChange={(val) => handleChange("title", val)}
      />
      <InputField
        label="Portofolio Description"
        id="portofolioDesc"
        value={formData?.description ?? ""}
        onChange={(val) => handleChange("description", val)}
      />
      <ImageInput
        label="Image"
        value={formData?.image_url ?? ""}
        previewSize={96}
        onChange={(url) => handleChange("image_url", url)}
      />
      <Checkbox
        label="Is Active ?"
        checked={formData?.is_active ?? false}
        onChange={(val) => handleChange("is_active", val)}
      />

      <div className="flex w-full justify-end py-4">
        <button
          className="border px-4 py-2 disabled:opacity-50"
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default PortofolioForm;

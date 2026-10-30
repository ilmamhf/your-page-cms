import { useState } from "react";
import type { ServiceItem, ContentsData } from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import FeedbackBar from "../../../components/FeedbackBar";
import ImageInput from "../../../components/ImageInput";
import InputField from "../../../components/InputField";
import api from "../../../../api/axios";
import { errorMessage } from "../../../../api/error";

interface ServicesFormProps {
  serviceItem: ServiceItem | null;
  onSaveSuccess: <K extends keyof ContentsData>(
    updatedContent: ContentsData[K][number],
    contentType: K,
  ) => void;
}

type Feedback = { type: "success" | "error"; message: string } | null;

// The parent keys this form by item id, so it remounts on selection change
// and can initialize straight from props.
const ServicesForm = ({ serviceItem, onSaveSuccess }: ServicesFormProps) => {
  const [formData, setFormData] = useState<ServiceItem | null>(serviceItem);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleChange = <K extends keyof ServiceItem>(
    fieldName: K,
    value: ServiceItem[K],
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
      const response = await api.put(`/service/${formData.id}`, {
        title: formData.title,
        description: formData.description,
        icon_url: formData.icon_url,
        is_active: formData.is_active,
        order: formData.order,
      });

      onSaveSuccess(response.data.data as ServiceItem, "services");
      setFeedback({ type: "success", message: "Service saved." });
    } catch (err) {
      setFeedback({ type: "error", message: errorMessage(err, "Failed to save the service.") });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 w-full border-l h-screen overflow-y-auto flex flex-col">
      <div className="pb-3 text-2xl">Edit Service</div>

      {feedback && <FeedbackBar type={feedback.type} message={feedback.message} />}

      <InputField
        label="Service Name"
        id="serviceName"
        value={formData?.title ?? ""}
        onChange={(val) => handleChange("title", val)}
      />
      <InputField
        label="Service Description"
        id="serviceDesc"
        value={formData?.description ?? ""}
        onChange={(val) => handleChange("description", val)}
      />
      <ImageInput
        label="Icon (optional)"
        value={formData?.icon_url ?? ""}
        onChange={(url) => handleChange("icon_url", url)}
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

export default ServicesForm;

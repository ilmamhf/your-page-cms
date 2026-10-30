import { useState } from "react";
import type { ServiceItem, ContentsData } from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import FormShell from "../../../components/FormShell";
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
  onCancel: () => void;
}

type Feedback = { type: "success" | "error"; message: string } | null;

// The parent keys this form by item id, so it remounts on selection change
// and can initialize straight from props.
const ServicesForm = ({ serviceItem, onSaveSuccess, onCancel }: ServicesFormProps) => {
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
    <FormShell
      title="Edit service"
      subtitle={formData?.title}
      feedback={feedback}
      saving={saving}
      onSave={handleSave}
      onCancel={onCancel}
    >
      <InputField
        label="Service name"
        id="serviceName"
        value={formData?.title ?? ""}
        onChange={(val) => handleChange("title", val)}
      />
      <InputField
        label="Description"
        id="serviceDesc"
        value={formData?.description ?? ""}
        textarea={true}
        onChange={(val) => handleChange("description", val)}
      />
      <ImageInput
        label="Icon (optional)"
        value={formData?.icon_url ?? ""}
        onChange={(url) => handleChange("icon_url", url)}
      />
      <div className="mt-2 border-t border-line pt-3">
        <Checkbox
          label="Show this service on the site"
          checked={formData?.is_active ?? false}
          onChange={(val) => handleChange("is_active", val)}
        />
      </div>
    </FormShell>
  );
};

export default ServicesForm;

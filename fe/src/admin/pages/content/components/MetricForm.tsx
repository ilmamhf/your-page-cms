import { useState } from "react";
import type { MetricItem, ContentsData } from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import FormShell from "../../../components/FormShell";
import InputField from "../../../components/InputField";
import api from "../../../../api/axios";
import { errorMessage } from "../../../../api/error";

interface MetricFormProps {
  metricItem: MetricItem | null;
  onSaveSuccess: <K extends keyof ContentsData>(
    updatedContent: ContentsData[K][number],
    contentType: K,
  ) => void;
  onCancel: () => void;
}

type Feedback = { type: "success" | "error"; message: string } | null;

// The parent keys this form by item id, so it remounts on selection change
// and can initialize straight from props.
const MetricForm = ({ metricItem, onSaveSuccess, onCancel }: MetricFormProps) => {
  const [formData, setFormData] = useState<MetricItem | null>(metricItem);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleChange = <K extends keyof MetricItem>(
    fieldName: K,
    value: MetricItem[K],
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
      const response = await api.put(`/metric/${formData.id}`, {
        label: formData.label,
        value: Number(formData.value),
        suffix: formData.suffix,
        is_active: formData.is_active,
        order: formData.order,
      });

      onSaveSuccess(response.data.data as MetricItem, "metrics");
      setFeedback({ type: "success", message: "Metric saved." });
    } catch (err) {
      setFeedback({ type: "error", message: errorMessage(err, "Failed to save the metric.") });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormShell
      title="Edit metric"
      subtitle={formData?.label}
      feedback={feedback}
      saving={saving}
      onSave={handleSave}
      onCancel={onCancel}
    >
      <InputField
        label="Label"
        id="metricName"
        value={formData?.label ?? ""}
        onChange={(val) => handleChange("label", val)}
      />
      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="Value"
          id="metricValue"
          type="number"
          value={formData?.value ?? ""}
          onChange={(val) => handleChange("value", Number(val))}
        />
        <InputField
          label="Suffix"
          id="metricSuffix"
          placeholder="e.g. %, +, k"
          value={formData?.suffix ?? ""}
          onChange={(val) => handleChange("suffix", val)}
        />
      </div>
      <div className="mt-2 border-t border-line pt-3">
        <Checkbox
          label="Show this metric on the site"
          checked={formData?.is_active ?? false}
          onChange={(val) => handleChange("is_active", val)}
        />
      </div>
    </FormShell>
  );
};

export default MetricForm;

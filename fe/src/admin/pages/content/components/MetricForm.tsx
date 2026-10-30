import { useState } from "react";
import type { MetricItem, ContentsData } from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import FeedbackBar from "../../../components/FeedbackBar";
import InputField from "../../../components/InputField";
import api from "../../../../api/axios";
import { errorMessage } from "../../../../api/error";

interface MetricFormProps {
  metricItem: MetricItem | null;
  onSaveSuccess: <K extends keyof ContentsData>(
    updatedContent: ContentsData[K][number],
    contentType: K,
  ) => void;
}

type Feedback = { type: "success" | "error"; message: string } | null;

// The parent keys this form by item id, so it remounts on selection change
// and can initialize straight from props.
const MetricForm = ({ metricItem, onSaveSuccess }: MetricFormProps) => {
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
    <div className="p-4 w-full border-l h-screen overflow-y-auto flex flex-col">
      <div className="pb-3 text-2xl">Edit Metric</div>

      {feedback && <FeedbackBar type={feedback.type} message={feedback.message} />}

      <InputField
        label="Metric Name"
        id="metricName"
        value={formData?.label ?? ""}
        onChange={(val) => handleChange("label", val)}
      />
      <InputField
        label="Metric Value"
        id="metricValue"
        type="number"
        value={formData?.value ?? ""}
        onChange={(val) => handleChange("value", Number(val))}
      />
      <InputField
        label="Suffix"
        id="metricSuffix"
        value={formData?.suffix ?? ""}
        onChange={(val) => handleChange("suffix", val)}
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

export default MetricForm;

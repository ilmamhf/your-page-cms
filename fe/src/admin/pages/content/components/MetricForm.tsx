import { useEffect, useState } from "react";
import type { MetricItem } from "../../../../types/landing";
import InputField from "../../../components/InputField";
import Checkbox from "../../../components/Checkbox";
import type { ContentsData } from "../ContentPage";
import api from "../../../../api/axios";
import axios from "axios";

interface MetricFormProps {
  metricItem: MetricItem | null;
  onSaveSuccess: <K extends keyof ContentsData>(
    updatedContent: ContentsData[K][number],
    contentType: K,
  ) => void;
}

const MetricForm = ({ metricItem, onSaveSuccess }: MetricFormProps) => {
  const [formData, setFormData] = useState<MetricItem | null>(null);

  useEffect(() => {
    console.log("Data dari parent:", metricItem);
    setFormData(metricItem);
  }, [metricItem]);

  const handleChange = <K extends keyof MetricItem>(
    fieldName: K,
    value: MetricItem[K],
  ) => {
    setFormData((previous) => {
      if (previous === null) {
        return previous;
      }
      return {
        ...previous,
        [fieldName]: value,
      };
    });
  };

  const handleSave = async () => {
    if (!formData) return;
    try {
      const response = await api.put(`/metric/${formData.id}`, {
        label: formData.label,
        value: formData.value,
        suffix: formData.suffix,
        is_active: formData.is_active,
        order: formData.order,
      });

      const updated = response.data.data;
      onSaveSuccess(updated, "metrics");

      console.log("saved");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("Response status: ", err.response?.status);
        console.log("Response data:", err.response?.data);
      } else {
        console.log("Failed updating data", err);
      }
    }
  };

  return (
    <div className="p-4 w-full border-l h-screen flex flex-col">
      <div className="pb-3 text-2xl">Edit Metric</div>
      <InputField
        label="Metric Name"
        id="metricName"
        value={formData?.label ?? ""}
        onChange={(val) => handleChange("label", val)}
      />
      <InputField
        label="Metric Value"
        id="metricValue"
        value={formData?.value ?? ""}
        onChange={(val) => handleChange("value", val)}
      />
      <InputField
        label="Suffix"
        id="metricIcon"
        value={formData?.suffix ?? ""}
        onChange={(val) => handleChange("suffix", val)}
      />
      <Checkbox
        label="Is Active ?"
        checked={formData?.is_active ?? false}
        onChange={(val) => handleChange("is_active", val)}
      />

      <div className="flex w-full justify-end">
        <button
          className="border px-4 py-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MetricForm;

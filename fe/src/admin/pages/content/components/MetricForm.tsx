import React, { useEffect, useState } from "react";
import type { MetricItem } from "../../../../types/landing";
import InputField from "../../../components/InputField";
import Checkbox from "../../../components/Checkbox";

interface MetricFormProps {
  metricItem: MetricItem | null;
}

const MetricForm = ({ metricItem }: MetricFormProps) => {
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
    try {
      console.log("saved");
    } catch (error) {
      console.error("Failed Saving:", error);
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

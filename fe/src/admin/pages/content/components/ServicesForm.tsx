import React, { useEffect, useState } from "react";
import type { ServiceItem } from "../../../../types/landing";
import InputField from "../../../components/InputField";
import Checkbox from "../../../components/Checkbox";

interface ServicesFormProps {
  serviceItem: ServiceItem | null;
}

const ServicesForm = ({ serviceItem }: ServicesFormProps) => {
  const [formData, setFormData] = useState<ServiceItem | null>(null);

  useEffect(() => {
    console.log("Data dari parent:", serviceItem);
    setFormData(serviceItem);
  }, [serviceItem]);

  const handleChange = <K extends keyof ServiceItem>(
    fieldName: K,
    value: ServiceItem[K],
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
      <div className="pb-3 text-2xl">Edit Service</div>
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
      {/* <InputField
        label="Icon (opsional)"
        id="serviceIcon"
        value={formData?.icon_url ?? ""}
        onChange={(val) => handleChange("icon_url", val)}
      /> */}
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

export default ServicesForm;

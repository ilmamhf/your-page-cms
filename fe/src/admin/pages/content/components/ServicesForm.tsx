import { useEffect, useState } from "react";
import type { ServiceItem } from "../../../../types/landing";
import InputField from "../../../components/InputField";
import Checkbox from "../../../components/Checkbox";
import api from "../../../../api/axios";
import axios from "axios";
import type { ContentsData } from "../ContentPage";

interface ServicesFormProps {
  serviceItem: ServiceItem | null;
  onSaveSuccess: <K extends keyof ContentsData>(
    updatedContent: ContentsData[K][number],
    contentType: K,
  ) => void;
}

const ServicesForm = ({ serviceItem, onSaveSuccess }: ServicesFormProps) => {
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
    if (!formData) return;
    try {
      const response = await api.put(`/service/${formData.id}`, {
        title: formData.title,
        description: formData.description,
        icon_url: formData.icon_url,
        is_active: formData.is_active,
        order: formData.order,
      });

      const updated = response.data.data;
      onSaveSuccess(updated, "services");

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

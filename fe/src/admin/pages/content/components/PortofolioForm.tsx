import { useEffect, useState } from "react";
import type { PortofolioItem } from "../../../../types/landing";
import InputField from "../../../components/InputField";
import Checkbox from "../../../components/Checkbox";
import type { ContentsData } from "../ContentPage";
import api from "../../../../api/axios";
import axios from "axios";

interface PortofolioFormProps {
  portofolioItem: PortofolioItem | null;
  onSaveSuccess: <K extends keyof ContentsData>(
    updatedContent: ContentsData[K][number],
    contentType: K,
  ) => void;
}

const PortofolioForm = ({
  portofolioItem,
  onSaveSuccess,
}: PortofolioFormProps) => {
  const [formData, setFormData] = useState<PortofolioItem | null>(null);

  useEffect(() => {
    console.log("Data dari parent:", portofolioItem);
    setFormData(portofolioItem);
  }, [portofolioItem]);

  const handleChange = <K extends keyof PortofolioItem>(
    fieldName: K,
    value: PortofolioItem[K],
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
      const response = await api.put(`/portofolio/${formData.id}`, {
        title: formData.title,
        description: formData.description,
        icon_url: formData.image_url,
        is_active: formData.is_active,
        order: formData.order,
      });

      const updated = response.data.data;
      onSaveSuccess(updated, "portofolios");

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
      <div className="pb-3 text-2xl">Edit Portofolio</div>
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
      {/* <InputField
        label="Image (opsional)"
        id="portofolioIcon"
        value={formData?.image_url ?? ""}
        onChange={(val) => handleChange("image_url", val)}
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

export default PortofolioForm;

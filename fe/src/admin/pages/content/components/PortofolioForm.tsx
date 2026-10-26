import React, { useEffect, useState } from "react";
import type { PortofolioItem } from "../../../../types/landing";
import InputField from "../../../components/InputField";
import Checkbox from "../../../components/Checkbox";

interface PortofolioFormProps {
  portofolioItem: PortofolioItem | null;
}

const PortofolioForm = ({ portofolioItem }: PortofolioFormProps) => {
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
    try {
      console.log("saved");
    } catch (error) {
      console.error("Failed Saving:", error);
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

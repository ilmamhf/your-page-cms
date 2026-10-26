import React, { useState } from "react";
import type { ServiceItem } from "../../../../types/landing";
import InputField from "../../../components/InputField";
import Checkbox from "../../../components/Checkbox";

interface ServicesFormProps {
  serviceItem: ServiceItem | null;
  handleChange: (fieldName: keyof ServiceItem, value: any) => {};
}

const ServicesForm = ({ serviceItem, handleChange }: ServicesFormProps) => {
  const [formData, setFormData] = useState<ServiceItem | null>(null);

  return (
    <>
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
      <InputField
        label="Icon (opsional)"
        id="serviceIcon"
        value={formData?.icon_url ?? ""}
        onChange={(val) => handleChange("icon_url", val)}
      />
      <Checkbox
        label="Service Name"
        checked={formData?.is_active ?? false}
        onChange={(val) => handleChange("is_active", val)}
      />
    </>
  );
};

export default ServicesForm;

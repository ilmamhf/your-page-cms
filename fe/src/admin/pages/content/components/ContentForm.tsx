import { useEffect, useState } from "react";
import type {
  Section,
  SectionHeroDetail,
  SectionItem,
  ServiceItem,
} from "../../../../types/landing";
import Checkbox from "../../../components/Checkbox";
import InputField from "../../../components/InputField";
import SectionTypeDropdown from "../../../components/SectionTypeDropdown";
import api from "../../../../api/axios";
import axios from "axios";
import ServicesForm from "./ServicesForm";

interface ContentFormProps {
  content: SectionItem | null;
  //   onSaveSuccess: (updatedSection: Section) => void;
  type: string;
}

const ContentForm = ({ content, type }: ContentFormProps) => {
  const [form, setForm] = useState<SectionItem | null>(null);

  useEffect(() => {
    console.log("data dari parent:", content);
    setForm(content);
  }, [content]);

  const handleChange = (a: any, b: any) => {};

  if (!content || !form) {
    return <div></div>;
  }

  const DynamicForm = (content: SectionItem, type: string) => {
    switch (type) {
      case "services":
        return (
          <ServicesForm
            serviceItem={content as ServiceItem}
            handleChange={function (
              fieldName: keyof ServiceItem,
              value: any,
            ): {} {
              throw new Error("Function not implemented.");
            }}
          />
        );
    }
  };

  return (
    <div className="p-4 w-full border-l h-screen flex flex-col">
      <div className="text-2xl">Edit Section</div>
      <div>
        <InputField
          label=""
          id={"title_" + String(form.id)}
          value={""}
          onChange={(val) => handleChange("title", val)}
        />
        <InputField
          label="Subtitle"
          id={"subtitle_" + String(form.id)}
          value={""}
          textarea={true}
          onChange={(val) => handleChange("subtitle", val)}
        />
        <SectionTypeDropdown
          value={""}
          onChange={(val) =>
            handleChange("section_type", val as Section["section_type"])
          }
        />

        {/* order component idk how to make */}

        <Checkbox
          label="Is Active?"
          checked={form.is_active}
          onChange={(val) => handleChange("is_active", val)}
        />

        <div className="flex w-full justify-end">
          <button
            className="border px-4 py-2"
            onClick={() => {}}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentForm;

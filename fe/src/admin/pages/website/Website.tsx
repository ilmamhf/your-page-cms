import { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import type { LandingPageData, Page, Section } from "../../../types/landing";
import api from "../../../api/axios";
import SectionTypeDropdown from "../../components/SectionTypeDropdown";
import Checkbox from "../../components/Checkbox";

const Website = () => {
  const [FormData, setFormData] = useState<Page[]>([]);

  const fetchWebsite = async () => {
    try {
      const response = await api.get("/landing-page");
      if (!response) {
        throw new Error("Failed to fetch website");
      }

      const data = response.data.data as LandingPageData;

      setFormData(data.pages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = () => {};

  useEffect(() => {
    fetchWebsite();
  }, []);

  return (
    <section className="">
      <div>Website Management</div>

      <div className="">
        {FormData.map((page: Page) => (
          <div className="border p-4">
            <div>{page.name}</div>
            <div>
              {page.sections.map((section: Section, index) => (
                <div className="border p-4 my-4">
                  <div>
                    {page.name}_{index + 1}
                  </div>
                  <div>
                    <InputField
                      label="title"
                      id={String(page.name) + "_title_" + String(section.id)}
                      value={section.title}
                      onChange={handleChange}
                    />
                    <InputField
                      label="subtitle"
                      id={String(page.name) + "_subtitle_" + String(section.id)}
                      value={section.subtitle ? section.subtitle : ""}
                      textarea={true}
                      onChange={handleChange}
                    />
                    <SectionTypeDropdown
                      value={section.section_type}
                      onChange={handleChange}
                    />

                    {/* order component idk how to make */}

                    <Checkbox
                      label="Is Active?"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Website;

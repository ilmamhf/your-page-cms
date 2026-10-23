import { useEffect, useState } from "react";
import type { LandingPageData, Page, Section } from "../../../types/landing";
import api from "../../../api/axios";
import SectionForm from "./components/SectionForm";
import SectionList from "./components/SectionList";

const Website = () => {
  const [formData, setFormData] = useState<Page[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const fetchWebsite = async () => {
    try {
      const response = await api.get("/sections-cms");
      if (!response) {
        throw new Error("Failed to fetch website");
      }

      const data = response.data.data as LandingPageData;
      console.log(data);

      setFormData(data.pages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSectionSaveSuccess = (updatedSection: Section) => {
    setSelectedSection(updatedSection);
    setFormData((prevPages) =>
      prevPages.map((page) => ({
        ...page,
        sections: page.sections.map((sec) =>
          sec.id === updatedSection.id ? updatedSection : sec,
        ),
      })),
    );
  };

  const handleAddNewSection = async (pageId: string | number) => {
    try {
      const newSectionPayload = {
        page_id: pageId,
        title: "Your New Section Here",
        subtitle: "",
        section_type: "hero",
        is_active: false,
      };
      const response = await api.post("/sections", newSectionPayload);
      if (!response) {
        throw new Error("Failed to create new Section");
      }

      const createdSection: Section = response.data.data;

      setFormData((prevPages) =>
        prevPages.map((page) => {
          if (page.id == pageId) {
            return {
              ...page,
              sections: [...page.sections, createdSection],
            };
          }
          return page;
        }),
      );

      setSelectedSection(response.data.data as Section);
    } catch (error) {
      console.error("Failed creating new section:", error);
    }
  };

  useEffect(() => {
    fetchWebsite();
  }, []);

  return (
    <section className="">
      <div className="grid grid-flow-col grid-cols-5 gap-2">
        <section className="col-span-2 p-4">
          <SectionList
            pages={formData}
            onSelect={setSelectedSection}
            onAddSection={handleAddNewSection}
          />
        </section>
        <section className="col-span-3 flex">
          <SectionForm
            section={selectedSection}
            onSaveSuccess={handleSectionSaveSuccess}
          />
        </section>
      </div>
    </section>
  );
};

export default Website;

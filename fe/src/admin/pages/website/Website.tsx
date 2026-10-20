import { useEffect, useState } from "react";
import type { LandingPageData, Page, Section } from "../../../types/landing";
import api from "../../../api/axios";
import SectionForm from "./components/SectionForm";

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

  const handleSectionUpdate = (
    pageId: string | number,
    updatedSection: Section,
  ) => {
    setFormData((prevPages) => {
      return prevPages.map((page) => {
        return {
          ...page,
          sections: page.sections.map((section) =>
            section.id === updatedSection.id ? updatedSection : section,
          ),
        };
      });
    });
  };

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
                <SectionForm
                  section={section}
                  index={index}
                  pageName={page.name}
                  onUpdateSection={(updatedSection) =>
                    handleSectionUpdate(page.id || page.name, updatedSection)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Website;

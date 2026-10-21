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
          />
        </section>
        <section className="col-span-3 flex">
          <SectionForm section={selectedSection} />
        </section>
      </div>
    </section>
  );
};

export default Website;

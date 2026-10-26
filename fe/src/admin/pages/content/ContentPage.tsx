import { useEffect, useState } from "react";
import ServicesForm from "./components/ServicesForm";
import type {
  MetricItem,
  PortofolioItem,
  Section,
  SectionItem,
  ServiceItem,
} from "../../../types/landing";
import ContentForm from "./components/ContentForm";
import ContentList from "./components/ContentList";

export interface ContentsData {
  services: ServiceItem[];
  portofolios: PortofolioItem[];
  metrics: MetricItem[];
}

const sample: ContentsData = {
  services: [
    {
      id: 1,
      title: "service a",
      description: "desc",
      icon_url: "",
      order: 1,
      is_active: true,
    },
    {
      id: 2,
      title: "service b",
      description: "desc",
      icon_url: "",
      order: 2,
      is_active: true,
    },
  ],
  portofolios: [
    {
      id: 1,
      title: "service a",
      description: "desc",
      image_url: "",
      order: 1,
      is_active: true,
    },
  ],
  metrics: [
    {
      id: 1,
      label: "Clients",
      value: 32,
      suffix: "+",
      order: 1,
      is_active: true,
    },
  ],
};

const ContentPage = () => {
  const [contentData, setContentData] = useState<ContentsData>({
    services: [],
    portofolios: [],
    metrics: [],
  });
  const [servicesData, setServicesData] = useState<ServiceItem[]>();

  const [selectedContent, setselectedContent] = useState<SectionItem | null>(
    null,
  );

  const fetchContents = async () => {
    try {
      // fetch
      setContentData(sample);
      setServicesData(sample.services);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleSave = async () => {};

  return (
    <div className="grid grid-flow-col grid-cols-5">
      <section className="col-span-2 p-4">
        <ContentList
          contentData={contentData}
          onSelect={function (content: SectionItem): void {
            throw new Error("Function not implemented.");
          }}
          onDeleteContent={function (): void {
            throw new Error("Function not implemented.");
          }}
          onAddContent={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </section>
      <section className="border-l col-span-3 h-screen">
        <ContentForm
          content={selectedContent}
          // onSaveSuccess={handleSave}
          type={""}
        />
      </section>
      d
    </div>
  );
};

export default ContentPage;

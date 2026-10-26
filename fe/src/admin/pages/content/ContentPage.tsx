import { useEffect, useState } from "react";
import ServicesForm from "./components/ServicesForm";
import type {
  MetricItem,
  PortofolioItem,
  Section,
  SectionItem,
  ServiceItem,
} from "../../../types/landing";
import ContentList from "./components/ContentList";
import PortofolioForm from "./components/PortofolioForm";
import MetricForm from "./components/MetricForm";

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

  const [selectedContent, setselectedContent] = useState<SectionItem | null>(
    null,
  );
  const [selectedType, setSelectedType] = useState("");

  const fetchContents = async () => {
    try {
      // fetch
      setContentData(sample);
      // setServicesData(sample.services);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleSave = async () => {};

  const renderForm = (
    selectedItem: SectionItem | null,
    typeSelected: string,
  ) => {
    switch (typeSelected) {
      case "services":
        return <ServicesForm serviceItem={selectedItem as ServiceItem} />;
      case "portofolios":
        return (
          <PortofolioForm portofolioItem={selectedItem as PortofolioItem} />
        );
      case "metrics":
        return <MetricForm metricItem={selectedItem as MetricItem} />;
    }
  };

  return (
    <div className="grid grid-flow-col grid-cols-5">
      <section className="col-span-2 p-4">
        <ContentList
          contentData={contentData}
          onSelect={(content, type) => {
            setSelectedType(type);
            setselectedContent(content);
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
        {renderForm(selectedContent, selectedType)}
      </section>
      d
    </div>
  );
};

export default ContentPage;

import { useEffect, useState } from "react";
import ServicesForm from "./components/ServicesForm";
import type {
  MetricItem,
  PortofolioItem,
  SectionItem,
  ServiceItem,
} from "../../../types/landing";
import ContentList from "./components/ContentList";
import PortofolioForm from "./components/PortofolioForm";
import MetricForm from "./components/MetricForm";
import api from "../../../api/axios";

export interface ContentsData {
  services: ServiceItem[];
  portofolios: PortofolioItem[];
  metrics: MetricItem[];
}

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
      const response = await api.get("/content-cms");

      const data = response.data.data;
      setContentData(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleSaveSuccess = <K extends keyof ContentsData>(
    updatedContent: ContentsData[K][number],
    contentType: K,
  ) => {
    setselectedContent(updatedContent);

    setContentData((prevContents) => ({
      ...prevContents,
      [contentType]: prevContents[contentType].map((item) =>
        item.id === updatedContent.id ? updatedContent : item,
      ),
    }));
  };

  const payloadGenerator = (contentType: keyof ContentsData) => {
    switch (contentType) {
      case "services":
        return {
          title: "Your New Service Here",
          description: "",
          icon_url: "",
          is_active: false,
        };
      case "portofolios":
        return {
          title: "Your New Portofolio Here",
          description: "",
          image_url: "",
          is_active: false,
        };
      case "metrics":
        return {
          label: "Your New Metric Here",
          value: 0,
          suffix: "",
          is_active: false,
        };
      default:
        throw new Error("Payload Error");
    }
  };

  const handleAddNewContent = async <K extends keyof ContentsData>(
    contentType: K,
  ) => {
    try {
      const newPayload = payloadGenerator(contentType);
      console.log("new content:", newPayload);
      const response = await api.post(`/${String(contentType)}`, newPayload);
      if (!response) {
        throw new Error("Failed to create new Content");
      }

      const createdContent: SectionItem = response.data.data;

      setContentData((prev) => ({
        ...prev,
        [contentType]: [...prev[contentType], createdContent],
      }));

      setselectedContent(createdContent);
    } catch (error) {
      console.error("Failed creating new content:", error);
    }
  };

  const handleDeleteContent = async <K extends keyof ContentsData>(
    contentType: K,
    contentId: string | number,
  ) => {
    try {
      const newContentType = contentType.slice(0, -1);
      const response = await api.delete(`/${newContentType}/${contentId}`);

      if (!response) {
        throw new Error("Failed deleting section");
      }
      setContentData((prev) => ({
        ...prev,
        [contentType]: prev[contentType].filter(
          (item) => item.id !== contentId,
        ),
      }));

      if (selectedContent?.id === contentId) {
        setselectedContent(null);
      }
    } catch (err) {
      console.error("Failed deleting section:", err);
    }
  };

  const renderForm = (
    selectedItem: SectionItem | null,
    typeSelected: string,
  ) => {
    if (selectedItem === null) return <></>;
    switch (typeSelected) {
      case "services":
        return (
          <ServicesForm
            serviceItem={selectedItem as ServiceItem}
            onSaveSuccess={handleSaveSuccess}
          />
        );
      case "portofolios":
        return (
          <PortofolioForm
            portofolioItem={selectedItem as PortofolioItem}
            onSaveSuccess={handleSaveSuccess}
          />
        );
      case "metrics":
        return (
          <MetricForm
            metricItem={selectedItem as MetricItem}
            onSaveSuccess={handleSaveSuccess}
          />
        );
    }
  };

  return (
    <div className="grid grid-cols-5 h-full overflow-hidden">
      <section className="col-span-2 p-4 h-full overflow-y-auto">
        <ContentList
          contentData={contentData}
          onSelect={(content, type) => {
            setSelectedType(type);
            setselectedContent(content);
          }}
          onDeleteContent={handleDeleteContent}
          onAddContent={handleAddNewContent}
        />
      </section>
      <section className="col-span-3 h-screen">
        {renderForm(selectedContent, selectedType)}
      </section>
    </div>
  );
};

export default ContentPage;

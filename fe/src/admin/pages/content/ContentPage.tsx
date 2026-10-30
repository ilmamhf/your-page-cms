import { useEffect, useState } from "react";
import ServicesForm from "./components/ServicesForm";
import type {
  ContentsData,
  MetricItem,
  PortofolioItem,
  SectionItem,
  ServiceItem,
} from "../../../types/landing";
import ContentList from "./components/ContentList";
import PortofolioForm from "./components/PortofolioForm";
import MetricForm from "./components/MetricForm";
import FeedbackBar from "../../components/FeedbackBar";
import api from "../../../api/axios";
import { errorMessage } from "../../../api/error";

type Feedback = { type: "success" | "error"; message: string } | null;

const emptyContents: ContentsData = {
  services: [],
  portofolios: [],
  metrics: [],
};

const ContentPage = () => {
  const [contentData, setContentData] = useState<ContentsData>(emptyContents);
  const [selectedContent, setSelectedContent] = useState<SectionItem | null>(null);
  const [selectedType, setSelectedType] = useState<keyof ContentsData | "">("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const fetchContents = async () => {
    try {
      const response = await api.get("/content-cms");
      setContentData({ ...emptyContents, ...response.data.data });
    } catch (error) {
      setFeedback({ type: "error", message: errorMessage(error, "Failed to load content.") });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    fetchContents();
  };

  const handleSaveSuccess = <K extends keyof ContentsData>(
    updatedContent: ContentsData[K][number],
    contentType: K,
  ) => {
    setSelectedContent(updatedContent);

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
    }
  };

  const handleAddNewContent = async <K extends keyof ContentsData>(contentType: K) => {
    setFeedback(null);
    try {
      const response = await api.post(`/${contentType}`, payloadGenerator(contentType));

      const createdContent = response.data.data as SectionItem;

      setContentData((prev) => ({
        ...prev,
        [contentType]: [...prev[contentType], createdContent],
      }));

      setSelectedContent(createdContent);
      setSelectedType(contentType);
    } catch (error) {
      setFeedback({ type: "error", message: errorMessage(error, "Failed to create the item.") });
    }
  };

  const handleDeleteContent = async <K extends keyof ContentsData>(
    contentType: K,
    contentId: number,
  ) => {
    setFeedback(null);
    try {
      // endpoint is singular: /services -> /service/{id}
      const singular = contentType.slice(0, -1);
      await api.delete(`/${singular}/${contentId}`);

      setContentData((prev) => ({
        ...prev,
        [contentType]: prev[contentType].filter((item) => item.id !== contentId),
      }));

      if (selectedContent?.id === contentId) {
        setSelectedContent(null);
      }

      setFeedback({ type: "success", message: "Item deleted." });
    } catch (error) {
      setFeedback({ type: "error", message: errorMessage(error, "Failed to delete the item.") });
    }
  };

  const renderForm = () => {
    const key = selectedContent ? `${selectedType}_${selectedContent.id}` : "empty";

    switch (selectedType) {
      case "services":
        return (
          <ServicesForm
            key={key}
            serviceItem={selectedContent as ServiceItem}
            onSaveSuccess={handleSaveSuccess}
          />
        );
      case "portofolios":
        return (
          <PortofolioForm
            key={key}
            portofolioItem={selectedContent as PortofolioItem}
            onSaveSuccess={handleSaveSuccess}
          />
        );
      case "metrics":
        return (
          <MetricForm
            key={key}
            metricItem={selectedContent as MetricItem}
            onSaveSuccess={handleSaveSuccess}
          />
        );
      default:
        return (
          <div className="p-4 w-full border-l h-screen text-gray-500">
            Select an item on the left to edit it.
          </div>
        );
    }
  };

  if (loading) {
    return <div className="p-4">Loading content...</div>;
  }

  return (
    <div className="grid grid-cols-5 h-full overflow-hidden">
      <section className="col-span-2 p-4 h-full overflow-y-auto">
        {feedback && (
          <div className="flex items-center gap-2">
            <FeedbackBar
              type={feedback.type}
              message={feedback.message}
            />
            {feedback.type === "error" && (
              <button
                className="border px-3 py-2 text-sm shrink-0"
                onClick={handleRetry}
              >
                Retry
              </button>
            )}
          </div>
        )}
        <ContentList
          contentData={contentData}
          onSelect={(content, type) => {
            setSelectedType(type);
            setSelectedContent(content);
          }}
          onDeleteContent={handleDeleteContent}
          onAddContent={handleAddNewContent}
        />
      </section>
      <section className="col-span-3 h-screen">{renderForm()}</section>
    </div>
  );
};

export default ContentPage;

import { useEffect, useState } from "react";
import type { LandingPageData, Page, Section } from "../../../types/landing";
import api from "../../../api/axios";
import { errorMessage } from "../../../api/error";
import FeedbackBar from "../../components/FeedbackBar";
import SectionForm from "./components/SectionForm";
import SectionList from "./components/SectionList";

type Feedback = { type: "success" | "error"; message: string } | null;

const Website = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const fetchWebsite = async () => {
    try {
      const response = await api.get("/sections-cms");
      const data = response.data.data as LandingPageData;

      setPages(data.pages);
    } catch (error) {
      setFeedback({ type: "error", message: errorMessage(error, "Failed to load sections.") });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsite();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    fetchWebsite();
  };

  const handleSectionSaveSuccess = (updatedSection: Section) => {
    setSelectedSection(updatedSection);
    setPages((prevPages) =>
      prevPages.map((page) => ({
        ...page,
        sections: page.sections.map((sec) =>
          sec.id === updatedSection.id ? updatedSection : sec,
        ),
      })),
    );
  };

  const handleAddNewSection = async (pageId: number, sectionType: Section["section_type"] = "hero") => {
    setFeedback(null);
    try {
      const isHeroOrMetrics = sectionType === "hero" || sectionType === "metrics";
      const response = await api.post("/sections", {
        page_id: pageId,
        title: isHeroOrMetrics ? "" : "New Section",
        subtitle: "",
        section_type: sectionType,
        is_active: false,
        hero_detail: isHeroOrMetrics
          ? {
              section_id: 0, // will be set by backend
              hero_text: isHeroOrMetrics ? "New Hero Section" : "",
              description: "",
              eyebrow: "",
              image_url: null,
            }
          : null,
      });

      const createdSection = response.data.data as Section;

      setPages((prevPages) =>
        prevPages.map((page) =>
          page.id === pageId
            ? { ...page, sections: [...page.sections, createdSection] }
            : page,
        ),
      );

      setSelectedSection(createdSection);
    } catch (error) {
      setFeedback({ type: "error", message: errorMessage(error, "Failed to create the section.") });
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    setFeedback(null);
    try {
      await api.delete(`/section/${sectionId}`);

      setPages((prevPages) =>
        prevPages.map((page) => ({
          ...page,
          sections: page.sections.filter((sec) => sec.id !== sectionId),
        })),
      );

      if (selectedSection?.id === sectionId) {
        setSelectedSection(null);
      }

      setFeedback({ type: "success", message: "Section deleted." });
    } catch (error) {
      setFeedback({ type: "error", message: errorMessage(error, "Failed to delete the section.") });
    }
  };

  if (loading) {
    return <div className="p-4">Loading sections...</div>;
  }

  return (
    <section className="flex flex-col md:h-full">
      {feedback && (
        <div className="flex shrink-0 items-center gap-2 border-b border-line bg-app px-4 py-3 md:px-6">
          <div className="flex-1">
            <FeedbackBar
              type={feedback.type}
              message={feedback.message}
            />
          </div>
          {feedback.type === "error" && (
            <button
              className="btn-outline shrink-0 px-3 py-1.5 text-xs"
              onClick={handleRetry}
            >
              Retry
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:min-h-0 md:flex-1 md:grid-cols-5 md:overflow-hidden">
        <section className="border-b border-line p-4 md:col-span-2 md:h-full md:overflow-y-auto md:border-b-0 md:border-r md:p-6">
          <SectionList
            pages={pages}
            onSelect={setSelectedSection}
            onAddSection={handleAddNewSection}
            onDeleteSection={handleDeleteSection}
          />
        </section>
        <section className="flex md:col-span-3">
          <SectionForm
            key={selectedSection?.id ?? "none"}
            section={selectedSection}
            onSaveSuccess={handleSectionSaveSuccess}
            onCancel={() => setSelectedSection(null)}
          />
        </section>
      </div>
    </section>
  );
};

export default Website;

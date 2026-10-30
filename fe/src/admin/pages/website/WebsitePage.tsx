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

  const handleAddNewSection = async (pageId: number) => {
    setFeedback(null);
    try {
      const response = await api.post("/sections", {
        page_id: pageId,
        title: "Your New Section Here",
        subtitle: "",
        section_type: "hero",
        is_active: false,
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
    <section>
      {feedback && (
        <div className="p-4 pb-0 flex items-center gap-2">
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

      <div className="grid grid-cols-5 gap-2 h-full overflow-hidden">
        <section className="col-span-2 p-4 h-full overflow-y-auto">
          <SectionList
            pages={pages}
            onSelect={setSelectedSection}
            onAddSection={handleAddNewSection}
            onDeleteSection={handleDeleteSection}
          />
        </section>
        <section className="col-span-3 flex">
          <SectionForm
            key={selectedSection?.id ?? "none"}
            section={selectedSection}
            onSaveSuccess={handleSectionSaveSuccess}
          />
        </section>
      </div>
    </section>
  );
};

export default Website;

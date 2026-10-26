import type {
  MetricItem,
  Page,
  PortofolioItem,
  Section,
  SectionItem,
  ServiceItem,
} from "../../../../types/landing";
import type { ContentsData } from "../ContentPage";

interface ContentListProps {
  contentData: ContentsData;
  onSelect: (content: SectionItem) => void;
  onDeleteContent: () => void;
  onAddContent: () => void;
}

const ContentList = ({
  contentData,
  onSelect,
  onDeleteContent,
  onAddContent,
}: ContentListProps) => {
  return (
    <div className="grid">
      <div className="text-2xl pb-4">Contents Management</div>

      <div className="flex flex-col col-span-3">
        {/* Services */}
        <div className="flex flex-col">
          <div className="text-xl pb-2">Services List</div>
          <div className="grid grid-flow-row">
            {contentData.services.map((service: ServiceItem) => (
              <button
                className="border p-2 flex justify-between"
                key={service.id}
                onClick={() => onSelect(service)}
              >
                <div className="self-center">{service.title}</div>
                <button
                  className="border p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete ?")) {
                      onDeleteContent();
                    }
                  }}
                >
                  Delete
                </button>
              </button>
            ))}
          </div>
          <button
            className="border p-2"
            onClick={() => onAddContent()}
          >
            Add New Service
          </button>
        </div>

        {/* Portofolios */}
        <div className="flex flex-col pt-8">
          <div className="text-xl pb-2">Portofolio List</div>
          <div className="grid grid-flow-row">
            {contentData.portofolios.map((portofolio: PortofolioItem) => (
              <button
                className="border p-2 flex justify-between"
                key={portofolio.id}
                onClick={() => onSelect(portofolio)}
              >
                <div className="self-center">{portofolio.title}</div>
                <button
                  className="border p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete ?")) {
                      onDeleteContent();
                    }
                  }}
                >
                  Delete
                </button>
              </button>
            ))}
          </div>
          <button
            className="border p-2"
            onClick={() => onAddContent()}
          >
            Add New Service
          </button>
        </div>

        {/* Metrics */}
        <div className="flex flex-col pt-8">
          <div className="text-xl pb-2">Metric List</div>
          <div className="grid grid-flow-row">
            {contentData.metrics.map((metric: MetricItem) => (
              <button
                className="border p-2 flex justify-between"
                key={metric.id}
                onClick={() => onSelect(metric)}
              >
                <div className="self-center">
                  {metric.value} {metric.label}
                </div>
                <button
                  className="border p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete ?")) {
                      onDeleteContent();
                    }
                  }}
                >
                  Delete
                </button>
              </button>
            ))}
          </div>
          <button
            className="border p-2"
            onClick={() => onAddContent()}
          >
            Add New Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentList;

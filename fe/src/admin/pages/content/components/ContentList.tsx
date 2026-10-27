import type {
  MetricItem,
  PortofolioItem,
  SectionItem,
  ServiceItem,
} from "../../../../types/landing";
import type { ContentsData } from "../ContentPage";

interface ContentListProps {
  contentData: ContentsData;
  onSelect: (content: SectionItem | null, type: string) => void;
  onDeleteContent: <K extends keyof ContentsData>(
    contentType: K,
    id: string | number,
  ) => void;
  onAddContent: <K extends keyof ContentsData>(contentType: K) => void;
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
                onClick={() => {
                  onSelect(service, "services");
                  console.log("service:", service);
                }}
              >
                <div className="self-center">{service.title}</div>
                <button
                  className="border p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete ?")) {
                      onDeleteContent("services", service.id);
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
            onClick={() => onAddContent("services")}
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
                onClick={() => {
                  console.log(portofolio);
                  onSelect(portofolio, "portofolios");
                }}
              >
                <div className="self-center">{portofolio.title}</div>
                <button
                  className="border p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete ?")) {
                      onDeleteContent("portofolios", portofolio.id);
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
            onClick={() => onAddContent("portofolios")}
          >
            Add New Portofolio
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
                onClick={() => onSelect(metric, "metrics")}
              >
                <div className="self-center">
                  {metric.value} {metric.label}
                </div>
                <button
                  className="border p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete ?")) {
                      onDeleteContent("metrics", metric.id);
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
            onClick={() => onAddContent("metrics")}
          >
            Add New Metric
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentList;

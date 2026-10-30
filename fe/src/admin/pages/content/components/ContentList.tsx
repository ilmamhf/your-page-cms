import type {
  ContentsData,
  MetricItem,
  PortofolioItem,
  SectionItem,
  ServiceItem,
} from "../../../../types/landing";

interface ContentListProps {
  contentData: ContentsData;
  onSelect: (content: SectionItem, type: keyof ContentsData) => void;
  onDeleteContent: <K extends keyof ContentsData>(
    contentType: K,
    id: number,
  ) => void;
  onAddContent: <K extends keyof ContentsData>(contentType: K) => void;
}

interface ContentGroupProps<T extends SectionItem> {
  title: string;
  items: T[];
  label: (item: T) => string;
  type: keyof ContentsData;
  onSelect: (content: SectionItem, type: keyof ContentsData) => void;
  onDelete: (type: keyof ContentsData, id: number) => void;
  onAdd: (type: keyof ContentsData) => void;
}

const ContentGroup = <T extends SectionItem>({
  title,
  items,
  label,
  type,
  onSelect,
  onDelete,
  onAdd,
}: ContentGroupProps<T>) => (
  <div className="flex flex-col pb-8">
    <div className="text-xl pb-2">{title}</div>
    <div className="grid grid-flow-row border">
      {items.length === 0 && (
        <p className="p-2 text-sm text-gray-500">Nothing here yet.</p>
      )}
      {items.map((item) => (
        <div
          className="border-b flex justify-between items-center last:border-b-0"
          key={item.id}
        >
          <button
            className="p-2 flex-1 text-left"
            onClick={() => onSelect(item, type)}
          >
            {label(item)}
          </button>
          <button
            className="border p-2 m-1"
            onClick={() => {
              if (confirm("Delete this item?")) {
                onDelete(type, item.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
    <button
      className="border p-2"
      onClick={() => onAdd(type)}
    >
      Add New
    </button>
  </div>
);

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
        <ContentGroup<ServiceItem>
          title="Services List"
          items={contentData.services}
          label={(service) => service.title}
          type="services"
          onSelect={onSelect}
          onDelete={onDeleteContent}
          onAdd={onAddContent}
        />

        <ContentGroup<PortofolioItem>
          title="Portofolio List"
          items={contentData.portofolios}
          label={(portofolio) => portofolio.title}
          type="portofolios"
          onSelect={onSelect}
          onDelete={onDeleteContent}
          onAdd={onAddContent}
        />

        <ContentGroup<MetricItem>
          title="Metric List"
          items={contentData.metrics}
          label={(metric) => `${metric.value} ${metric.label}`}
          type="metrics"
          onSelect={onSelect}
          onDelete={onDeleteContent}
          onAdd={onAddContent}
        />
      </div>
    </div>
  );
};

export default ContentList;

import type {
  ContentsData,
  MetricItem,
  PortofolioItem,
  SectionItem,
  ServiceItem,
} from "../../../../types/landing";
import Icon from "../../../../components/Icon";

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
  <div className="panel mb-5 overflow-hidden">
    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
      <span className="font-semibold">{title}</span>
      <button
        className="btn-primary px-3 py-1.5 text-xs"
        onClick={() => onAdd(type)}
      >
        <Icon
          name="plus"
          className="size-3.5"
        />
        Add
      </button>
    </div>

    {/* column headings (desktop) */}
    <div className="hidden grid-cols-[1fr_96px_84px] gap-3 border-b border-line bg-app px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-mute md:grid">
      <span>Name</span>
      <span>Status</span>
      <span className="text-right">Actions</span>
    </div>

    {items.length === 0 && (
      <p className="px-4 py-4 text-sm text-mute">Nothing here yet.</p>
    )}

    {items.map((item) => (
      <div
        className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 hover:bg-app/60 md:grid-cols-[1fr_96px_84px]"
        key={item.id}
      >
        <button
          className="min-w-0 truncate text-left text-sm font-medium text-ink transition-colors hover:text-primary"
          onClick={() => onSelect(item, type)}
        >
          {label(item)}
        </button>

        <span className="hidden md:block">
          <span className={item.is_active ? "badge badge-live" : "badge badge-draft"}>
            {item.is_active ? "Published" : "Draft"}
          </span>
        </span>

        <div className="flex items-center justify-end gap-1">
          <button
            className="btn-quiet px-2 py-1.5 text-xs font-semibold text-primary hover:bg-primary-soft hover:text-primary-deep"
            onClick={() => onSelect(item, type)}
          >
            Edit
          </button>
          <button
            aria-label={`Delete ${label(item)}`}
            className="btn-quiet px-2 py-1.5 text-mute hover:bg-red-50 hover:text-red-600"
            onClick={() => {
              if (confirm("Delete this item?")) {
                onDelete(type, item.id);
              }
            }}
          >
            <Icon
              name="trash"
              className="size-4"
            />
          </button>
        </div>
      </div>
    ))}
  </div>
);

const ContentList = ({
  contentData,
  onSelect,
  onDeleteContent,
  onAddContent,
}: ContentListProps) => {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold tracking-[-0.01em]">Content</h2>
        <p className="mt-1 text-sm text-mute">
          Services, portfolio projects and metrics shown on your site.
        </p>
      </div>

      <ContentGroup<ServiceItem>
        title="Services"
        items={contentData.services}
        label={(service) => service.title}
        type="services"
        onSelect={onSelect}
        onDelete={onDeleteContent}
        onAdd={onAddContent}
      />

      <ContentGroup<PortofolioItem>
        title="Portfolios"
        items={contentData.portofolios}
        label={(portofolio) => portofolio.title}
        type="portofolios"
        onSelect={onSelect}
        onDelete={onDeleteContent}
        onAdd={onAddContent}
      />

      <ContentGroup<MetricItem>
        title="Metrics"
        items={contentData.metrics}
        label={(metric) => `${metric.value} ${metric.label}`}
        type="metrics"
        onSelect={onSelect}
        onDelete={onDeleteContent}
        onAdd={onAddContent}
      />
    </div>
  );
};

export default ContentList;

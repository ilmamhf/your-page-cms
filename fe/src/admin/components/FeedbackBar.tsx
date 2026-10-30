import Icon from "../../components/Icon";

interface FeedbackBarProps {
  type: "success" | "error";
  message: string;
}

/** Inline banner for save/delete/upload results. */
const FeedbackBar = ({ type, message }: FeedbackBarProps) => {
  const isSuccess = type === "success";
  const styles = isSuccess
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-red-200 bg-red-50 text-red-700";

  return (
    <div
      role="status"
      className={`mb-3 flex items-start gap-2.5 rounded-lg border px-3 py-2 text-sm ${styles}`}
    >
      <Icon
        name={isSuccess ? "check" : "alert"}
        className="mt-0.5 size-4 shrink-0"
      />
      <span>{message}</span>
    </div>
  );
};

export default FeedbackBar;

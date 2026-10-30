interface FeedbackBarProps {
  type: "success" | "error";
  message: string;
}

/** Small inline banner for save/delete/upload results. */
const FeedbackBar = ({ type, message }: FeedbackBarProps) => {
  const styles =
    type === "success"
      ? "border-green-400 bg-green-50 text-green-700"
      : "border-red-400 bg-red-50 text-red-700";

  return (
    <div className={`border p-2 mb-2 text-sm ${styles}`}>
      {message}
    </div>
  );
};

export default FeedbackBar;

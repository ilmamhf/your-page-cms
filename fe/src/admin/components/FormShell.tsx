import type { ReactNode } from "react";
import FeedbackBar from "./FeedbackBar";

export type FormFeedback = {
  type: "success" | "error";
  message: string;
} | null;

interface FormShellProps {
  title: string;
  subtitle?: string;
  feedback?: FormFeedback;
  children: ReactNode;
  onSave: () => void;
  /** Clears the selection; shown as the "Cancel" button. */
  onCancel?: () => void;
  saving: boolean;
  saveLabel?: string;
}

/** Shared chrome for every CMS edit form: header, feedback, body, action bar. */
const FormShell = ({
  title,
  subtitle,
  feedback,
  children,
  onSave,
  onCancel,
  saving,
  saveLabel = "Save changes",
}: FormShellProps) => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-white">
      <div className="border-b border-line px-6 py-4 md:px-8">
        <h2 className="text-lg font-bold tracking-[-0.01em]">{title}</h2>
        {subtitle && <p className="mt-0.5 truncate text-sm text-mute">{subtitle}</p>}
      </div>

      <div className="flex-1 px-6 py-5 md:px-8">
        {feedback && (
          <FeedbackBar
            type={feedback.type}
            message={feedback.message}
          />
        )}
        {children}
      </div>

      <div className="sticky bottom-0 flex justify-end gap-3 border-t border-line bg-white/90 px-6 py-3 backdrop-blur md:px-8">
        {onCancel && (
          <button
            type="button"
            className="btn-outline px-4 py-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          className="btn-primary px-4 py-2"
          disabled={saving}
          onClick={onSave}
        >
          {saving ? "Saving…" : saveLabel}
        </button>
      </div>
    </div>
  );
};

/** Friendly empty state shown before anything is selected. */
export const FormPlaceholder = ({
  title,
  hint,
}: {
  title: string;
  hint: string;
}) => (
  <div className="grid h-full w-full place-content-center gap-1.5 px-8 text-center">
    <p className="text-lg font-semibold text-ink">{title}</p>
    <p className="text-sm text-mute">{hint}</p>
  </div>
);

export default FormShell;

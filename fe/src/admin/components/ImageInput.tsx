import { useRef, useState } from "react";
import { uploadImage } from "../../api/upload";
import { errorMessage } from "../../api/error";
import { resolveImageUrl } from "../../utils/image";
import Icon from "../../components/Icon";

interface ImageInputProps {
  label: string;
  /** Current image URL (empty string when there is none). */
  value: string;
  onChange: (url: string) => void;
  /** Optional square preview for icons; larger preview for banners/photos. */
  previewSize?: number;
}

/**
 * File picker that uploads on select and stores the returned URL via onChange.
 */
const ImageInput = ({ label, value, onChange, previewSize = 64 }: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(errorMessage(err, "Upload failed."));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col py-1.5">
      {label && <span className="label">{label}</span>}

      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={resolveImageUrl(value)}
            alt={label}
            style={{ width: previewSize, height: previewSize }}
            className="shrink-0 rounded-lg border border-line bg-cloud object-cover"
          />
        ) : (
          <div
            style={{ width: previewSize, height: previewSize }}
            className="grid shrink-0 place-content-center rounded-lg border border-dashed border-line bg-cloud text-mute-soft"
          >
            <Icon
              name="image"
              className="size-4"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            className="btn-outline px-3 py-1.5 text-xs"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            <Icon
              name={uploading ? "spinner" : "upload"}
              className={`size-3.5 ${uploading ? "animate-spin" : ""}`}
            />
            {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
          </button>

          {value && (
            <button
              type="button"
              className="btn-quiet px-3 py-1.5 text-xs text-red-600 hover:text-red-700"
              onClick={() => {
                if (window.confirm("Remove this image?")) {
                  onChange("");
                }
              }}
            >
              <Icon
                name="trash"
                className="size-3.5"
              />
              Remove
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && (
        <p className="py-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ImageInput;

import { useRef, useState } from "react";
import { uploadImage } from "../../api/upload";
import { errorMessage } from "../../api/error";

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
    <div className="flex flex-col py-2">
      <div className="py-2">{label}</div>

      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={value}
            alt={label}
            style={{ width: previewSize, height: previewSize }}
            className="border object-cover shrink-0"
          />
        ) : (
          <div
            style={{ width: previewSize, height: previewSize }}
            className="border place-content-center text-center text-xs text-gray-400 shrink-0"
          >
            No image
          </div>
        )}

        <div className="flex flex-col gap-1">
          <button
            type="button"
            className="border px-3 py-1 text-sm disabled:opacity-50"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
          </button>

          {value && (
            <button
              type="button"
              className="border px-3 py-1 text-sm text-red-600"
              onClick={() => onChange("")}
            >
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

      {error && <div className="text-sm text-red-600 py-1">{error}</div>}
    </div>
  );
};

export default ImageInput;

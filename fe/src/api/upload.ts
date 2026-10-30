import api from "./axios";

/**
 * Uploads an image to the CMS and resolves with its public URL.
 * Requires a running backend with `php artisan storage:link` done once.
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data.url as string;
};

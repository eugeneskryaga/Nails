const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

type ResourceType = "image" | "video";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  bytes: number;
}

export async function uploadToCloudinary(
  file: File,
  resourceType: ResourceType,
): Promise<CloudinaryUploadResult> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Не настроены переменные Cloudinary.");
  }

  const isImage = resourceType === "image";
  const allowedTypes = isImage
    ? ["image/jpeg", "image/png", "image/webp"]
    : ["video/mp4", "video/webm", "video/quicktime"];

  const maxSize = isImage ? 5 : 100;
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Неподдерживаемый формат файла.");
  }

  if (file.size > maxSize * 1024 * 1024) {
    throw new Error(`Максимальный размер файла — ${maxSize} МБ.`);
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message ?? "Ошибка загрузки файла.");
  }

  return result as CloudinaryUploadResult;
}

import imageCompression from "browser-image-compression";

const MAX_SIZE_MB = 1;
const MAX_WIDTH_OR_HEIGHT = 1800;

export const compressImage = async (file: File): Promise<File> => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Выбранный файл не является изображением.");
  }

  const compressed = await imageCompression(file, {
    maxSizeMB: MAX_SIZE_MB,
    maxWidthOrHeight: MAX_WIDTH_OR_HEIGHT,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.88,
  });

  return new File([compressed], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
};

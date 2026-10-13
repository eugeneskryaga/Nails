import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { app } from "../firebase/config";
import { uploadToCloudinary } from "../services/claudinaryService";

import type {
  CreateGalleryPostInput,
  GalleryPhoto,
  GalleryPost,
  GalleryVideo,
  UpdateGalleryPostInput,
} from "../types/gallery";

const db = getFirestore(app);
const POSTS_COLLECTION = "galleryPosts";

// Проверка входных данных перед загрузкой
function validatePostInput(input: CreateGalleryPostInput): void {
  const title = input.title.trim();

  if (!title) {
    throw new Error("Укажи название работы.");
  }

  if (title.length > 120) {
    throw new Error("Название не должно превышать 120 символов.");
  }

  if (!input.video) {
    throw new Error("Выбери видео.");
  }

  if (!input.photos || input.photos.length !== 2) {
    throw new Error("Для работы необходимо выбрать две фотографии.");
  }

  if (input.photos.some(photo => !photo)) {
    throw new Error("Выбери обе фотографии.");
  }
}

// Загрузка видео в Cloudinary
async function uploadVideo(file: File): Promise<GalleryVideo> {
  const result = await uploadToCloudinary(file, "video");

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

// Загрузка фотографии в Cloudinary
async function uploadPhoto(file: File, alt: string): Promise<GalleryPhoto> {
  const result = await uploadToCloudinary(file, "image");

  return {
    url: result.secure_url,
    publicId: result.public_id,
    alt,
  };
}

// Получить все работы, включая черновики
export async function getAllGalleryPosts(): Promise<GalleryPost[]> {
  const postsQuery = query(
    collection(db, POSTS_COLLECTION),
    orderBy("order", "asc"),
  );

  const snapshot = await getDocs(postsQuery);

  return snapshot.docs.map(
    postDoc =>
      ({
        id: postDoc.id,
        ...postDoc.data(),
      }) as GalleryPost,
  );
}

// Получить только опубликованные работы для публичной галереи
export async function getPublishedGalleryPosts(): Promise<GalleryPost[]> {
  const postsQuery = query(
    collection(db, POSTS_COLLECTION),
    where("status", "==", "published"),
    orderBy("order", "asc"),
  );

  const snapshot = await getDocs(postsQuery);

  return snapshot.docs.map(
    postDoc =>
      ({
        id: postDoc.id,
        ...postDoc.data(),
      }) as GalleryPost,
  );
}

// Создать новую работу
export async function createGalleryPost(
  input: CreateGalleryPostInput,
): Promise<string> {
  validatePostInput(input);

  const title = input.title.trim();

  // Сначала создаём ссылку на документ, чтобы использовать его ID
  const postRef = doc(collection(db, POSTS_COLLECTION));

  // Загружаем видео и обе фотографии параллельно
  const [video, photo1, photo2] = await Promise.all([
    uploadVideo(input.video),
    uploadPhoto(input.photos[0], title),
    uploadPhoto(input.photos[1], title),
  ]);

  const now = Date.now();

  const postData = {
    title,
    video,
    photos: [photo1, photo2],
    status: input.status ?? "draft",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    order: now,
  };

  await setDoc(postRef, postData);

  return postRef.id;
}

// Обновить существующую работу
export async function updateGalleryPost(
  id: string,
  input: UpdateGalleryPostInput,
): Promise<void> {
  if (!id.trim()) {
    throw new Error("Не указан ID работы.");
  }

  const postRef = doc(db, POSTS_COLLECTION, id);

  const updates: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (input.title !== undefined) {
    const title = input.title.trim();

    if (!title) {
      throw new Error("Название работы не может быть пустым.");
    }

    if (title.length > 120) {
      throw new Error("Название не должно превышать 120 символов.");
    }

    updates.title = title;
  }

  if (input.status !== undefined) {
    updates.status = input.status;
  }

  if (input.order !== undefined) {
    if (!Number.isFinite(input.order)) {
      throw new Error("Порядок отображения должен быть числом.");
    }

    updates.order = input.order;
  }

  // При замене видео загружаем только новый файл
  if (input.video) {
    updates.video = await uploadVideo(input.video);
  }

  // При замене фотографий сохраняем неизменённую фотографию
  // и заменяем только выбранные файлы.
  if (input.photos) {
    const snapshot = await getDocs(
      query(collection(db, POSTS_COLLECTION), where("__name__", "==", id)),
    );

    if (snapshot.empty) {
      throw new Error("Работа не найдена.");
    }

    const currentPost = snapshot.docs[0].data() as Omit<GalleryPost, "id">;

    const currentPhotos = currentPost.photos;

    if (!Array.isArray(currentPhotos) || currentPhotos.length !== 2) {
      throw new Error("У работы некорректные данные фотографий.");
    }

    const title = input.title?.trim() || currentPost.title;

    const nextPhotos: [GalleryPhoto, GalleryPhoto] = [
      currentPhotos[0],
      currentPhotos[1],
    ];

    const photoUpdates = await Promise.all(
      ([0, 1] as const).map(async index => {
        const file = input.photos?.[index];

        if (!file) {
          return null;
        }

        return {
          index,
          photo: await uploadPhoto(file, title),
        };
      }),
    );

    for (const result of photoUpdates) {
      if (result) {
        nextPhotos[result.index] = result.photo;
      }
    }

    updates.photos = nextPhotos;
  }

  await updateDoc(postRef, updates);
}

// Удалить работу из Firestore
// Медиафайлы Cloudinary автоматически не удаляются.
export async function deleteGalleryPost(id: string): Promise<void> {
  if (!id.trim()) {
    throw new Error("Не указан ID работы.");
  }

  const postRef = doc(db, POSTS_COLLECTION, id);

  await deleteDoc(postRef);
}

// Совместимость со старым кодом.
// Теперь переданный аргумент должен быть URL Cloudinary,
// а не путь Firebase Storage.
export function getMediaUrl(url: string): string {
  return url;
}

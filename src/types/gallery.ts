import type { Timestamp } from "firebase/firestore";

export interface GalleryPhoto {
  url: string;
  publicId: string;
  alt: string;
}

export interface GalleryVideo {
  url: string;
  publicId: string;
}

export interface GalleryPost {
  id: string;
  title: string;
  video: GalleryVideo;
  photos: [GalleryPhoto, GalleryPhoto];
  status: "draft" | "published";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  order: number;
}

export interface CreateGalleryPostInput {
  title: string;
  video: File;
  photos: [File, File];
  status?: "draft" | "published";
}

export interface UpdateGalleryPostInput {
  title?: string;
  video?: File;
  photos?: Partial<Record<0 | 1, File>>;
  status?: "draft" | "published";
  order?: number;
}

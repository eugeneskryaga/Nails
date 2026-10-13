import { useEffect, useState, type FormEvent } from "react";

import {
  createGalleryPost,
  deleteGalleryPost,
  getAllGalleryPosts,
  updateGalleryPost,
} from "../../../services/galleryService";

import type { GalleryPost } from "../../../types/gallery";

import css from "./GalleryAdmin.module.css";
import { Button } from "../../../components/Button/Button";

export const GalleryAdmin = () => {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [editingPost, setEditingPost] = useState<GalleryPost | null>(null);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");

  const [video, setVideo] = useState<File | null>(null);
  const [photo1, setPhoto1] = useState<File | null>(null);
  const [photo2, setPhoto2] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function refreshPosts() {
    setLoading(true);

    try {
      setPosts(await getAllGalleryPosts());
    } catch (error) {
      console.error(error);
      setMessage("Не удалось загрузить список работ.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshPosts();
  }, []);

  function resetForm() {
    setEditingPost(null);
    setTitle("");
    setStatus("published");
    setVideo(null);
    setPhoto1(null);
    setPhoto2(null);
  }

  function startEditing(post: GalleryPost) {
    setEditingPost(post);
    setTitle(post.title);
    setStatus(post.status);
    setVideo(null);
    setPhoto1(null);
    setPhoto2(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("Укажи название работы.");
      return;
    }

    if (!editingPost && (!video || !photo1 || !photo2)) {
      setMessage("Для новой работы нужны видео и две фотографии.");
      return;
    }

    setSaving(true);

    try {
      if (editingPost) {
        await updateGalleryPost(editingPost.id, {
          title,
          status,
          ...(video ? { video } : {}),
          photos: {
            ...(photo1 ? { 0: photo1 } : {}),
            ...(photo2 ? { 1: photo2 } : {}),
          },
        });

        setMessage("Работа обновлена.");
      } else {
        await createGalleryPost({
          title,
          video: video!,
          photos: [photo1!, photo2!],
          status,
        });

        setMessage("Работа создана.");
      }

      resetForm();
      await refreshPosts();
    } catch (error) {
      console.error(error);
      setMessage(
        error instanceof Error ? error.message : "Не удалось сохранить работу.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(post: GalleryPost) {
    const confirmed = window.confirm(
      `Удалить работу «${post.title}» вместе с файлами?`,
    );

    if (!confirmed) return;

    setMessage("");

    try {
      await deleteGalleryPost(post.id);

      if (editingPost?.id === post.id) {
        resetForm();
      }

      setMessage("Работа удалена.");
      await refreshPosts();
    } catch (error) {
      console.error(error);
      setMessage(
        "Не удалось полностью удалить работу. Проверь Storage и попробуй снова.",
      );
    }
  }

  return (
    <section className={css.adminGallery}>
      <h1>Управление галереей</h1>

      <form
        className={css.form}
        onSubmit={handleSubmit}
      >
        <h2>{editingPost ? "Редактировать работу" : "Добавить работу"}</h2>

        <label>
          Название работы
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            maxLength={120}
            required
          />
        </label>

        <label>
          Вертикальное видео {editingPost && "(необязательно)"}
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            required={!editingPost}
            onChange={event => setVideo(event.target.files?.[0] ?? null)}
          />
        </label>

        <label>
          Первая фотография {editingPost && "(необязательно)"}
          <input
            type="file"
            accept="image/*"
            required={!editingPost}
            onChange={event => setPhoto1(event.target.files?.[0] ?? null)}
          />
        </label>

        <label>
          Вторая фотография {editingPost && "(необязательно)"}
          <input
            type="file"
            accept="image/*"
            required={!editingPost}
            onChange={event => setPhoto2(event.target.files?.[0] ?? null)}
          />
        </label>

        <label>
          Статус публикации
          <select
            value={status}
            onChange={event =>
              setStatus(event.target.value as "draft" | "published")
            }
          >
            <option value="draft">Черновик</option>
            <option value="published">Опубликовано</option>
          </select>
        </label>

        {message && <p role="status">{message}</p>}

        <div className={css.actions}>
          <Button
            type="submit"
            styles="secondary"
            disabled={saving}
          >
            {saving
              ? "Сохранение..."
              : editingPost
                ? "Сохранить изменения"
                : "Создать публикацию"}
          </Button>

          {editingPost && (
            <Button
              type="button"
              styles="secondary"
              onClick={resetForm}
            >
              Отмена
            </Button>
          )}
        </div>
      </form>

      <h2>Все работы</h2>

      {loading && <p>Загрузка...</p>}

      {!loading && posts.length === 0 && <p>Публикаций пока нет.</p>}

      <div className={css.posts}>
        {posts.map(post => (
          <article
            className={css.post}
            key={post.id}
          >
            <div>
              <h3>{post.title}</h3>
              <p>
                Статус:{" "}
                {post.status === "published" ? "Опубликовано" : "Черновик"}
              </p>
            </div>

            <div className={css.actions}>
              <Button
                type="button"
                styles="secondary"
                onClick={() => startEditing(post)}
              >
                Редактировать
              </Button>

              <Button
                type="button"
                styles="secondary"
                onClick={() => void handleDelete(post)}
              >
                Удалить
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

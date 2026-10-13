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
      setMessage("Unable loading portfolio.");
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
      setMessage("Enter work title.");
      return;
    }

    if (!editingPost && (!video || !photo1 || !photo2)) {
      setMessage("You need a video and 2 photos for a new post.");
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

        setMessage("Post updated.");
      } else {
        await createGalleryPost({
          title,
          video: video!,
          photos: [photo1!, photo2!],
          status,
        });

        setMessage("Post created");
      }

      resetForm();
      await refreshPosts();
    } catch (error) {
      console.error(error);
      setMessage(
        error instanceof Error ? error.message : "Unable saving post.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(post: GalleryPost) {
    const confirmed = window.confirm(
      `Remove post «${post.title}» with all files?`,
    );

    if (!confirmed) return;

    setMessage("");

    try {
      await deleteGalleryPost(post.id);

      if (editingPost?.id === post.id) {
        resetForm();
      }

      setMessage("Post removed.");
      await refreshPosts();
    } catch (error) {
      console.error(error);
      setMessage("Unable removing post. Check Storage and try again.");
    }
  }

  return (
    <section className={css.adminGallery}>
      <h1>Gallery management</h1>

      <form
        className={css.form}
        onSubmit={handleSubmit}
      >
        <h2>{editingPost ? "Edit post" : "Add post"}</h2>

        <label>
          Post title
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            maxLength={120}
            required
          />
        </label>

        <label>
          Vertical video {editingPost && "(optional)"}
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            required={!editingPost}
            onChange={event => setVideo(event.target.files?.[0] ?? null)}
          />
        </label>

        <label>
          First photo {editingPost && "(optional)"}
          <input
            type="file"
            accept="image/*"
            required={!editingPost}
            onChange={event => setPhoto1(event.target.files?.[0] ?? null)}
          />
        </label>

        <label>
          Second photo {editingPost && "(optional)"}
          <input
            type="file"
            accept="image/*"
            required={!editingPost}
            onChange={event => setPhoto2(event.target.files?.[0] ?? null)}
          />
        </label>

        <label>
          Post status
          <select
            value={status}
            onChange={event =>
              setStatus(event.target.value as "draft" | "published")
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
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
              ? "Saving..."
              : editingPost
                ? "Save changes"
                : "Create post"}
          </Button>

          {editingPost && (
            <Button
              type="button"
              styles="secondary"
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <h2>All posts</h2>

      {loading && <p>Loading...</p>}

      {!loading && posts.length === 0 && <p>There is no posts yet.</p>}

      <div className={css.posts}>
        {posts.map(post => (
          <article
            className={css.post}
            key={post.id}
          >
            <div>
              <h3>{post.title}</h3>
              <p>
                Status: {post.status === "published" ? "Published" : "Draft"}
              </p>
            </div>

            <div className={css.actions}>
              <Button
                type="button"
                styles="secondary"
                onClick={() => startEditing(post)}
              >
                Edit
              </Button>

              <Button
                type="button"
                styles="secondary"
                onClick={() => void handleDelete(post)}
              >
                Remove
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

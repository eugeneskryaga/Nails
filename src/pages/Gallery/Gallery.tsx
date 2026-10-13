// import { Container } from "../../components/Container/Container";
// import { Heading } from "../../components/Heading/Heading";

// import firstVideo from "../../assets/Gallery/video_1.mp4";
// import secondVideo from "../../assets/Gallery/video_2.mp4";
// import firstPhoto from "../../assets/Gallery/img_1.jpg";
// import secondPhoto from "../../assets/Gallery/img_2.jpg";
// import thirdPhoto from "../../assets/Gallery/img_3.jpg";
// import fourthPhoto from "../../assets/Gallery/img_4.jpg";

// import css from "./Gallery.module.css";

// export const Gallery = () => {
//   const heading = {
//     span: "PORTFOLIO",
//     title: "Work Gallery",
//     slogan:
//       "Every set is crafted with attention to detail and a personalized approach.",
//   };

//   return (
//     <section className={css.gallery}>
//       <Container>
//         <Heading {...heading} />
//         <div className={css.gallery_block}>
//           <div className={css.video_wrapper}>
//             <video
//               src={firstVideo}
//               autoPlay
//               muted
//               loop
//               playsInline
//             />
//           </div>
//           <div className={css.img_wrapper}>
//             <img
//               src={firstPhoto}
//               alt="Nails Photo"
//             />
//             <img
//               src={secondPhoto}
//               alt="Nails Photo"
//             />
//           </div>
//         </div>
//         <div className={css.gallery_block}>
//           <div className={css.img_wrapper}>
//             <img
//               src={thirdPhoto}
//               alt="Nails Photo"
//             />
//             <img
//               src={fourthPhoto}
//               alt="Nails Photo"
//             />
//           </div>
//           <div className={css.video_wrapper}>
//             <video
//               src={secondVideo}
//               autoPlay
//               muted
//               loop
//               playsInline
//             />
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

import { useEffect, useState } from "react";

import { Container } from "../../components/Container/Container";
import { Heading } from "../../components/Heading/Heading";

import { getPublishedGalleryPosts } from "../../services/galleryService";
import type { GalleryPost } from "../../types/gallery";

import css from "./Gallery.module.css";

export const Gallery = () => {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heading = {
    span: "PORTFOLIO",
    title: "Work Gallery",
    slogan:
      "Every set is crafted with attention to detail and a personalized approach.",
  };

  useEffect(() => {
    let isMounted = true;

    const loadGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        const publishedPosts = await getPublishedGalleryPosts();

        if (isMounted) {
          setPosts(publishedPosts);
        }
      } catch (err) {
        console.error("Failed to load gallery:", err);

        if (isMounted) {
          setError("Unable to load the gallery. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={css.gallery}>
      <Container>
        <Heading {...heading} />

        {loading && (
          <p
            className={css.message}
            role="status"
          >
            Loading gallery...
          </p>
        )}

        {!loading && error && (
          <p
            className={css.message}
            role="alert"
          >
            {error}
          </p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className={css.message}>
            The gallery is being updated. Please check back soon.
          </p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className={css.gallery_list}>
            {posts.map((post, index) => (
              <article
                className={css.gallery_block}
                key={post.id}
              >
                <div
                  className={index % 2 === 0 ? css.media_left : css.media_right}
                >
                  <div className={css.video_wrapper}>
                    <video
                      src={post.video.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      controls={false}
                      aria-label={`${post.title} video`}
                    />
                  </div>
                </div>

                <div className={css.img_wrapper}>
                  {post.photos.map((photo, photoIndex) => (
                    <img
                      key={`${post.id}-${photo.publicId || photoIndex}`}
                      src={photo.url}
                      alt={photo.alt || post.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

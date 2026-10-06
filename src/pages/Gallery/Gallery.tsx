import { Container } from "../../components/Container/Container";
import { Heading } from "../../components/Heading/Heading";

import firstVideo from "../../assets/Gallery/video_1.mp4";
import secondVideo from "../../assets/Gallery/video_2.mp4";
import firstPhoto from "../../assets/Gallery/img_1.jpg";
import secondPhoto from "../../assets/Gallery/img_2.jpg";
import thirdPhoto from "../../assets/Gallery/img_3.jpg";
import fourthPhoto from "../../assets/Gallery/img_4.jpg";

import css from "./Gallery.module.css";

export const Gallery = () => {
  const heading = {
    span: "PORTFOLIO",
    title: "Work Gallery",
    slogan:
      "Every set is crafted with attention to detail and a personalized approach.",
  };

  return (
    <section className={css.gallery}>
      <Container>
        <Heading {...heading} />
        <div className={css.gallery_block}>
          <div className={css.video_wrapper}>
            <video
              src={firstVideo}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div className={css.img_wrapper}>
            <img
              src={firstPhoto}
              alt="Nails Photo"
            />
            <img
              src={secondPhoto}
              alt="Nails Photo"
            />
          </div>
        </div>
        <div className={css.gallery_block}>
          <div className={css.img_wrapper}>
            <img
              src={thirdPhoto}
              alt="Nails Photo"
            />
            <img
              src={fourthPhoto}
              alt="Nails Photo"
            />
          </div>
          <div className={css.video_wrapper}>
            <video
              src={secondVideo}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

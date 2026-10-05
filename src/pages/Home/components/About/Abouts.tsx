import { FaHeart, FaLeaf, FaStar } from "react-icons/fa";
import { Container } from "../../../../components/Container/Container";
import css from "./About.module.css";

export const About = () => {
  return (
    <section className={css.about}>
      <Container>
        <h2>About me</h2>
        <p>
          I believe beautiful nails are about more than just appearance — they
          are about how you feel. My studio is a place of calm and comfort,
          where I use hypoallergenic products and sterilized tools. Every
          appointment is a little ritual of self-care, created to help you slow
          down and enjoy the moment.
        </p>
        <ul className={css.about_list}>
          <li>
            <FaLeaf size={40} />
            <p>Natural</p>
            <p>Hypoallergenic products and nourishing care.</p>
          </li>
          <li>
            <FaHeart size={40} />
            <p>With Care</p>
            <p>Thoughtful attention to every detail.</p>
          </li>
          <li>
            <FaStar size={40} />
            <p>Flawless</p>
            <p>Strictly sterilized tools.</p>
          </li>
        </ul>
      </Container>
    </section>
  );
};

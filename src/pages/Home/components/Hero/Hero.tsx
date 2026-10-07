import { Container } from "../../../../components/Container/Container";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Button } from "../../../../components/Button/Button";
import { Link } from "react-router-dom";

import heroImage from "../../../../assets/hero.jpg";

import css from "./Hero.module.css";

export const Hero = () => {
  return (
    <section>
      <Container>
        <div className={css.hero}>
          <div className={css.article}>
            <span>
              <FaStar />
              NAIL STUDIO
            </span>
            <h1>Manicure that feels like care</h1>
            <p>
              A warm atmosphere, natural materials, and flawless results. Book a
              time that works for you — everything has already been thoughtfully
              taken care of.
            </p>
            <div className={css.buttons}>
              <Link to="/contacts">
                <Button
                  styles="primary"
                  className={css.arrow_btn}
                >
                  Book now <FaArrowRight size={14} />
                </Button>
              </Link>
              <Link to="/gallery">
                <Button styles="secondary">View portfolio</Button>
              </Link>
            </div>
          </div>
          <div className={css.image}>
            <img
              src={heroImage}
              alt="Logo"
            />
            <div className={css.exp}>
              <span>2+</span>
              <p>Years of experience</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

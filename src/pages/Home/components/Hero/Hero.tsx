import { Container } from "../../../../components/Container/Container";
import { FaArrowRight, FaStar } from "react-icons/fa";
import css from "./Hero.module.css";
import { Button } from "../../../../components/Button/Button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section>
      <Container>
        <div className={css.hero}>
          <div className={css.article}>
            <span>
              <FaStar />
              СТУДИЯ МАНИКЮРА
            </span>
            <h1>Маникюр, в котором чувствуется забота</h1>
            <p>
              Тёплая атмосфера, натуральные материалы и безупречный результатю
              Запишитесь на удобное время - всё уже продумано за вас.
            </p>
            <div className={css.buttons}>
              <Link to="/contacts">
                <Button
                  styles="primary"
                  className={css.arrow_btn}
                >
                  Записаться <FaArrowRight />
                </Button>
              </Link>
              <Link to="/gallery">
                <Button styles="secondary">Смотреть работы</Button>
              </Link>
            </div>
          </div>
          <div className={css.image}>
            <img
              src="/src/assets/Logo.png"
              alt="Logo"
              width={500}
              height={500}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

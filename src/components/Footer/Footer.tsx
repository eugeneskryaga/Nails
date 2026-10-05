import { Link } from "react-router-dom";
import { Container } from "../Container/Container";
import css from "./Footer.module.css";
import {
  FaInstagram,
  FaPhone,
  FaTelegram,
  FaTelegramPlane,
  FaViber,
} from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.wrapper}>
          <div>
            <img
              src="/src/assets/Logo.png"
              alt="Logo"
              width={70}
              height={70}
            />
            <p>Студия маникюра, где каждаю деталь продумана.</p>
            <p>Тёплая атмосфера и безупречный результат.</p>
          </div>
          <div>
            <strong>НАВИГАЦИЯ</strong>
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/gallery">Галерея</Link>
              </li>
              <li>
                <Link to="/contacts">Контакты</Link>
              </li>
            </ul>
          </div>
          <div>
            <address>
              <strong>СВЯЗЬ</strong>
              <a href="tel:+380995327811">
                <FaPhone
                  size={14}
                  className={css.icon}
                />
                +38 (099) 532-78-11
              </a>
              <div className={css.location}>
                <FaLocationPin
                  size={14}
                  className={css.icon}
                />
                Киев, ул. Примерная 12
              </div>
              <div className={css.social}>
                <a>
                  <FaInstagram size={40} />
                </a>
                <a>
                  <FaViber size={40} />
                </a>
                <a>
                  <FaTelegramPlane size={40} />
                </a>
              </div>
            </address>
          </div>
        </div>
        <a
          href="/"
          className={css.admin}
        >
          Вход для администратора
        </a>
      </Container>
    </footer>
  );
};

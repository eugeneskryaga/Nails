import { Link } from "react-router-dom";
import { Container } from "../Container/Container";
import css from "./Footer.module.css";
import {
  FaInstagram,
  FaPhone,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import logo from "../../assets/Logo.png";

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.slogan}>
            <img
              src={logo}
              alt="Logo"
              width={70}
              height={70}
            />
            <p>A nail studio where every detail is thoughtfully considered.</p>
            <p>A warm atmosphere and flawless results.</p>
          </div>
          <div>
            <strong>NAVIGATION</strong>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
            </ul>
          </div>
          <div>
            <address>
              <strong>CONTACTS</strong>
              <a href="tel:4916099112785">
                <FaPhone
                  size={14}
                  className={css.icon}
                />
                +4 916 099 112 785
              </a>
              <div className={css.location}>
                <FaLocationPin
                  size={14}
                  className={css.icon}
                />
                Wuppertal Gathe 70, 42107
              </div>
              <div className={css.social}>
                <a
                  href="https://www.instagram.com/nails_pro_deutschland?stkn=Z3ZxZ2s5bHZzcGlp"
                  target="_blank"
                >
                  <FaInstagram size={40} />
                </a>
                <a
                  href="https://wa.me/4916099112785"
                  target="_blank"
                >
                  <FaWhatsapp size={40} />
                </a>
                <a
                  href="https://t.me/NailsWuppertal"
                  target="_blank"
                >
                  <FaTelegramPlane size={40} />
                </a>
              </div>
            </address>
          </div>
        </div>
        <a
          href="/login"
          className={css.admin}
        >
          Admin login
        </a>
      </Container>
    </footer>
  );
};

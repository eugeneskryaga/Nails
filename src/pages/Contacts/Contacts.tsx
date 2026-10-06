import {
  FaInstagram,
  FaPhone,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { Container } from "../../components/Container/Container";
import css from "./Contacts.module.css";
import { FaLocationPin } from "react-icons/fa6";

export const Contacts = () => {
  return (
    <section className={css.contacts}>
      <Container>
        <div className={css.heading}>
          <span>GET IN TOUCH</span>
          <h1>Contacts</h1>
          <p>
            Choose the most convenient way to reach me — I’ll get back to you
            quickly and be happy to help.
          </p>
        </div>
        <div className={css.contacts_cards}>
          <a href="tel:4916099112785">
            <div className={css.card}>
              <FaPhone size={60} />
              <div>
                <span>PHONE</span>
                <p>+4 916 099 112 785</p>
                <p>Call to book an appointment</p>
              </div>
            </div>
          </a>
          <a
            href="https://www.instagram.com/nails_pro_deutschland?stkn=Z3ZxZ2s5bHZzcGlp"
            target="_blank"
          >
            <div className={css.card}>
              <FaInstagram size={60} />
              <div>
                <span>INSTAGRAM</span>
                <p>@nails_pro_deutschland</p>
                <p>Latest work and updates</p>
              </div>
            </div>
          </a>
          <a
            href="https://wa.me/4916099112785"
            target="_blank"
          >
            <div className={css.card}>
              <FaWhatsapp size={60} />
              <div>
                <span>WHATSAPP</span>
                <p>WhatsApp</p>
                <p>Send a message</p>
              </div>
            </div>
          </a>
          <a
            href="https://t.me/NailsWuppertal"
            target="_blank"
          >
            <div className={css.card}>
              <FaTelegramPlane size={60} />
              <div>
                <span>TELEGRAM</span>
                <p>@NailsWuppertal</p>
                <p>Quick contact and booking</p>
              </div>
            </div>
          </a>
        </div>
        <div className={css.location}>
          <p>
            <FaLocationPin size={14} />
            Wuppertal Gathe 70, 42107
          </p>
        </div>
      </Container>
    </section>
  );
};

import { FaArrowRight, FaClock } from "react-icons/fa";
import { Container } from "../../../../components/Container/Container";
import css from "./Prices.module.css";
import { Button } from "../../../../components/Button/Button";
import { Link } from "react-router-dom";

export const Prices = () => {
  return (
    <section className={css.prices}>
      <Container>
        <h2>Services & Pricing</h2>
        <p className={css.slogan}>Clear pricing and estimated service times.</p>
        <ul className={css.prices_list}>
          <li className={css.prices_list_item}>
            <div>
              <h3>Manicure + Gel Polish</h3>
              <p>Full manicure with long-lasting gel polish</p>
              <span>
                <FaClock size={14} /> 90 min
              </span>
            </div>
            <div>
              <strong>50 €</strong>
            </div>
          </li>
          <li className={css.prices_list_item}>
            <div>
              <h3>Classic Manicure</h3>
              <p>Gentle cuticle care and perfectly shaped nails</p>
              <span>
                <FaClock size={14} /> 30 min
              </span>
            </div>
            <div>
              <strong>40 ₴</strong>
            </div>
          </li>
          <li className={css.prices_list_item}>
            <div>
              <h3>Pedicure + Gel Polish</h3>
              <p>Complete pedicure with long-lasting gel polish</p>
              <span>
                <FaClock size={14} /> 90 min
              </span>
            </div>
            <div>
              <strong>60 ₴</strong>
            </div>
          </li>
          <li className={css.prices_list_item}>
            <div>
              <h3>Pedicure (Cleaning)</h3>
              <p>Gentle foot care, cuticle treatment, and nail shaping</p>
              <span>
                <FaClock size={14} /> 60 min
              </span>
            </div>
            <div>
              <strong>50 ₴</strong>
            </div>
          </li>
          <li className={css.prices_list_item}>
            <div>
              <h3>Gel Removal</h3>
              <p>Gentle removal of the previous gel polish</p>
              <span>
                <FaClock size={14} /> 20 min
              </span>
            </div>
            <div>
              <strong>15 ₴</strong>
            </div>
          </li>
          <li className={css.prices_list_item}>
            <div>
              <h3>Nail Extensions</h3>
              <p>Custom gel extensions, shaped to perfection</p>
              <span>
                <FaClock size={14} /> From 90 min
              </span>
            </div>
            <div>
              <strong>From 60 ₴</strong>
            </div>
          </li>
        </ul>
        <Link to="/contacts">
          <Button styles="primary">
            Book an appointment <FaArrowRight />
          </Button>
        </Link>
      </Container>
    </section>
  );
};

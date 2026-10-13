import { useEffect, useState } from "react";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Container } from "../../../../components/Container/Container";
import { Button } from "../../../../components/Button/Button";

import { getActiveServices } from "../../../../services/servicesService";
import type { Service } from "../../../../types/service";

import css from "./Prices.module.css";

export const Prices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadServices() {
      try {
        const data = await getActiveServices();

        if (!cancelled) {
          setServices(data);
        }
      } catch (err) {
        console.error("Failed to load services:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadServices();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={css.prices}>
      <Container>
        <h2>Services & Pricing</h2>

        <p className={css.slogan}>Clear pricing and estimated service times.</p>

        {loading && <p>Loading services...</p>}

        {error && (
          <p role="alert">Unable to load services. Please try again later.</p>
        )}

        {!loading && !error && services.length === 0 && (
          <p>No services available at the moment.</p>
        )}

        {!loading && !error && services.length > 0 && (
          <ul className={css.prices_list}>
            {services.map(service => (
              <li
                className={css.prices_list_item}
                key={service.id}
              >
                <div>
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <span>
                    <FaClock size={14} />
                    {service.durationPrefix ? `${service.durationPrefix} ` : ""}
                    {service.duration} min
                  </span>
                </div>

                <div>
                  <strong>
                    {service.pricePrefix ? `${service.pricePrefix} ` : ""}
                    {service.price} {service.currency}
                  </strong>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Link to="/contacts">
          <Button styles="primary">
            Book an appointment <FaArrowRight />
          </Button>
        </Link>
      </Container>
    </section>
  );
};

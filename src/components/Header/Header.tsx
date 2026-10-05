import { NavLink } from "react-router-dom";

import css from "./Header.module.css";
import { Container } from "../Container/Container";

export const Header = () => {
  return (
    <header className={css.header}>
      <Container>
        <nav className={css.nav}>
          <img
            src="/src/assets/Logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
          <ul className={css.nav_list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${css.active}` : `${css.link}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="gallery"
                className={({ isActive }) =>
                  isActive ? `${css.active}` : `${css.link}`
                }
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive ? `${css.active}` : `${css.link}`
                }
              >
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

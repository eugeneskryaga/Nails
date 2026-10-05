import { NavLink } from "react-router-dom";
import { Container } from "../Container/Container";

import logo from "../../assets/Logo.png";

import css from "./Header.module.css";

export const Header = () => {
  return (
    <header className={css.header}>
      <Container>
        <nav className={css.nav}>
          <img
            src={logo}
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

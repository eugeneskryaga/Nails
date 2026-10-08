import { NavLink } from "react-router-dom";
import { Container } from "../Container/Container";

import logo from "../../assets/Logo.png";

import css from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();
  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;

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
                to="/gallery"
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
            {isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? `${css.active}` : `${css.link}`
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

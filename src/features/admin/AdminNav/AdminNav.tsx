import { NavLink, useLocation } from "react-router-dom";
import { Container } from "../../../components/Container/Container";
import { Button } from "../../../components/Button/Button";
import {
  FaChartBar,
  FaHandshake,
  FaImages,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

import css from "./AdminNav.module.css";

export const AdminNav = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isStatsActive =
    location.pathname === "/admin" || location.pathname === "/admin/stats";

  return (
    <section className={css.admin_panel}>
      <Container>
        <nav className={css.nav}>
          <ul className={css.ul}>
            <li>
              <NavLink
                to="stats"
                className={isStatsActive ? css.active : css.link}
              >
                <FaChartBar size={16} /> Stats
              </NavLink>
            </li>

            <li>
              <NavLink
                to="gallery"
                className={({ isActive }) => (isActive ? css.active : css.link)}
              >
                <FaImages size={16} /> Gallery
              </NavLink>
            </li>

            <li>
              <NavLink
                to="services"
                className={({ isActive }) => (isActive ? css.active : css.link)}
              >
                <FaHandshake size={16} /> Services
              </NavLink>
            </li>
          </ul>

          <div className={css.admin}>
            <p>{user?.email}</p>

            <Button
              styles="secondary"
              onClick={logout}
            >
              <FaSignOutAlt size={16} /> Logout
            </Button>
          </div>
        </nav>
      </Container>
    </section>
  );
};

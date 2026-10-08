import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import { useAuth } from "../../context/AuthContext";

import css from "./Admin.module.css";

export const Admin = () => {
  const { logout } = useAuth();

  return (
    <section className={css.admin_panel}>
      <Container>
        <h1>Admin Panel</h1>
        <p>You are logged in.</p>
        <Button
          styles="primary"
          onClick={logout}
        >
          Logout
        </Button>
      </Container>
    </section>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { loginSchema, type LoginFormData } from "./login.schema";
import { Container } from "../../components/Container/Container";

import css from "./Login.module.css";
import { Heading } from "../../components/Heading/Heading";
import { Button } from "../../components/Button/Button";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const heading = {
    span: "Login",
    title: "Welcome back",
    slogan: "Log in admin account",
  };

  const handleIsVisible = () => {
    setIsVisible(prev => !prev);
  };

  const onSubmit = async (data: LoginFormData) => {
    setError("");

    try {
      await login(data.email, data.password);

      navigate("/admin");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <section className={css.login_section}>
      <Container>
        <Heading {...heading} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={css.form}
        >
          <div className={css.input_container}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="example@mail.com"
              {...register("email")}
            />
            <FaRegEnvelope size={16} />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={css.input_container}>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type={isVisible ? "text" : "password"}
              placeholder="**********"
              {...register("password")}
            />
            {isVisible ? (
              <FaEyeLowVision
                size={16}
                onClick={handleIsVisible}
              />
            ) : (
              <FaLock
                size={16}
                onClick={handleIsVisible}
              />
            )}
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className={`${css.error} ${css.login_error}`}>{error}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            styles="primary"
            className={css.btn}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Container>
    </section>
  );
};

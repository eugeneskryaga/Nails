import type { ButtonHTMLAttributes } from "react";
import css from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles: "primary" | "secondary";
  isLoading?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  styles = "secondary",
  isLoading = false,
  disabled,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${css.button} ${css[styles]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

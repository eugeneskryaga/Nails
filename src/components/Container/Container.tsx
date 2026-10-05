import type { ReactNode } from "react";
import css from "./Container.module.css";

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props) => {
  return <div className={css.container}>{children}</div>;
};

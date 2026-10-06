import css from "./Heading.module.css";

interface Props {
  span: string;
  title: string;
  slogan: string;
}

export const Heading = ({ span, title, slogan }: Props) => {
  return (
    <div className={css.heading}>
      <span>{span}</span>
      <h1>{title}</h1>
      <p>{slogan}</p>
    </div>
  );
};

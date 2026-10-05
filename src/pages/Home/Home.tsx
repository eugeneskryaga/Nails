import { About } from "./components/About/Abouts";
import { Hero } from "./components/Hero/Hero";
import { Prices } from "./components/Prices/Prices";

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Prices />
    </>
  );
};

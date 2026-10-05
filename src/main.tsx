import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "modern-normalize/modern-normalize.css";
import "@fontsource/cormorant-garamond";
import "@fontsource/plus-jakarta-sans";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

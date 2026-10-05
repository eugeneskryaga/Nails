import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home/Home";
import { Gallery } from "./pages/Gallery/Gallery";
import { Contacts } from "./pages/Contacts/Contacts";

export const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/gallery"
          element={<Gallery />}
        />
        <Route
          path="/contacts"
          element={<Contacts />}
        />
      </Route>
    </Routes>
  );
};

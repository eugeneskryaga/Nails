import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home/Home";
import { Gallery } from "./pages/Gallery/Gallery";
import { Contacts } from "./pages/Contacts/Contacts";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Admin } from "./pages/Admin/Admin";
import { Login } from "./pages/Login/Login";

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
        <Route
          path="/login"
          element={<Login />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<Admin />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

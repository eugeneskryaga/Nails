import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home/Home";
import { Gallery } from "./pages/Gallery/Gallery";
import { Contacts } from "./pages/Contacts/Contacts";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Login } from "./pages/Login/Login";
import { AdminLayout } from "./layouts/AdminLayout";
import { Stats } from "./pages/Admin/Stats/Stats";
import { AdminGallery } from "./pages/Admin/AdminGallery/AdminGallery";
import { Services } from "./pages/Admin/Services/Services";

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
            element={<AdminLayout />}
          >
            <Route
              index
              element={<Stats />}
            />
            <Route
              path="stats"
              element={<Stats />}
            />
            <Route
              path="gallery"
              element={<AdminGallery />}
            />
            <Route
              path="services"
              element={<Services />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

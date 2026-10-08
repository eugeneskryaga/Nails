import { Outlet } from "react-router-dom";
import { AdminNav } from "../features/admin/AdminNav/AdminNav";

export const AdminLayout = () => {
  return (
    <>
      <AdminNav />
      <section>
        <Outlet />
      </section>
    </>
  );
};

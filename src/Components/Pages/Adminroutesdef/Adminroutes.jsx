import { Routes, Route, Navigate } from "react-router-dom";
import SuperAdminRoutes from "../Admin/SuperAdminRoutes";
import CanteenAdminRoutes from "../Admin/CanteenAdminRoutes";
import MessAdminRoutes from "../Admin/MessAdminRoutes";

const AdminRoutes = ({ role }) => {
  if (role === "superadmin") {
    return <SuperAdminRoutes />;
  } else if (role === "canteenadmin") {
    return <CanteenAdminRoutes />;
  } else if (role === "messadmin") {
    return <MessAdminRoutes />;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import SuperAdminRoutes from "../Admin/SuperAdminRoutes";
import CanteenAdminRoutes from "../Admin/CanteenAdminRoutes";
import MessAdminRoutes from "../Admin/MessAdminRoutes";
import { useAuth } from "../../../context/AuthContext";


const AdminRoutes = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case "superadmin":
      return <SuperAdminRoutes />; 

    case "canteenadmin":
      return <CanteenAdminRoutes />;

    case "messadmin":
 
      return <MessAdminRoutes />;

    default:
   
      return <Navigate to="/loginhub" />;
  }
};

export default AdminRoutes;

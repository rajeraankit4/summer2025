// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../AdminLayouts/AdminLayout";

import Dashboard from "../../Dashboard";
import Students from "../../Student";
import MenuManagement from "../../MenuManagement";
import MessManagement from "../../MessManagment";
import CanteenManagement from "../../CanteenManagment";
import Billing from "../../Billing";
import Notices from "../../Notices";
import Settings from "../../Settings";
import StudentTransactions from "../../StudentTransactions";

const SuperAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> /admin
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="mess" element={<MessManagement />} />
        <Route path="canteen" element={<CanteenManagement />} />
        <Route path="student-transactions" element={<StudentTransactions />} />
        <Route path="billing" element={<Billing />} />
        <Route path="notices" element={<Notices />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default SuperAdmin;

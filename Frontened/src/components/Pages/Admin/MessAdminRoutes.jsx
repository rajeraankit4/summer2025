// src/components/Pages/Admin/MessAdminRoutes.jsx - CORRECTED

import { Routes, Route } from "react-router-dom";
import MessAdminLayout from "../../AdminLayouts/MessAdminLayout";
import ThemedMenuManagement from "../../../components/ThemedMenuManagement";
import Settings from "../../../components/Settings";
import StudentExpenses from "../../../components/StudentExpenses";
// Note: You no longer need to import Outlet here.

const MessAdminRoutes = () => {
  return (
    // The unnecessary Fragment and the misplaced Outlet have been removed.
    <Routes>
      <Route path="/" element={<MessAdminLayout />}>
        <Route index element={<ThemedMenuManagement />} />
        <Route path="menu" element={<ThemedMenuManagement />} />
        <Route path="expenses" element={<StudentExpenses />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default MessAdminRoutes;

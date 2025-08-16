import { Routes, Route } from "react-router-dom";
import CanteenAdminLayout from "../../AdminLayouts/CanteenAdminLayout";
import ThemedMenuManagement from "../../ThemedMenuManagement";
import Settings from "../../Settings";
import CanteenStudentExpenses from "../../CanteenStudentExpenses";

const CanteenAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CanteenAdminLayout />}>
        <Route index element={<ThemedMenuManagement />} />
        <Route path="menu" element={<ThemedMenuManagement />} />
        <Route path="expenses" element={<CanteenStudentExpenses />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default CanteenAdminRoutes;
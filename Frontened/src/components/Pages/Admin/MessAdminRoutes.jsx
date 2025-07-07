import { Routes, Route } from "react-router-dom";
import MessAdminLayout from "../../AdminLayouts/MessAdminLayout";
import ThemedMenuManagement from "../../ThemedMenuManagement";
import Settings from "../../Settings";

const MessAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MessAdminLayout />}>
        <Route index element={<ThemedMenuManagement />} />
        <Route path="menu" element={<ThemedMenuManagement />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default MessAdminRoutes;

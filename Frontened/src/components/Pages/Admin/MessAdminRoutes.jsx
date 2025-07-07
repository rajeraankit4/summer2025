import { Routes, Route } from "react-router-dom";
import MenuManagement from "../../MenuManagement";

const MessAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<MenuManagement />}>
        {/* <Route path="dashboard" element={<ContentDashboard />} />
        <Route path="manage" element={<ManageContent />} /> */}
      </Route>
    </Routes>
  );
};

export default MessAdmin;

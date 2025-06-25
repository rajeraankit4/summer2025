import { Routes, Route } from "react-router-dom";



const MessAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<>This is mess admin</>}>
        {/* <Route path="dashboard" element={<ContentDashboard />} />
        <Route path="manage" element={<ManageContent />} /> */}
      </Route>
    </Routes>
  );
};

export default MessAdmin;

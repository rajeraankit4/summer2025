// src/routes/AdminRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../AdminLayout';

import Dashboard from '../../Dashboard';
import Students from '../../Student';
import MessManagement from '../../MessManagment';
import CanteenManagement from '../../CanteenManagment';
import Billing from '../../Billing';
import Notices from '../../Notices';
import Settings from '../../Settings';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/mess" element={<MessManagement />} />
        <Route path="/canteen" element={<CanteenManagement />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

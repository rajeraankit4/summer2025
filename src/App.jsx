import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './components/NotFound';

import AdminRoutes from './components/Pages/AdminRoutes';

const App = () => {
  const isLoggedIn = true; // Hardcoded login check

  return (
    <Routes>
      <Route
        path="/admin"
        element={isLoggedIn ? <AdminRoutes /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

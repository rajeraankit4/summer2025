import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './components/NotFound';
import LandingPage from './components/Pages/LandingPage/Landingpage';
import AdminRoutes from './components/Pages/Admin/AdminRoutes';

const App = () => {
  const isLoggedIn = true; // Hardcoded login check

  return (
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      <Route
        path="/admin*"
        element={<AdminRoutes />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './Components/Pages/LandingPage/LandingPage';
import NotFound from './Components/NotFound';
import AdminRoutes from './Components/Pages/Adminroutesdef/Adminroutes';

const App = () => {
  const user = {
    isLoggedIn: true,          // 🔒 Set to false if not logged in
    role: "superadmin",        // Can be "superadmin", "canteenadmin", or "messadmin"
  };

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/*"
        element={
          user.isLoggedIn ? (
            <AdminRoutes role={user.role} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Fallback Route for 404s */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
import { Routes, Route } from "react-router-dom";
import LandingPage from './components/Pages/LandingPage/LandingPage';
// import NotFound from './components/Pages/NotFound/NotFound';
import AdminRoutes from './components/Pages/AdminRoutesDef/AdminRoutes';

const App = () => {
  const user = {
    isLoggedIn: true,
    role: "canteenadmin", // or "staffadmin", "contentadmin"
  };

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/admin" replace /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/admin/*"
        element={isLoggedIn ? <AdminRoutes /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

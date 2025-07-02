import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './Components/Pages/LandingPage/LandingPage';
import NotFound from './Components/NotFound';
import AdminRoutes from './Components/Pages/Adminroutesdef/Adminroutes';
import LoginPage from "./LoginPage";
import SignupFlow from "./components/Students/SignupFlow";

const App = () => {
  const user = {
    isLoggedIn: true,          // 🔒 Set to false if not logged in
    role: "superadmin",        // Can be "superadmin", "canteenadmin", or "messadmin"
  };

  return (
   <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/signup" element={<LoginPage mode="signup" />} />
  <Route path="/student-signup" element={<SignupFlow/>} />
  <Route
    path="/admin/*"
    element={
      user.isLoggedIn ? (
        <AdminRoutes role={user.role} />
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />
  <Route path="*" element={<NotFound />} />
</Routes>

  );
};

export default App;
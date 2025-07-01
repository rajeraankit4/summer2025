import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './Components/Pages/LandingPage/LandingPage';
import NotFound from './Components/NotFound';
import AdminRoutes from './Components/Pages/Adminroutesdef/Adminroutes';
import StudentRoutes from './components/Pages/Studentroutesdef/StudentRoutes';
import LoginPage from "./LoginPage";

const App = () => {
  const user = {
    isLoggedIn: true,          // 🔒 Set to false if not logged in
    role: "student",        // Can be "student", "superadmin", "canteenadmin", or "messadmin"
  };

  return (
   <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/signup" element={<LoginPage mode="signup" />} />
  <Route path="/login" element={<LoginPage mode="login" />} />
  <Route
    path="/student/*"
    element={
      user.isLoggedIn && user.role === "student" ? (
        <StudentRoutes />
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />
  <Route
    path="/admin/*"
    element={
      user.isLoggedIn && (user.role === "superadmin" || user.role === "canteenadmin" || user.role === "messadmin") ? (
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
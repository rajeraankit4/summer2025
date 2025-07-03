import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Components/Pages/LandingPage/LandingPage";
import NotFound from "./Components/NotFound";
import AdminRoutes from "./Components/Pages/Adminroutesdef/Adminroutes";
import StudentRoutes from "./Components/Pages/Studentroutesdef/StudentRoutes";
import LoginHub from "./Components/LoginHub";
import AdminLogin from "./Components/AdminLogin";
import AdminLoginForm from "./Components/AdminLoginForm";
import LoginPage from "./LoginPage";
import SignupFlow from "./Components/Students/SignupFlow";
import StudentLogin from "./Components/Students/StudentLogin";
import StudentSignup from "./Components/Students/StudentSignup";

const App = () => {
  const user = {
    isLoggedIn: true, // 🔒 Set to false if not logged in
    role: "superadmin", // Can be "student", "superadmin", "canteenadmin", or "messadmin"
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/loginhub" element={<LoginHub />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-login-form" element={<AdminLoginForm />} />
      <Route path="/login/:role" element={<LoginPage />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/signup" element={<LoginPage mode="signup" />} />
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route
        path="/student/*"
        element={
          user.isLoggedIn && user.role === "student" ? (
            <StudentRoutes />
          ) : (
            <Navigate to="/loginhub" replace />
          )
        }
      />
      <Route
        path="/admin/*"
        element={
          user.isLoggedIn &&
          (user.role === "superadmin" ||
            user.role === "canteenadmin" ||
            user.role === "messadmin") ? (
            <AdminRoutes role={user.role} />
          ) : (
            <Navigate to="/loginhub" replace />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

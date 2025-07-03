import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
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

const AppRoutes = () => {
  const { user, isLoggedIn } = useAuth();

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
          isLoggedIn && user?.role === "student" ? (
            <StudentRoutes />
          ) : (
            <Navigate to="/loginhub" replace />
          )
        }
      />
      <Route
        path="/admin/*"
        element={
          isLoggedIn &&
          (user?.role === "superadmin" ||
            user?.role === "canteenadmin" ||
            user?.role === "messadmin") ? (
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

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import LandingPage from './Components/Pages/LandingPage/LandingPage';
// import NotFound from './components/Pages/NotFound/NotFound';
import AdminRoutes from './Components/Pages/AdminRoutesDef/AdminRoutes';

const App = () => {
  const user = {
    isLoggedIn: true,
    role: "canteenadmin", // or "staffadmin", "contentadmin"
  };

  return (
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      {user.isLoggedIn && (
        <Route path="/admin/*" element={<AdminRoutes role={user.role} />} />
      )}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>

  );
};

export default App;

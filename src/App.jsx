// src/App.jsx
import React from "react";
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
      {/* Public Routes */}
      <Route path="/*" element={<LandingPage />} />

      {/* Admin Routes */}
      {user.isLoggedIn && (
        <Route path="/admin/*" element={<AdminRoutes role={user.role} />} />
      )}

      {/* 404 Not Found (optional) */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;

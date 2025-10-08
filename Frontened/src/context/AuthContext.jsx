import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Accepts (userData, token?) — stores a safe copy of user (password removed)
  const login = (userData, token) => {
    if (!userData) return;

    // Avoid persisting sensitive fields (like password/hash)
    const safeUser = { ...userData };
    if (safeUser.password) delete safeUser.password;

    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(safeUser));

    // If token provided (some login flows pass it), persist it as well
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Also remove token and other session keys to fully logout
    localStorage.removeItem("token");
    localStorage.removeItem("studentid");

    // Clear axios Authorization header if set
    try {
      if (axios && axios.defaults && axios.defaults.headers) {
        delete axios.defaults.headers.common["Authorization"];
      }
    } catch (err) {
      // ignore
    }
  };

  const isLoggedIn = !!user;

  const value = {
    user,
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

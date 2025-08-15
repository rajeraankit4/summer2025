import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosConfig"; // ✅ Use custom axios

const AdminLoginForm = () => {
  const [searchParams] = useSearchParams();
  const selectedRole = searchParams.get("role") || "superadmin";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: selectedRole,
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
  }, [selectedRole]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await axios.post("auth/login", formData);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      login(user);

      setSuccessMessage("Logged in successfully!");
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md w-full p-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl shadow-lg"
      >
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 mb-8">
          Admin Login
        </h2>

        <div className="text-center mb-4">
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            Logging in as:{" "}
            {formData.role === "superadmin"
              ? "Super Admin"
              : formData.role === "messadmin"
              ? "Mess Admin"
              : "Canteen Admin"}
          </span>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-5 py-4 rounded-xl border-2 border-orange-300"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-5 py-4 rounded-xl border-2 border-orange-300"
        />

        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold"
        >
          Log In
        </button>
      </form>

      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AdminLoginForm;

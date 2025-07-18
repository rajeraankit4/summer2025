import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosConfig";

const CanteenAdminPasswordVerifyPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user || !user.email) {
      setError("Session expired. Please start the login process again.");
      setTimeout(() => navigate('/admin/login?role=canteenadmin'), 2000);
      return;
    }

    try {
      const res = await axios.post("/canteen-staff/verify-password", {
        email: user.email,
        password,
      });

      if (res.data.success) {
        login(res.data.user);
        navigate("/admin", { replace: true });
      } else {
        setError("Incorrect password. Try again.");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Verification failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Enter Your Password
        </h2>
        <p className="text-center text-gray-600 mb-4">
          A password was sent to your email. Enter it below to continue.
        </p>

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-green-300 mb-4"
        />

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold"
        >
          Verify Password & Log In
        </button>
      </form>
    </div>
  );
};

export default CanteenAdminPasswordVerifyPage;

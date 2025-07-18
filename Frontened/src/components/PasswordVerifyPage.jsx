import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosConfig";

const PasswordVerifyPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // We need the login function to finalize authentication
  const { user, login } = useAuth();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);

    // This should not happen, but as a safeguard:
    if (!user || !user.email) {
      setError("Session expired. Please start the login process again.");
      setTimeout(() => navigate('/admin/login?role=messadmin'), 2000);
      return;
    }

    try {
      const res = await axios.post("/mess-staff/verify-password", {
        email: user.email,
        password,
      });

      if (res.data.success) {
        // 🟢 CRITICAL FIX: The user is verified. Now we must update the
        // global auth state with the full user object from the backend.
        // This completes the login process.
        login(res.data.user);

        // Now that the user is fully logged in, navigate to the dashboard.
        navigate("/admin", { replace: true });
      } else {
        // This 'else' block is unlikely to be hit if the backend is correct,
        // but it's good practice to keep it.
        setError("Incorrect password. Try again.");
      }
    } catch (err) {
      // The catch block will handle 401 (wrong password) or 500 errors.
      const message = err.response?.data?.message || "Verification failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
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
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-300 mb-4"
        />

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-bold"
        >
          Verify Password & Log In
        </button>
      </form>
    </div>
  );
};

export default PasswordVerifyPage;
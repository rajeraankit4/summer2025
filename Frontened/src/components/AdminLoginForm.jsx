import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosConfig";

const AdminLoginForm = () => {
  const [searchParams] = useSearchParams();
  const selectedRole = searchParams.get("role") || "superadmin";

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: selectedRole,
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState(null);
  // 🟢 FIX 1: The 'successMessage' state was missing.
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // When the role changes, reset the form to prevent old data from carrying over.
    setFormData({
      name: "",
      mobile: "",
      email: "",
      password: "",
      role: selectedRole,
    });
  }, [selectedRole]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      if (formData.role === "superadmin" ) {
        // ✅ CORRECTED LOGIC FOR SUPERADMIN
        // This single block handles any role that uses a direct email/password login.
        
        // Step 1: Send credentials to the backend for validation.
        const res = await axios.post(`/auth/login`, {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        // Step 2: If the backend confirms success, finalize the login.
        if (res.data.success) {
          login(res.data.user); // Update the AuthContext with user data.
          setSuccessMessage("Login successful! Redirecting...");
          
          // Step 3: Navigate to the dashboard.
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1500);
        } else {
          // This handles cases where the API returns a structured error.
          setError(res.data.error || "Login failed. Please check credentials.");
        }
      } else if (formData.role === "canteenadmin") {
         await axios.post("/canteen-staff/login", {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
         });

        // Step 2: Temporarily store the details in the auth context so the next page knows who is verifying.
        login({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          role: "canteenadmin",
        });
        
        // Step 3: Navigate to the password verification page.
        navigate("/canteen-admin/password-verify");

      } else if (formData.role === "messadmin") {
        // ✅ CORRECTED LOGIC FOR MESSADMIN (Two-Step Flow)
        // Step 1: Send details to the backend, which will email a password.
        await axios.post("/mess-staff/login", {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
        });

        // Step 2: Temporarily store the details in the auth context so the next page knows who is verifying.
        login({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          role: "messadmin",
        });
        
        // Step 3: Navigate to the password verification page.
        navigate("/admin/password-verify");
      }

    } catch (err) {
      // This 'catch' block handles network errors (e.g., 401, 404, 500) from the backend.
      console.error("Login error:", err);
      setError(
        err.response?.data?.error || "Login failed. Please check credentials."
      );
    }
  };

  // This boolean simplifies the JSX rendering.
  const isEmailPasswordLogin =
    formData.role === "superadmin";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md w-full p-8 bg-white rounded-3xl shadow-lg"
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

        {isEmailPasswordLogin ? (
          // Form fields for Superadmin 
          <>
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
          </>
        ) : (
          // Form fields for Messadmin  and Canteenadmin
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-300"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile No"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-300"
            />
          </>
        )}

        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}
        
        {successMessage && (
            <div className="p-3 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
                {successMessage}
            </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold"
        >
          {formData.role === 'messadmin' ? 'Continue to Verify' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
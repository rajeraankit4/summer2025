import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TestLogin = () => {
  const [selectedRole, setSelectedRole] = useState("student");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      role: selectedRole,
      name: selectedRole === "student" ? "John Doe" : "Admin User",
      email:
        selectedRole === "student" ? "john@example.com" : "admin@example.com",
      id: selectedRole === "student" ? "ST001" : "ADMIN001",
    };

    login(userData);

    // Navigate to appropriate dashboard
    if (selectedRole === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Test Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select a role to login as
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Login as:
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="student">Student</option>
                <option value="superadmin">Super Admin</option>
                <option value="canteenadmin">Canteen Admin</option>
                <option value="messadmin">Mess Admin</option>
              </select>
            </div>
            <button
              onClick={handleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLogin;

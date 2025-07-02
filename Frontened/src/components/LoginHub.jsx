import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield } from 'lucide-react';

const LoginHub = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">Welcome Back!</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/student-login')}
            className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <User className="w-6 h-6 mr-3" />
            Student Login
          </button>
          <button
            onClick={() => navigate('/admin-login')}
            className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white bg-gray-800 rounded-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            <Shield className="w-6 h-6 mr-3" />
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginHub;

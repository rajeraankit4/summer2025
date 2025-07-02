import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, ShoppingCart, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">Admin Login</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/admin-login-form')}
            className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            <Utensils className="w-6 h-6 mr-3" />
            Mess Admin
          </button>
          <button
            onClick={() => navigate('/admin-login-form')}
            className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="w-6 h-6 mr-3" />
            Canteen Admin
          </button>
          <button
            onClick={() => navigate('/admin-login-form')}
            className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          >
            <ShieldCheck className="w-6 h-6 mr-3" />
            Super Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

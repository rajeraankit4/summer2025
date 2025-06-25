import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to My Website</h1>
        <p className="text-gray-700 mb-6">
          This is a simple homepage built with React and Tailwind CSS.
        </p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;

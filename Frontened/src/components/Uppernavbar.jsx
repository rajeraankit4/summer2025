import React from 'react';

const Hadder = () => {
  return (
    <nav className="bg-amber-50 border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="flex justify-center items-center py-8 bg-white dark:bg-gray-900 shadow-md space-x-4">
        {/* Smaller logo */}
        <img src="/PU_Logo.png" alt="PU Logo" className="h-16 w-auto" />

        {/* Styled heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-600 dark:text-white tracking-wide text-center">
          Panjab University
        </h1>
      </div>
    </nav>
  );
};

export default Hadder;

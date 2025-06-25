import React from "react";

const Signup = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>

      <div className="mb-4">
        <label className="block relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-user text-gray-500"></i>
          </span>
          <input
            type="text"
            placeholder="Name"
            className="pl-10 w-full p-3 rounded-full bg-gray-200 focus:outline-none"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-envelope text-gray-500"></i>
          </span>
          <input
            type="email"
            placeholder="Email"
            className="pl-10 w-full p-3 rounded-full bg-gray-200 focus:outline-none"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-building text-gray-500"></i>
          </span>
          <input
            type="number"
            placeholder="Hostel No"
            className="pl-10 w-full p-3 rounded-full bg-gray-200 focus:outline-none"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-phone text-gray-500"></i>
          </span>
          <input
            type="number"
            placeholder="Phone No"
            className="pl-10 w-full p-3 rounded-full bg-gray-200 focus:outline-none"
          />
        </label>
      </div>
      

      <button className="w-full bg-black text-white py-3 rounded-full font-semibold mb-4">
        Sign Up
      </button>
    </>
  );
};

export default Signup;

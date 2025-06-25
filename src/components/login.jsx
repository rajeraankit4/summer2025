import React from "react";

const Login = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-8">Log in</h2>
      <div className="mb-4">
        <label className="block relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-user text-gray-500"></i>
          </span>
          <input
            type="text"
            placeholder="Phone number"
            className="pl-10 w-full p-3 rounded-full bg-gray-200 focus:outline-none"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-lock text-gray-500"></i>
          </span>
          <input
            type="password"
            placeholder="OTP"
            className="pl-10 pr-10 w-full p-3 rounded-full bg-gray-200 focus:outline-none"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <i className="fas fa-eye-slash text-gray-500"></i>
          </span>
        </label>
      </div>

      <button className="w-full bg-black text-white py-3 rounded-full font-semibold mb-4">
        Log in
      </button>
    </>
  );
};

export default Login;

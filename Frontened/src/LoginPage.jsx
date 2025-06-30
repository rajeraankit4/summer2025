import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import FloatingImages from "./components/FloatingImages";
import logo from "./assets/pulogo.png";
import logo1 from "./assets/Uietlogo.png";
import { useEffect } from "react";

const LoginPage = ({ mode = "login" }) => {
const [showLogin, setShowLogin] = useState(true);

useEffect(() => {
  setShowLogin(mode === "login");
}, [mode]);
  const toggleLogin = () => setShowLogin(!showLogin);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-white">
      {/* Left Side */}
      <div className="w-1/2 bg-orange-300 text-white rounded-r-[60px] flex flex-col p-12 relative overflow-hidden">
        <FloatingImages />

        <div className="flex justify-between items-center text-sm mb-8 z-10">
          <div className="flex gap-8">
            <button onClick={() => navigate("/")} className="transition duration-150 ease-in-out bg-white text-sky-500 hover:bg-sky-600 px-4 py-2 rounded-full">HOME</button>
            <button onClick={() => navigate("/about")} className="transition duration-150 ease-in-out bg-white text-sky-500 hover:bg-sky-600 px-4 py-2 rounded-full">ABOUT US</button>
            <button onClick={() => alert("Contact page not implemented yet")} className="transition duration-150 ease-in-out bg-white text-sky-500 hover:bg-sky-600 px-4 py-2 rounded-full">CONTACT</button>
            <button onClick={toggleLogin} className="transition duration-150 ease-in-out bg-white text-sky-500 hover:bg-sky-600 px-4 py-2 rounded-full">
              {showLogin ? "SIGN UP" : "LOG IN"}
            </button>
          </div>
        </div>

        <div className="absolute top-6 right-6 flex flex-row items-center gap-4 z-10">
          <img className="rounded-full object-cover w-12 h-12" src={logo} alt="PU Logo" />
          <img className="rounded-full object-cover w-12 h-12" src={logo1} alt="UIET Logo" />
        </div>

        <div className="flex-grow" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center items-center rounded-l-[60px] bg-white p-12">
        <div className="w-full max-w-md">
          {showLogin ? <Login /> : <Signup />}
          <div className="text-center text-gray-400 my-4">Or</div>
          <button
            onClick={toggleLogin}
            className="w-full bg-gray-200 text-black py-3 rounded-full font-semibold"
          >
            {showLogin ? "Switch to Sign Up" : "Switch to Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

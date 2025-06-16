import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Home from './pages/Home';
import Uppernavbar from './Components/Uppernavbar'; // ✅ Corrected import
import Footer from './Components/footer'; // Assuming you have a footer componen
import About from './Components/About';

const App = () => {
  return (
    <div className=" bg-gray-50 max-h-full sm:mx-[.001%]">
       <Navbar />
      <Uppernavbar /> {/* ✅ Correct usage */}
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
        {/* Add more routes like About, Contact etc. if needed */}
      </Routes>
      <About/> {/* Assuming you have an About component */}
      <Footer />
    </div>
  );
};

export default App;

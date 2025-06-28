import React, { useState } from 'react';
import { ChefHat, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Import

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#ee8d4a] rounded-lg flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PU Food Hub</h1>
              <p className="text-xs text-gray-600">Mess & Canteen Manager</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#ee8d4a] transition-colors">Home</a>
            <a href="#features" className="text-gray-700 hover:text-[#ee8d4a] transition-colors">Features</a>
            <a href="#expenses" className="text-gray-700 hover:text-[#ee8d4a] transition-colors">Expense Tracker</a>
            <a href="#about" className="text-gray-700 hover:text-[#ee8d4a] transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-[#ee8d4a] transition-colors">Contact</a>
            <button
              onClick={() => navigate("/login")} // ✅ Corrected
              className="bg-[#ee8d4a] text-white px-6 py-2 rounded-lg hover:bg-[#d67a3a] transition-colors"
            >
              login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-[#ee8d4a]">Home</a>
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-[#ee8d4a]">Features</a>
              <a href="#expenses" className="block px-3 py-2 text-gray-700 hover:text-[#ee8d4a]">Expense Tracker</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-[#ee8d4a]">About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-[#ee8d4a]">Contact</a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full text-left bg-[#ee8d4a] text-white px-3 py-2 rounded-lg hover:bg-[#d67a3a] transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

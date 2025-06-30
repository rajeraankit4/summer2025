import React from 'react';
import { ChefHat, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#ee8d4a] rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">PU Food Hub</h3>
                <p className="text-sm text-gray-400">Mess & Canteen Manager</p>
              </div>
            </div>
            <p className="text-gray-400">
              Complete food and expense management solution for Punjab University students. 
              Track, budget, and save on your campus dining experience.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">Features</a></li>
              <li><a href="#expenses" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">Expense Tracker</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">Mess Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">Canteen Orders</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">Expense Tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">Budget Analytics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ee8d4a] transition-colors">Digital Receipts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#ee8d4a]" />
                <span className="text-gray-400">Punjab University, Chandigarh</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#ee8d4a]" />
                <span className="text-gray-400">+91 172 2534000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#ee8d4a]" />
                <span className="text-gray-400">foodhub@puchd.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Punjab University Food Hub - Mess & Canteen Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
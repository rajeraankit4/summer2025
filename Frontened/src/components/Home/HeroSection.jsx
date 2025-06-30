import React from 'react';
import { Users, ChefHat, Coffee, DollarSign, Pause, Play } from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { icon: Users, label: 'Active Students', value: '2,500+' },
    { icon: ChefHat, label: 'Mess Halls', value: '12' },
    { icon: Coffee, label: 'Canteens', value: '8' },
    { icon: DollarSign, label: 'Avg. Monthly Savings', value: '₹1,200' }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-[#ee8d4a] via-[#f4a261] to-[#e76f51] overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Smart Food & Expense Management for
                <span className="block text-yellow-200">Punjab University</span>
              </h1>
              <p className="text-xl lg:text-2xl text-orange-100 leading-relaxed">
                Complete solution for mess management, canteen ordering, and expense tracking. 
                Monitor your food budget while enjoying quality meals on campus.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-[#ee8d4a] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Start Tracking Today
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#ee8d4a] transition-all duration-300">
                View Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-200" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-orange-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="University Food Court"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Budget Friendly</div>
                    <div className="text-sm text-gray-600">Track Every Rupee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

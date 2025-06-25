import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="bg-gray-50 py-12 px-6 md:px-16">
      {/* About Us Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block border-b-4 border-primary pb-2">
          ABOUT <span className="text-primary">US</span>
        </h2>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <img
          className="w-full md:max-w-md rounded-lg shadow-md object-cover"
          src={assets.About}
          alt="About us"
        />
        <div className="flex flex-col gap-5 text-[16px] text-gray-700 leading-relaxed">
          <p>
  Welcome to <span className="font-semibold text-primary">PU Mess Management</span>, your dedicated solution for organizing and managing daily dining services efficiently. We understand how essential it is for students and staff to access hygienic, timely, and nutritious meals without hassle.
</p>
<p>
  Our platform is designed to streamline mess operations — from meal scheduling and inventory tracking to real-time feedback and issue reporting. Whether you're a student checking daily menus or an administrator ensuring smooth kitchen operations, our system keeps everything running seamlessly.
</p>
<h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
<p>
  Our vision is to modernize campus dining with smart technology. By enhancing transparency, reducing waste, and improving user experience, we aim to make mess services more reliable, sustainable, and student-friendly.
</p>

        </div>
      </div>

      {/* Why Choose Us Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          WHY <span className="text-primary font-bold">CHOOSE US</span>
        </h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
           title: 'EFFICIENCY',
            desc: 'Simplified meal tracking and scheduling to ensure smooth daily mess operations.',
          },
          {
            title: 'CONVENIENCE',
            desc: 'Easy access to menus, feedback, and meal booking — all from one platform.',
          },
          {
            title: 'TRANSPARENCY',
            desc: 'Clear insights into food quality, attendance, and mess charges for all users.',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow-sm hover:shadow-xl px-8 py-10 text-center transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer"
          >
            <h4 className="text-lg font-bold mb-4">{item.title}</h4>
            <p className="text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

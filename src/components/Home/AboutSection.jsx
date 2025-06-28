import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ABOUT <span className="text-[#ee8d4a]">US</span>
          </h2>
          <div className="w-24 h-1 bg-[#ee8d4a] mx-auto"></div>
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              className="w-full rounded-xl shadow-lg object-cover h-80"
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
              alt="About Punjab University Food Management"
            />
          </div>
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to <span className="font-semibold text-[#ee8d4a]">PU Mess Management</span>, your dedicated
              solution for organizing and managing daily dining services efficiently. We understand how essential
              it is for students and staff to access hygienic, timely, and nutritious meals without hassle.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform is designed to streamline mess operations — from meal scheduling and inventory tracking
              to real-time feedback and issue reporting. Whether you're a student checking daily menus or an
              administrator ensuring smooth kitchen operations, our system keeps everything running seamlessly.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                Our vision is to modernize campus dining with smart technology. By enhancing transparency, reducing
                waste, and improving user experience, we aim to make mess services more reliable, sustainable, and
                student-friendly.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            WHY <span className="text-[#ee8d4a] font-bold">CHOOSE US</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive solutions that make campus dining management simple and efficient
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'EFFICIENCY',
              desc: 'Simplified meal tracking and scheduling to ensure smooth daily mess operations.',
              icon: '⚡'
            },
            {
              title: 'CONVENIENCE',
              desc: 'Easy access to menus, feedback, and meal booking — all from one platform.',
              icon: '📱'
            },
            {
              title: 'TRANSPARENCY',
              desc: 'Clear insights into food quality, attendance, and mess charges for all users.',
              icon: '👁️'
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

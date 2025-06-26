import React from 'react';
import { ArrowRight, DollarSign } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#ee8d4a] to-[#e76f51]">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Food Budget?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of Punjab University students who are already saving money 
            and eating better with our smart food management system.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-[#ee8d4a] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center">
            Start Tracking Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#ee8d4a] transition-all duration-300">
            View Pricing Plans
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="text-white">
            <div className="text-2xl font-bold">₹1,200</div>
            <div className="text-orange-100">Average Monthly Savings</div>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold">95%</div>
            <div className="text-orange-100">Budget Accuracy</div>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-orange-100">Expense Tracking</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
import React from 'react';
import { Calendar, Users, TrendingUp, CheckCircle, DollarSign, Coffee, PieChart, Receipt } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Meal Planning',
      description: 'Weekly meal schedules with nutritional information and dietary preferences for mess and canteen'
    },
    {
      icon: DollarSign,
      title: 'Expense Tracking',
      description: 'Real-time tracking of mess fees and canteen purchases with detailed spending analytics'
    },
    {
      icon: Coffee,
      title: 'Canteen Integration',
      description: 'Order from multiple canteens, track purchases, and manage your food budget seamlessly'
    },
    {
      icon: PieChart,
      title: 'Budget Analytics',
      description: 'Visual insights into your spending patterns with monthly reports and budget recommendations'
    },
    {
      icon: Users,
      title: 'Student Management',
      description: 'Easy registration, meal plan selection, and account management for all students'
    },
    {
      icon: Receipt,
      title: 'Digital Receipts',
      description: 'Paperless transactions with instant digital receipts and expense categorization'
    },
    {
      icon: TrendingUp,
      title: 'Smart Insights',
      description: 'AI-powered recommendations to optimize your food budget and eating habits'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Feedback system and quality monitoring across all mess halls and canteens'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Food & Finance Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From mess meals to canteen snacks, track every food expense while enjoying 
            the best dining experience Punjab University has to offer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-[#ee8d4a]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#ee8d4a] transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-[#ee8d4a] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
import React from 'react';
import { DollarSign, TrendingDown, PieChart, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

const ExpenseTrackingSection = () => {
  const expenseStats = [
    {
      title: 'Monthly Mess Fee',
      amount: '₹3,500',
      change: '+5%',
      trend: 'up',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Canteen Spending',
      amount: '₹1,850',
      change: '-12%',
      trend: 'down',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Total Food Budget',
      amount: '₹5,350',
      change: '-3%',
      trend: 'down',
      icon: PieChart,
      color: 'bg-[#ee8d4a]'
    },
    {
      title: 'Savings This Month',
      amount: '₹650',
      change: '+18%',
      trend: 'up',
      icon: TrendingDown,
      color: 'bg-purple-500'
    }
  ];

  const recentTransactions = [
    { item: 'Samosa & Tea', location: 'Central Canteen', amount: '₹25', time: '2 hours ago' },
    { item: 'Lunch Meal', location: 'Main Mess', amount: '₹45', time: '5 hours ago' },
    { item: 'Coffee & Sandwich', location: 'Library Canteen', amount: '₹60', time: '1 day ago' },
    { item: 'Evening Snacks', location: 'Hostel Canteen', amount: '₹35', time: '1 day ago' }
  ];

  return (
    <section id="expenses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Expense Tracking Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get complete visibility into your food expenses with real-time tracking, 
            budget insights, and spending analytics.
          </p>
        </div>

        {/* Expense Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expenseStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.amount}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div>
                      <div className="font-semibold text-gray-900">{transaction.item}</div>
                      <div className="text-sm text-gray-600">{transaction.location} • {transaction.time}</div>
                    </div>
                    <div className="text-lg font-bold text-[#ee8d4a]">{transaction.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#ee8d4a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#d67a3a] transition-colors flex-1">
                View Full Dashboard
              </button>
              <button className="border-2 border-[#ee8d4a] text-[#ee8d4a] px-6 py-3 rounded-xl font-semibold hover:bg-[#ee8d4a] hover:text-white transition-colors flex-1">
                Set Budget Goals
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-xl">
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Mess Meals</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="w-16 h-2 bg-[#ee8d4a] rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Canteen Snacks</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Budget Status</h4>
                <p className="text-gray-600 mb-4">You're ₹650 under budget this month!</p>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div className="w-4/5 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>₹5,350 spent</span>
                  <span>₹6,000 budget</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpenseTrackingSection;
import React from 'react';
import { Users, UtensilsCrossed, ShoppingCart, IndianRupee } from 'lucide-react'; // Optional: Use any icon set you prefer

const stats = [
  {
    title: 'Total Students',
    value: '120',
    icon: <Users className="text-white w-6 h-6" />,
    bg: 'from-indigo-500 to-indigo-700',
  },
  {
    title: 'Meals Today',
    value: '320',
    icon: <UtensilsCrossed className="text-white w-6 h-6" />,
    bg: 'from-green-400 to-green-600',
  },
  {
    title: 'Canteen Orders',
    value: '145',
    icon: <ShoppingCart className="text-white w-6 h-6" />,
    bg: 'from-yellow-400 to-yellow-600',
  },
  {
    title: 'Revenue (₹)',
    value: '82,000',
    icon: <IndianRupee className="text-white w-6 h-6" />,
    bg: 'from-pink-500 to-pink-700',
  },
];

const StatCard = ({ title, value, icon, bg }) => (
  <div className={`rounded-xl shadow-md p-5 bg-gradient-to-br ${bg} hover:scale-105 transform transition-all duration-300`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white text-sm font-medium">{title}</p>
        <h2 className="text-white text-2xl font-bold mt-1">{value}</h2>
      </div>
      <div className="bg-white/20 p-2 rounded-full">{icon}</div>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bg={stat.bg}
          />
        ))}
      </div>
    </div>
  );
}

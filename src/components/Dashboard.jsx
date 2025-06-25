import { useState, useEffect } from "react";
import { Users, UtensilsCrossed, ShoppingCart, IndianRupee } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const mealData = [
  { day: 'Mon', meals: 280 },
  { day: 'Tue', meals: 300 },
  { day: 'Wed', meals: 320 },
  { day: 'Thu', meals: 310 },
  { day: 'Fri', meals: 290 },
  { day: 'Sat', meals: 340 },
  { day: 'Sun', meals: 280 },
];

const revenueData = [
  { day: 'Mon', revenue: 65000 },
  { day: 'Tue', revenue: 70000 },
  { day: 'Wed', revenue: 75000 },
  { day: 'Thu', revenue: 72000 },
  { day: 'Fri', revenue: 68000 },
  { day: 'Sat', revenue: 80000 },
  { day: 'Sun', revenue: 67000 },
];


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
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
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

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Meals Served This Week</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mealData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="meals" stroke="#4ade80" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Revenue This Week</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

}

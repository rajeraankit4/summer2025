import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Building2,
  Users,
  Utensils,
  ScrollText,
  CreditCard,
  Megaphone,
  Settings,
} from 'lucide-react';
import Students from './Student';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <Building2 size={18} /> },
  { name: 'Students', path: '/admin/students', icon: <Users size={18} /> },
  { name: 'Mess Management', path: '/admin/mess', icon: <Utensils size={18} /> },
  { name: 'Canteen Management', path: '/admin/canteen', icon: <ScrollText size={18} /> },
  { name: 'Billing & Payments', path: '/admin/billing', icon: <CreditCard size={18} /> },
  { name: 'Notices', path: '/admin/notices', icon: <Megaphone size={18} /> },
  { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#ee8d4a] text-white shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-wide mb-8">🏢 Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? 'bg-white text-[#ee8d4a] font-semibold shadow-sm'
                      : 'hover:bg-white hover:bg-opacity-20'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 overflow-auto">
        <Outlet />
        <Students />
      </main>
    </div>
  );
}

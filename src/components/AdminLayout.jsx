import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/PU_Logo.png";
import { UserCircle, ChevronDown } from "lucide-react"; // at top
import { useState, useRef, useEffect } from "react";
import {
  Users,
  Utensils,
  ScrollText,
  CreditCard,
  Megaphone,
  Settings,
  Building2,
  UtensilsCrossed,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Building2 size={18} />,
  },
  { name: "Students", path: "/admin/students", icon: <Users size={18} /> },
  {
    name: "Mess Management",
    path: "/admin/mess",
    icon: <Utensils size={18} />,
  },
  {
    name: "Canteen Management",
    path: "/admin/canteen",
    icon: <ScrollText size={18} />,
  },
  {
    name: "Billing & Payments",
    path: "/admin/billing",
    icon: <CreditCard size={18} />,
  },
  { name: "Notices", path: "/admin/notices", icon: <Megaphone size={18} /> },
  { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#ee8d4a] text-white shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-wide mb-8">
            🏢 Admin Panel
          </h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-white text-[#ee8d4a] font-semibold shadow-sm"
                      : "hover:bg-white hover:bg-opacity-20"
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
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-15 w-auto" />
            <h1 className="text-3xl font-semibold text-gray-800">
              Baba Banda Singh Bahadur Boys Hostel 8
            </h1>
          </div>
          {/* profile options on RHS */}
          <div className="relative" ref={dropdownRef}>
  <button
    onClick={() => setOpen((prev) => !prev)}
    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
  >
    <UserCircle className="w-8 h-8" />
    <ChevronDown className="w-4 h-4" />
  </button>

  {open && (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
      <ul className="py-1 text-sm text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Profile</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Logout</li>
      </ul>
    </div>
  )}
</div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white text-center text-gray-500 py-3 text-sm border-t">
          © {new Date().getFullYear()} Hostel Management System • Made by
          UIETians
        </footer>
      </div>
    </div>
  );
}

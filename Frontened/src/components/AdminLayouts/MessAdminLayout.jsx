// src/AdminLayouts/MessAdminLayout.jsx - CORRECTED

import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserCircle, ChevronDown, Utensils, Settings, DollarSign } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// ✅ --- CORRECTION IS HERE ---
// The paths must match the routes defined in MessAdminRoutes.jsx,
// which are nested under "/mess-admin".
const navItems = [
  {
    name: "Menu Management",
    path: "/mess-admin/menu", // Changed from /admin/menu
    icon: <Utensils size={18} />,
  },
  {
    name: "Student Expenses",
    path: "/mess-admin/expenses", // Changed from /admin/expenses
    icon: <DollarSign size={18} />,
  },
  {
    name: "Settings",
    path: "/mess-admin/settings", // Changed from /admin/settings
    icon: <Settings size={18} />,
  },
];

export default function MessAdminLayout() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/loginhub");
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // The rest of your JSX is perfectly fine and requires no changes.
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-600 to-green-700 text-white shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-wide mb-8">
            🍽️ Mess Admin
          </h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-white text-green-700 font-semibold shadow-sm"
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
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b-2 border-green-200">
            {/* Header content... */}
             <div className="flex items-center gap-3">
            <img src="/PU_Logo.png" alt="PU Logo" className="h-16 w-auto" />
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">
                Mess Management System
              </h1>
              <p className="text-sm text-green-600 font-medium">
                Baba Banda Singh Bahadur Boys Hostel 8
              </p>
            </div>
          </div>
           <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <UserCircle className="w-8 h-8" />
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown Menu... */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* The Outlet is correctly placed here! */}
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white text-center text-gray-500 py-3 text-sm border-t border-green-200">
          © {new Date().getFullYear()} Mess Management System • Made by UIETians
        </footer>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { UtensilsCrossed, Bell, Receipt } from "lucide-react";

const StudentDashboard = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@student.com",
    hostelNo: "B-Block",
    room: "B-204",
    phoneNo: "9876543210",
    profilePic: "/src/assets/Uietlogo.png",
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "menu",
      message: "Today's special: Butter Chicken & Naan",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "payment",
      message: "Mess fee payment due in 3 days",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "announcement",
      message: "Mess will be closed on Sunday for maintenance",
      time: "1 day ago",
    },
  ]);

  const quickStats = [
    {
      label: "Meals This Month",
      value: "45",
      icon: UtensilsCrossed,
      color: "text-blue-600",
    },
    {
      label: "Avg Daily Expense",
      value: "₹85",
      icon: Receipt,
      color: "text-purple-600",
    },
    {
      label: "Pending Notifications",
      value: "3",
      icon: Bell,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Recent Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Recent Notifications
            </h3>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400"
                >
                  <p className="text-sm text-gray-800">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-800">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

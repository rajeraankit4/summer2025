import { useState, useEffect } from "react";
import { UtensilsCrossed, Bell, Receipt } from "lucide-react";
import axios from "../api/axiosConfig";

const StudentDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Temporarily using mock data instead of API call
        const mockStudent = {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          studentId: "ST001",
          hostelBlock: "Block A",
          roomNumber: "101",
          profilePic: null,
        };
        setCurrentUser(mockStudent);
      } catch (err) {
        console.error("Failed to fetch student data:", err);
      }
    };

    const fetchNotifications = async () => {
      try {
        // Temporarily using mock data instead of API call
        const mockNotifications = [
          {
            text: "Mess Annual Function on 18 May 2025...",
            date: "12 May 9:16 PM",
          },
          {
            text: "Hostel fee payment due date extended...",
            date: "18 Jun 4:10 PM",
          },
          { text: "New menu items added this week...", date: "20 Jun 2:30 PM" },
        ];
        setNotifications(mockNotifications);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchStudentData();
    fetchNotifications();
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const quickStats = [
    {
      label: "Meals This Month",
      value: "45", // This would be calculated from user data
      icon: UtensilsCrossed,
      color: "text-blue-600",
    },
    {
      label: "Avg Daily Expense",
      value: "₹85", // This would be calculated from user data
      icon: Receipt,
      color: "text-purple-600",
    },
    {
      label: "Pending Notifications",
      value: notifications.length,
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
                  key={notification._id}
                  className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400"
                >
                  <p className="text-sm text-gray-800">{notification.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.date}
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

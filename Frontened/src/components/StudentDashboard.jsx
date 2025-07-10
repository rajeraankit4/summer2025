import { useState, useEffect } from "react";
import { UtensilsCrossed, Bell, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

const StudentDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [mealsThisMonth, setMealsThisMonth] = useState(0);
  const [avgDailyExpense, setAvgDailyExpense] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
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
        const token = localStorage.getItem("token");
        const response = await axios.get("/notices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sortedNotices = response.data.sort(
          (a, b) =>
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        );
        setNotifications(sortedNotices);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setNotifications([
          {
            _id: "1",
            text: "Unable to load latest notices. Please check your connection.",
            date: "Now",
          },
        ]);
      }
    };

    const fetchExpenseStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await axios.get("/mess-staff/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const expenses = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const thisMonthExpenses = expenses.filter((expense) => {
          const date = new Date(expense.date);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          );
        });

        setMealsThisMonth(thisMonthExpenses.length);

        const totalAmount = thisMonthExpenses.reduce(
          (acc, expense) => acc + Number(expense.amount),
          0
        );

        const average =
          thisMonthExpenses.length > 0
            ? Math.round(totalAmount / thisMonthExpenses.length)
            : 0;

        setAvgDailyExpense(average);
      } catch (err) {
        console.error("Failed to fetch expense stats:", err);
      }
    };

    // 🟢 Call all async functions
    fetchStudentData();
    fetchNotifications();
    fetchExpenseStats();
  }, []);

  if (!currentUser) return <div>Loading...</div>;

  const quickStats = [
    {
      label: "Meals This Month",
      value: mealsThisMonth.toString(),
      icon: UtensilsCrossed,
      color: "text-blue-600",
    },
    {
      label: "Avg Daily Expense",
      value: `₹${avgDailyExpense}`,
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
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Notices Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Recent Notices
            </h3>
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">No notices available</p>
                </div>
              ) : (
                notifications.slice(0, 3).map((notification, index) => (
                  <div
                    key={notification._id || index}
                    className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400"
                  >
                    <p className="text-sm text-gray-800">{notification.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={() => navigate("/student/notices")}
              className="w-full mt-4 text-orange-600 text-sm font-medium hover:text-orange-800 transition-colors duration-200"
            >
              View All Notices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

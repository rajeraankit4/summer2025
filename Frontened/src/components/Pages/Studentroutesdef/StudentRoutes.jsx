import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StudentLayout from "../../StudentLayouts/StudentLayout";
import StudentDashboard from "../../../components/StudentDashboard";
import { getWeeklyMenu } from "../../../api/menuApi";

// Create placeholder components for other student pages
const StudentMenu = () => {
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await getWeeklyMenu();
        if (response.success) {
          setWeeklyMenu(response.data);
        } else {
          setError("Failed to fetch menu data");
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const getMenuForDay = (day) => {
    return weeklyMenu.find((menu) => menu.day === day);
  };

  const getMealColor = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return "border-blue-500";
      case "lunch":
        return "border-green-500";
      case "dinner":
        return "border-purple-500";
      default:
        return "border-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          📅 Weekly Menu
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          📅 Weekly Menu
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📅 Weekly Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {daysOfWeek.map((day) => {
          const dayMenu = getMenuForDay(day);

          return (
            <div key={day} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {day}
              </h3>

              {dayMenu ? (
                <div className="space-y-3">
                  {dayMenu.meals.map((meal, index) => (
                    <div
                      key={index}
                      className={`border-l-4 ${getMealColor(meal.type)} pl-3`}
                    >
                      <p className="font-medium text-sm text-gray-600 capitalize">
                        {meal.type}
                      </p>
                      <p className="text-sm text-gray-800">
                        {meal.items.join(", ")}
                      </p>
                      {meal.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {meal.description}
                        </p>
                      )}
                      {meal.calories && (
                        <p className="text-xs text-blue-600 mt-1">
                          {meal.calories} cal
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No menu available</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Menu will be updated soon
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StudentExpenses = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">� My Expenses</h1>

    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Expenses</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            Download Report
          </button>
        </div>

        <div className="space-y-3">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    i % 2 === 0 ? "bg-red-100" : "bg-orange-100"
                  }`}
                >
                  <span
                    className={`text-xs ${
                      i % 2 === 0 ? "text-red-600" : "text-orange-600"
                    }`}
                  >
                    {i % 2 === 0 ? "🍽️" : "☕"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {i % 2 === 0 ? "Mess Meal Expense" : "Canteen Purchase"}
                  </p>
                  <p className="text-sm text-gray-500">July {i + 1}, 2025</p>
                </div>
              </div>
              <span className="font-semibold text-red-600">
                -₹{Math.floor(Math.random() * 150) + 30}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const StudentNotifications = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">🔔 Notifications</h1>

    <div className="space-y-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-full ${
                  i % 3 === 0
                    ? "bg-blue-100"
                    : i % 3 === 1
                    ? "bg-green-100"
                    : "bg-yellow-100"
                }`}
              >
                <span className="text-sm">
                  {i % 3 === 0 ? "📢" : i % 3 === 1 ? "💰" : "🍽️"}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {i % 3 === 0
                    ? "System Announcement"
                    : i % 3 === 1
                    ? "Expense Update"
                    : "Menu Update"}
                </h3>
                <p className="text-gray-600 mt-1">
                  {i % 3 === 0
                    ? "Mess will be closed on Sunday for maintenance and cleaning."
                    : i % 3 === 1
                    ? "Your daily meal expense for today was ₹85. Check expense details."
                    : "New items added to this week's menu. Check out the special dishes!"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {i + 1} hour{i > 0 ? "s" : ""} ago
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">×</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // Temporarily using mock data instead of API call
        const mockStudent = {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          studentId: "ST001",
          hostelBlock: "Block A",
          roomNumber: "101",
          phone: "9876543210",
          profilePic: "/src/assets/ProfilePic.png",
        };
        setStudent(mockStudent);
        setPhone(mockStudent.phone);
        setProfilePic(mockStudent.profilePic);
      } catch (err) {
        console.error("Failed to fetch student profile:", err);
      }
    };
    fetchStudent();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Temporarily disabled API call - just show success message
      alert("Profile updated successfully! (Mock mode)");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile.");
    }
  };

  if (!student) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">👤 My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-6">
            <img
              src={profilePic}
              alt="Profile"
              className="h-24 w-24 rounded-full mx-auto mb-4 object-cover bg-gray-100 p-2"
            />
            <h2 className="text-xl font-semibold">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-gray-600">
              {student.hostelBlock}, Room {student.roomNumber}
            </p>
          </div>
          <button
            onClick={() =>
              alert("Feature to change profile picture not implemented yet.")
            }
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Change Profile Picture
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={`${student.firstName} ${student.lastName}`}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={student.email}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <button
              onClick={handleUpdateProfile}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentSettings = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">⚙️ Settings</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Menu Updates</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Expense Alerts</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">System Announcements</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Account Security</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            Change Password
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            Two-Factor Authentication
          </button>
          <button className="w-full text-left p-3 border border-red-200 rounded-lg hover:bg-red-50 text-red-600">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="menu" element={<StudentMenu />} />
        <Route path="expenses" element={<StudentExpenses />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="settings" element={<StudentSettings />} />
        <Route
          path="*"
          element={<Navigate to="/student/dashboard" replace />}
        />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;

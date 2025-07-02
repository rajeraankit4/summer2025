import { Routes, Route, Navigate } from "react-router-dom";
import StudentLayout from "../../StudentLayouts/StudentLayout";
import StudentDashboard from "../../StudentDashboard";

// Create placeholder components for other student pages
const StudentMenu = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">📅 Weekly Menu</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => (
        <div key={day} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{day}</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-3">
              <p className="font-medium text-sm text-gray-600">Breakfast</p>
              <p className="text-sm text-gray-800">Paratha, Tea, Eggs</p>
            </div>
            <div className="border-l-4 border-green-500 pl-3">
              <p className="font-medium text-sm text-gray-600">Lunch</p>
              <p className="text-sm text-gray-800">Rice, Dal, Sabzi</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <p className="font-medium text-sm text-gray-600">Dinner</p>
              <p className="text-sm text-gray-800">Roti, Curry, Rice</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

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

const StudentProfile = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">👤 My Profile</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center mb-6">
          <img
            src="/src/assets/Uietlogo.png"
            alt="Profile"
            className="h-24 w-24 rounded-full mx-auto mb-4 object-cover bg-gray-100 p-2"
          />
          <h2 className="text-xl font-semibold">Rajesh Kumar</h2>
          <p className="text-gray-600">B-Block, Room 204</p>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
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
              value="Rajesh Kumar"
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
              value="rajesh@student.com"
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
              value="9876543210"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  </div>
);

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

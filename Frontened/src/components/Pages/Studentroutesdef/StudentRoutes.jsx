import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StudentLayout from "../../StudentLayouts/StudentLayout";
import StudentDashboard from "../../../components/StudentDashboard";
import { getWeeklyMenu } from "../../../api/menuApi";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ----- Student Menu -----
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
        if (response.success) setWeeklyMenu(response.data);
        else setError("Failed to fetch menu data");
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const getMenuForDay = (day) => weeklyMenu.find((menu) => menu.day === day);
  const getMealColor = (mealType) =>
    ({
      breakfast: "border-blue-500",
      lunch: "border-green-500",
      dinner: "border-purple-500",
    }[mealType] || "border-gray-500");

  if (loading)
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

  if (error)
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

// ----- Student Expenses -----
const StudentExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [student, setStudent] = useState(null); // to hold student base details

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // or however you store it

        const res = await axios.get("/api/personaldetail/view", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const loggedInStudentId = localStorage.getItem("studentid"); // or extract from decoded JWT
        const match = res.data.personaldetailList.find(
          (p) => p.studentid === loggedInStudentId
        );

        if (match) {
          setStudent(match);
        }
      } catch (error) {
        console.error("Failed to fetch student details:", error);
      }
    };

    fetchStudentDetails();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await axios.get("/api/mess-staff/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched expenses:", response);

        if (response.data.status === 1 && Array.isArray(response.data.data)) {
          setExpenses(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("Failed to load expenses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading)
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          💸 My Expenses
        </h1>
        <p className="text-gray-500 text-center">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          💸 My Expenses
        </h1>
        <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
          {error}
        </div>
      </div>
    );

  const downloadPDF = () => {
  if (!student) {
    alert("Student info not loaded yet!");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Student Expenses Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`Name: ${student.firstname} ${student.lastname}`, 14, 30);
  doc.text(`Student ID: ${student.studentid}`, 14, 38);
  doc.text(`Email: ${student.email}`, 14, 46);
  doc.text(`Phone: ${student.phone}`, 14, 54);
  doc.text(`Room: ${student.hostelblock} - ${student.roomno}`, 14, 62);
  doc.text(
    `Address: ${student.address}, ${student.city}, ${student.state} - ${student.zipcode}`,
    14,
    70
  );

  autoTable(doc, {
    startY: 80,
    head: [["Description", "Date", "Amount"]],
    body: expenses.map((e) => [
      e.description,
      new Date(e.date).toLocaleDateString(),
      `Rs. ${e.amount}`,
    ]),
  });

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  doc.text(`Total Expense: Rs. ${total}`, 14, doc.lastAutoTable.finalY + 10);

  doc.save("expenses_report.pdf");
};


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💸 My Expenses</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
            <button
  onClick={downloadPDF}
  className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg text-sm"
>
  Download Report
</button>

          </div>
          <div className="space-y-3">
            {expenses.length === 0 ? (
              <p className="text-center text-gray-500">No expenses found.</p>
            ) : (
              expenses.map((expense, i) => (
                <div
                  key={expense._id || i}
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
                        {expense.description?.toLowerCase().includes("mess")
                          ? "🍽️"
                          : "☕"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {expense.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-red-600">
                    -Rs. {expense.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ----- Notifications -----
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
                    ? "Mess will be closed on Sunday for maintenance."
                    : i % 3 === 1
                    ? "Today's meal expense: Rs. 85"
                    : "Special dishes added to this week's menu!"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {i + 1} hour{i !== 0 && "s"} ago
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

// ----- Profile -----
const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
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
  }, []);

  const handleUpdateProfile = () => {
    alert("Profile updated successfully! (Mock mode)");
  };

  if (!student) return <div>Loading profile...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">👤 My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
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
          <button
            onClick={() => alert("Change photo not implemented")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
          >
            Change Photo
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Info</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={`${student.firstName} ${student.lastName}`}
              readOnly
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              type="email"
              value={student.email}
              readOnly
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />
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

// ----- Settings -----
const StudentSettings = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">⚙️ Settings</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        {["Menu Updates", "Expense Alerts", "System Announcements"].map(
          (label, i) => (
            <div key={i} className="flex justify-between items-center mb-2">
              <span className="text-gray-700">{label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          )
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Account Security</h3>
        {[
          "Change Password",
          "Two-Factor Authentication",
          "Deactivate Account",
        ].map((label, i) => (
          <button
            key={i}
            className={`w-full text-left p-3 rounded-lg border mb-2 ${
              label.includes("Deactivate")
                ? "text-red-600 border-red-200 hover:bg-red-50"
                : "hover:bg-gray-50 border-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ----- Student Routes -----
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

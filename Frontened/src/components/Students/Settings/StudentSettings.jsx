import { useState } from "react";
import ChangePassword from "./ChangePassword";
import DeactivateAccount from "./DeactivateAccount";

const StudentSettings = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">⚙️ Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Menu */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Account Security</h3>

          <button
            onClick={() => setActiveSection("password")}
            className="w-full text-left p-3 rounded-lg border mb-2 hover:bg-gray-50 border-gray-200"
          >
            Change Password
          </button>

          <button
            onClick={() => setActiveSection("deactivate")}
            className="w-full text-left p-3 rounded-lg border mb-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            Deactivate Account
          </button>
        </div>

        {/* Right Side (dynamic content) */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeSection === "password" && <ChangePassword />}
          {activeSection === "deactivate" && <DeactivateAccount />}
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;

import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Shield,
  Mail,
  Phone,
  MapPin,
  Save,
  Check,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const [profile, setProfile] = useState({
    name: 'Admin John Doe',
    email: 'admin@hosteldomain.com',
    phone: '+1-234-567-8900',
    position: 'Super Administrator',
    hostelName: 'Grand Hostel Complex',
    address: '123 University Ave, Campus City, ST 12345',
    emergencyContact: '+1-234-567-8911',
  });

  const [profileSaved, setProfileSaved] = useState(false);
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleProfileSave = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };
  const handlePasswordSave = () => {
    if (password.new !== password.confirm) {
      setPasswordMessage({ text: "New passwords don't match.", type: 'error' });
    } else if (!password.current || !password.new || !password.confirm) {
      setPasswordMessage({ text: 'Please fill in all fields.', type: 'warning' });
    } else if (password.new.length < 8) {
      setPasswordMessage({ text: 'Password must be at least 8 characters long.', type: 'warning' });
    } else {
      setPasswordMessage({ text: 'Password changed successfully!', type: 'success' });
      setPassword({ current: '', new: '', confirm: '' });
    }
    setTimeout(() => setPasswordMessage({ text: '', type: '' }), 4000);
  };

  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState({ text: '', type: '' });

  const handlePasswordReset = () => {
    if (!resetEmail) {
      setResetMessage({ text: 'Please enter an email address.', type: 'warning' });
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetMessage({ text: 'Please enter a valid email address.', type: 'error' });
    } else {
      setResetMessage({ text: `Password reset link sent to ${resetEmail}`, type: 'success' });
      setResetEmail('');
    }
    setTimeout(() => setResetMessage({ text: '', type: '' }), 4000);
  };

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginNotifications: true,
    sessionTimeout: '30',
    allowMultipleSessions: false,
  });

  const [securitySaved, setSecuritySaved] = useState(false);
  const handleSecurityChange = (field, value) => {
    setSecuritySettings({ ...securitySettings, [field]: value });
  };
  const handleSecuritySave = () => {
    setSecuritySaved(true);
    setTimeout(() => setSecuritySaved(false), 3000);
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4" />;
      case 'error':
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };
  const getMessageColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg border border-orange-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-t-xl">
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-8 h-8" />
          <div>
            <h2 className="text-3xl font-bold">Hostel Admin Settings</h2>
            <p className="text-orange-100 mt-1">Manage your administrative preferences and security</p>
          </div>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Tabs */}
        <div className="w-64 bg-orange-50 p-6 rounded-bl-xl border-r border-orange-100">
          {[
            { key: 'profile', icon: <User />, label: 'Profile Settings' },
            { key: 'password', icon: <Lock />, label: 'Change Password' },
            { key: 'reset', icon: <Mail />, label: 'Reset Password' },
            { key: 'security', icon: <Shield />, label: 'Security Settings' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === tab.key ? 'bg-orange-600 text-white shadow-lg' : 'text-orange-700 hover:bg-orange-100'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(profile).map(([field, value]) => (
                  <div key={field}>
                    <label className="block font-semibold mb-2 text-gray-700 capitalize">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </label>
                    {field === 'address' ? (
                      <textarea
                        name={field}
                        rows={3}
                        value={value}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      />
                    ) : (
                      <input
                        type="text"
                        name={field}
                        value={value}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleProfileSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:to-orange-800 transition font-medium"
              >
                <Save className="w-4 h-4" />
                Save Profile
              </button>
              {profileSaved && (
                <div className="mt-4 p-4 rounded-lg border text-green-600 border-green-200 bg-green-50 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Profile saved successfully!
                </div>
              )}
            </div>
          )}

          {/* Change Password */}
          {activeTab === 'password' && (
            <div className="space-y-6 max-w-md">
              {['current', 'new', 'confirm'].map((field) => (
                <div key={field}>
                  <label className="block font-semibold mb-2 text-gray-700 capitalize">
                    {field === 'confirm' ? 'Confirm New Password' : `${field} Password`}
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords[field] ? 'text' : 'password'}
                      name={field}
                      value={password[field]}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPasswords[field] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={handlePasswordSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:to-orange-800 transition font-medium"
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>
              {passwordMessage.text && (
                <div className={`p-4 border rounded-lg mt-4 flex items-center gap-2 ${getMessageColor(passwordMessage.type)}`}>
                  {getMessageIcon(passwordMessage.type)}
                  {passwordMessage.text}
                </div>
              )}
            </div>
          )}

          {/* Reset Password */}
          {activeTab === 'reset' && (
            <div className="space-y-6 max-w-md">
              <label className="block font-semibold mb-2 text-gray-700">User Email Address</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter user's email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                onClick={handlePasswordReset}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:to-orange-800 transition font-medium"
              >
                <Mail className="w-4 h-4" />
                Send Reset Link
              </button>
              {resetMessage.text && (
                <div className={`p-4 border rounded-lg mt-4 flex items-center gap-2 ${getMessageColor(resetMessage.type)}`}>
                  {getMessageIcon(resetMessage.type)}
                  {resetMessage.text}
                </div>
              )}
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-xl">
              <div className="flex justify-between items-center">
                <label className="font-semibold">Two-Factor Authentication</label>
                <input
                  type="checkbox"
                  checked={securitySettings.twoFactorAuth}
                  onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-semibold">Login Notifications</label>
                <input
                  type="checkbox"
                  checked={securitySettings.loginNotifications}
                  onChange={(e) => handleSecurityChange('loginNotifications', e.target.checked)}
                />
              </div>
              <div>
                <label className="font-semibold">Session Timeout</label>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                  className="ml-3 px-4 py-2 border rounded-lg"
                >
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                  <option value="60">1 hr</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label className="font-semibold">Allow Multiple Sessions</label>
                <input
                  type="checkbox"
                  checked={securitySettings.allowMultipleSessions}
                  onChange={(e) => handleSecurityChange('allowMultipleSessions', e.target.checked)}
                />
              </div>
              <button
                onClick={handleSecuritySave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:to-orange-800 transition font-medium"
              >
                <Shield className="w-4 h-4" />
                Save Security Settings
              </button>
              {securitySaved && (
                <div className="p-4 mt-4 rounded-lg border bg-green-50 border-green-200 text-green-600 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Security settings saved successfully!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React from "react";
import { CheckCircle, Mail, Lock, User } from "lucide-react";

const VerificationSuccessNotification = ({
  isVisible,
  studentName,
  email,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        <div className="p-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            Verification Approved!
          </h3>

          {/* Student Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-900">{studentName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{email}</span>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-2 mb-6">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">
                Login credentials sent!
              </span>
            </div>
            <p className="text-sm text-gray-600">
              The student has been notified via email with their login
              credentials.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccessNotification;

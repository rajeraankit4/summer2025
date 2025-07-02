import React, { useState } from 'react';
import { User, ArrowRight, ArrowLeft, Home, Phone, Calendar, MapPin, GraduationCap, UtensilsCrossed } from 'lucide-react';

const PersonalDetails = ({ data, updateData, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    firstName: data.firstName || 'John',
    lastName: data.lastName || 'Doe',
    phone: data.phone || '(555) 123-4567',
    dateOfBirth: data.dateOfBirth || '2000-01-01',
    address: data.address || '123 Main Street',
    city: data.city || 'New York',
    state: data.state || 'NY',
    zipCode: data.zipCode || '10001',
    studentId: data.studentId || 'STU123456',
    hostelBlock: data.hostelBlock || 'A Block',
    roomNumber: data.roomNumber || '101',
    mealPlan: data.mealPlan || 'basic',
    dietaryRestrictions: data.dietaryRestrictions || ''
  });
  const [errors, setErrors] = useState({});

  const mealPlans = [
    { value: 'basic', label: 'Basic Plan - ₹3,000/month', description: 'Breakfast + Lunch + Dinner' },
    { value: 'premium', label: 'Premium Plan - ₹4,500/month', description: 'All meals + Evening snacks + Special dishes' },
    { value: 'weekend', label: 'Weekend Plan - ₹1,500/month', description: 'Saturday & Sunday meals only' },
    { value: 'custom', label: 'Custom Plan', description: 'Choose your own meal combinations' }
  ];

  const hostelBlocks = ['A Block', 'B Block', 'C Block', 'D Block', 'E Block', 'F Block', 'G Block', 'H Block'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.hostelBlock) newErrors.hostelBlock = 'Hostel block is required';
    if (!formData.roomNumber.trim()) newErrors.roomNumber = 'Room number is required';
    if (!formData.mealPlan) newErrors.mealPlan = 'Please select a meal plan';

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // ZIP code validation
    const zipRegex = /^\d{5,6}$/;
    if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    // Student ID validation
    if (formData.studentId && formData.studentId.length < 6) {
      newErrors.studentId = 'Student ID must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      updateData(formData);
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Personal Information */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 ${
                  errors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-orange-300'
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 ${
                  errors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-orange-300'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 ${
                    errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-orange-300'
                  }`}
                  placeholder="(555) 123-4567"
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 ${
                    errors.dateOfBirth ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-orange-300'
                  }`}
                />
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                  errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                placeholder="123 Main Street"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                  errors.city ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                placeholder="New York"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                  errors.state ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                placeholder="NY"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
              )}
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                  errors.zipCode ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                placeholder="10001"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Student & Hostel Information */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            Student & Hostel Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2">
                Student ID *
              </label>
              <input
                type="text"
                id="studentId"
                value={formData.studentId}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 ${
                  errors.studentId ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                }`}
                placeholder="STU123456"
              />
              {errors.studentId && (
                <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>
              )}
            </div>

            <div>
              <label htmlFor="hostelBlock" className="block text-sm font-semibold text-gray-700 mb-2">
                Hostel Block *
              </label>
              <select
                id="hostelBlock"
                value={formData.hostelBlock}
                onChange={(e) => handleInputChange('hostelBlock', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 ${
                  errors.hostelBlock ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <option value="">Select Block</option>
                {hostelBlocks.map(block => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>
              {errors.hostelBlock && (
                <p className="mt-1 text-sm text-red-600">{errors.hostelBlock}</p>
              )}
            </div>

            <div>
              <label htmlFor="roomNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Room Number *
              </label>
              <input
                type="text"
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 ${
                  errors.roomNumber ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                }`}
                placeholder="101"
              />
              {errors.roomNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.roomNumber}</p>
              )}
            </div>
          </div>
        </div>

       
       
      </div>

      <div className="flex justify-between mt-10">
        <button
          onClick={onPrev}
          className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>
        
        <button
          onClick={handleNext}
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Continue to Documents
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PersonalDetails = ({ data, updateData, onNext, onPrev }) => {
  const [PersonalDetails, setPersonalDetails] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstname: data?.firstName || "",
    lastname: data?.lastName || "",
    phone: data?.phone?.toString() || "",
    DOB: data?.dateOfBirth || "",
    address: data?.address || "",
    city: data?.city || "",
    state: data?.state || "",
    zipcode: data?.zipCode || "",
    studentid: data?.studentId || "",
    hostelblock: data?.hostelBlock || "",
    roomno: data?.roomNumber || "",
    button: "",
  });

  const handleNext = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }

      await axios.post(
        "http://localhost:5000/api/personaldetail/insert",
        formData
      );
      toast.success("Personal details saved successfully");

      const mappedData = {
        firstName: formData.firstname,
        lastName: formData.lastname,
        phone: formData.phone,
        dateOfBirth: formData.DOB,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipcode,
        studentId: formData.studentid,
        hostelBlock: formData.hostelblock,
        roomNumber: formData.roomno,
      };

      updateData(mappedData);
      setTimeout(() => {
        onNext();
      }, 100);
    } catch (error) {
      console.error("Error in handleNext:", error);
      toast.error("Failed to save data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "firstname",
      "lastname",
      "phone",
      "DOB",
      "address",
      "city",
      "state",
      "zipcode",
      "studentid",
      "hostelblock",
      "roomno",
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill out ${field} field.`);
        return false;
      }
    }

    // ✅ Strict 10-digit phone number validation
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }

    return true;
  };

  const getValue = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only digits, and limit to 10
      if (!/^\d{0,10}$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllpersonalDetails = () => {
    axios
      .get("http://localhost:5000/api/personaldetail/view")
      .then((res) => {
        if (res.data.status) {
          setPersonalDetails(res.data.personaldetailList);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    getAllpersonalDetails();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Personal Info Section */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-orange-600" />
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={getValue}
              className="w-full px-4 py-3 border-2 rounded-xl border-gray-200"
              placeholder="John"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={getValue}
              className="w-full px-4 py-3 border-2 rounded-xl border-gray-200"
              placeholder="Doe"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                
                onChange={getValue}
                maxLength={10}
                className="w-full px-4 py-3 pl-12 border-2 rounded-xl border-gray-200"
                placeholder="1234567890"
              />
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label htmlFor="DOB" className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
            <div className="relative">
              <input
                type="date"
                name="DOB"
                value={formData.DOB}
                onChange={getValue}
                className="w-full px-4 py-3 pl-12 border-2 rounded-xl border-gray-200"
              />
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Address Info Section */}
      <br />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
            <input
              name="address"
              value={formData.address}
              onChange={getValue}
              className="w-full px-4 py-3 border-2 rounded-xl border-gray-200"
              placeholder="123 Main Street"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
            <input
              name="city"
              value={formData.city}
              onChange={getValue}
              className="w-full px-4 py-3 border-2 rounded-xl border-gray-200"
              placeholder="New York"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
            <input
              name="state"
              value={formData.state}
              onChange={getValue}
              className="w-full px-4 py-3 border-2 rounded-xl border-gray-200"
              placeholder="NY"
            />
          </div>
          <div>
            <label htmlFor="zipcode" className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code *</label>
            <input
              name="zipcode"
              value={formData.zipcode}
              onChange={getValue}
              className="w-full px-4 py-3 border-2 rounded-xl border-gray-200"
              placeholder="10001"
            />
          </div>
        </div>
      </div>

      {/* Hostel Info Section */}
      <br />
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-purple-600" />
          Student & Hostel Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="studentid" className="block text-sm font-semibold text-gray-700 mb-2">Student ID *</label>
            <input
              name="studentid"
              value={formData.studentid}
              onChange={getValue}
              className="w-full px-4 py-3 border-2 rounded-xl border-gray-200"
              placeholder="STU123456"
            />
          </div>
          <div>
            <label htmlFor="hostelblock" className="block text-sm font-semibold text-gray-700 mb-2">Hostel Block *</label>
            <input
              name="hostelblock"
              value={formData.hostelblock}
              onChange={getValue}
              className="w-full px-4 py-3 border-2 rounded-xl border-gray-200"
              placeholder="Block-A"
            />
          </div>
          <div>
            <label htmlFor="roomno" className="block text-sm font-semibold text-gray-700 mb-2">Room Number *</label>
            <input
              name="roomno"
              value={formData.roomno}
              onChange={getValue}
              className="w-full px-4 py-3 border-2 rounded-xl border-gray-200"
              placeholder="101"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={onPrev}
          className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className={`px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold flex items-center gap-3 shadow-lg transition duration-300 transform hover:scale-105 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-orange-600 hover:to-amber-600"
          }`}
        >
          {isSubmitting ? "Saving..." : "Continue to Documents"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Show Saved Data */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Saved Personal Details:</h2>
        <ul className="space-y-2">
          {PersonalDetails.map((detail, index) => (
            <li key={index} className="p-3 border rounded shadow-sm bg-white">
              <strong>{detail.firstname} {detail.lastname}</strong> — {detail.phone}, DOB: {detail.DOB} — {detail.address}, {detail.city}, {detail.state}, {detail.zipcode}, {detail.studentid}, {detail.hostelblock}, {detail.roomno}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonalDetails;

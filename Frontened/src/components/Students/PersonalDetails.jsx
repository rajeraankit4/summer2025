import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User,  Home, Phone, Calendar, MapPin, GraduationCap, UtensilsCrossed } from 'lucide-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PersonalDetails = ({ data, updateData, onNext, onPrev }) => {
  const [PersonalDetails, setPersonalDetails] = useState([]);

  const [formData, setFormData] = useState( data ||{ 
    firstname: '',
    lastname: '',
    phone: '',
    DOB: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    studentid:'',
    hostelblock:'',
    roomno: '', 
    button:''
   
  });

 

 const handleNext = async () => {
  try {
    await axios.post('http://localhost:5000/api/personaldetail/insert', formData);
    toast.success('Enquiry Saved Successfully');

    updateData(formData);
    onNext();
  } catch (error) {
    console.error(error);
    toast.error('Failed to save data');
  }
};

const validateForm = () => {
  const requiredFields = [
    'firstname', 'lastname', 'phone', 'DOB',
    'address', 'city', 'state', 'zipcode',
    'studentid', 'hostelblock', 'roomno'
  ];

  for (let field of requiredFields) {
    if (!formData[field] || formData[field].trim() === '') {
      toast.error(`Please fill out ${field} field.`);
      return false;
    }
  }

  return true;
};


  // ✅ Function to get form values
  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save data to backend
  const savepersonalDetails = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/personaldetail/insert', formData)
      .then((res) => {
        console.log(res.data);
        toast.success('Enquiry Saved Successfully');

        // ✅ Reset form
        setFormData({
          firstname: '',
          lastname: '',
          phone: '',
          DOB: '',
           address: '',
            city: '',
             state: '',
            zipcode: '',
            studentid:'',
            hostelblock:'',
            roomno:'',
            button:''
           
        });

        getAllpersonalDetails(); // refresh list
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to save data');
      });
  };

  // ✅ Get all data from backend
  const getAllpersonalDetails = () => {
    axios
      .get('http://localhost:5000/api/personaldetail/view') // ✅ FIXED URL
      .then((res) => {
        if (res.data.status) {
          setPersonalDetails(res.data.personaldetailList); // ✅ Use correct key
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  };

  useEffect(() => {
    getAllpersonalDetails();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={savepersonalDetails}>
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstname" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                value={formData.firstname}
                onChange={getValue}
                type="text"
                id="firstname"
                name="firstname"
                className="w-full px-4 py-3 border-2 rounded-xl border-gray-200 focus:ring-orange-200 focus:border-orange-500"
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastname" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                value={formData.lastname}
                onChange={getValue}
                type="text"
                id="lastname"
                name="lastname"
                className="w-full px-4 py-3 border-2 rounded-xl border-gray-200 focus:ring-orange-200 focus:border-orange-500"
                placeholder="Doe"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone *
              </label>
              <div className="relative">
                <input
                  value={formData.phone}
                  onChange={getValue}
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 pl-12 border-2 rounded-xl border-gray-200 focus:ring-orange-200 focus:border-orange-500"
                  placeholder="1234567890"
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* DOB */}
            <div>
              <label htmlFor="DOB" className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth *
              </label>
              <div className="relative">
                <input
                  value={formData.DOB}
                  onChange={getValue}
                  type="date"
                  id="DOB"
                  name="DOB"
                  className="w-full px-4 py-3 pl-12 border-2 rounded-xl border-gray-200 focus:ring-orange-200 focus:border-orange-500"
                />
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>




            {/* Add more fields like address, city etc. below as needed */}
          </div>
        </div>

        
      <br />
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
               value={formData.address}
                onChange={getValue}
                type="text"
                id="address"
                name='address'
               
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 
                   'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                placeholder="123 Main Street"
              />
            
                <p className="mt-1 text-sm text-red-600"></p>
            
            </div>

              <div>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
               value={formData.city}
                onChange={getValue}
                type="text"
                id="city"
                name='city'
               
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300
                 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                placeholder="New York"
              />
              
                <p className="mt-1 text-sm text-red-600"></p>
            
          </div>

          <div>
              <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                State *
              </label>
              <input
               value={formData.state}
                onChange={getValue}
                type="text"
                id="state"
                name='state'
               
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 
                 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                placeholder="NY"
              />
             
                <p className="mt-1 text-sm text-red-600"></p>


                   <div>
              <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
               value={formData.zipcode}
                onChange={getValue}
                type="text"
                id="zipcode"
                name='zipcode'

               
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 
                  'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                placeholder="10001"
              />
             
                <p className="mt-1 text-sm text-red-600"></p>
             
            </div>

              
            </div>

       </div>
            </div>
            <br />

             
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
               value={formData.studentid}
                onChange={getValue}
                type="text"
                id="studentid"
                name='studentid'
               
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 
                  'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                }`}
                placeholder="STU123456"
              />
             
                <p className="mt-1 text-sm text-red-600"></p>
              
            </div>

              <div>
              <label htmlFor="hostelBlock" className="block text-sm font-semibold text-gray-700 mb-2">
                Hostel Block *
              </label>
              <input
               value={formData.hostelblock}
                onChange={getValue}
                type="text"
                id="hostelblock"
                name='hostelblock'
               
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 
                  'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                }`}
                placeholder="block-4"
              />
             
                <p className="mt-1 text-sm text-red-600"></p>
              
            </div>

              

                 <div>
              <label htmlFor="roomNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Room Number *
              </label>
              <input
               value={formData.roomno}
                onChange={getValue}
                type="text"
                id="roomno"
                name='roomno'
                
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 
                  'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                }`}
                placeholder="101"
              />
              
                <p className="mt-1 text-sm text-red-600"></p>
             
            </div>
            </div>
                
    </div>


 <div className="flex justify-between mt-10">
       



               <button
                        type="button"
                        onClick={onPrev}
                        className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Previous
                      </button>
              
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Continue to Documents
                        <ArrowRight className="w-5 h-5" />
                      </button> 



      </div>
    </form>

          


       


       

      {/* Show Data */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Saved Personal Details:</h2>
        <ul className="space-y-2">
          {PersonalDetails.map((detail, index) => (
            <li key={index} className="p-3 border rounded shadow-sm bg-white">
              <strong>{detail.firstname} {detail.lastname}</strong> — {detail.phone}, DOB: {detail.DOB}- address:   {detail.address}-{detail.city}- {detail.state}-{detail.zipcode}-{detail.studentid}-{detail.hostelblock}-{detail.roomno}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonalDetails;
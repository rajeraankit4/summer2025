import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalDetails = () => {
  const [PersonalDetails, setPersonalDetails] = useState([]);
  const [statusList, setStatusList] = useState([]); // NEW status state

  const getAllpersonalDetails = () => {
    axios
      .get('http://localhost:5000/api/personaldetail/view')
      .then((res) => {
        if (res.data.status) {
          setPersonalDetails(res.data.personaldetailList);
          setStatusList(res.data.personaldetailList.map(() => 'No')); // initialize all to No
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  };

  useEffect(() => {
    getAllpersonalDetails();
  }, []);

  const handleVerify = (index) => {
    const updatedStatus = [...statusList];
    updatedStatus[index] = 'Yes';
    setStatusList(updatedStatus);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800">🎓 Student Management</h1>

        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="max-h-[500px] overflow-y-auto overflow-x-auto rounded-lg shadow bg-white">
  <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">DOB</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Room</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {PersonalDetails.map((detail, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {detail.firstname} {detail.lastname}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{detail.DOB}</td>
                  <td className="px-6 py-4 text-gray-600">{detail.phone}</td>
                  <td className="px-6 py-4">{detail.roomno}</td>

                  {/* Show Status */}
                <td className={`px-6 py-4 font-semibold ${statusList[index] === 'Yes' ? 'text-green-500' : 'text-red-500'}`}>
  {statusList[index] === 'Yes' ? 'Yes' : 'No'}
</td>


                  {/* Action */}
                  <td className="px-6 py-4">
                    {statusList[index] === 'No' ? (
                      <button 
                        onClick={() => handleVerify(index)}
                        className="text-red-500 hover:underline cursor-pointer"
                      >
                        Verify
                      </button>
                    ) : (
                      <span className="text-green-500 font-semibold">Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;

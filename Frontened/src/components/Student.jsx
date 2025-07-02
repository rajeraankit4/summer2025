import React, { useState, useEffect } from 'react';
import { CheckCircle, Search, XCircle } from 'lucide-react';
import axios from '../api/axiosConfig';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };

    fetchStudents();
  }, []);

  const handleVerify = async (id) => {
    try {
      await axios.put(`/api/students/${id}/verify`);
      setStudents(students.map(s => s._id === id ? { ...s, isVerified: true } : s));
    } catch (err) {
      console.error('Failed to verify student:', err);
    }
  };

  const filteredStudents = students.filter((student) =>
    (student.firstName + ' ' + student.lastName).toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800">🎓 Student Management</h1>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="overflow-auto rounded-lg shadow bg-white">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Room</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{student.firstName} {student.lastName}</td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-gray-600">{student.hostelBlock}-{student.roomNumber}</td>
                  <td className="px-6 py-4">
                    {student.isVerified ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                        <CheckCircle className="w-4 h-4" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full">
                        <XCircle className="w-4 h-4" /> Not Verified
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {!student.isVerified && (
                      <button onClick={() => handleVerify(student._id)} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-all">
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
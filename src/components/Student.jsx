import React, { useState } from 'react';
import { CheckCircle, Search, XCircle } from 'lucide-react';

const dummyStudents = [
  { id: 1, name: 'Aman Sharma', email: 'aman@hostel.com', room: 'B-102', verified: true },
  { id: 2, name: 'Purav Patel', email: 'purav@hostel.com', room: 'C-204', verified: false },
  { id: 3, name: 'Ravi Kumar', email: 'ravi@hostel.com', room: 'A-309', verified: false },
  { id: 4, name: 'Raj Sharma', email: 'raj@hostel.com', room: 'B-106', verified: true },
  { id: 5, name: 'Shivam Patel', email: 'shivam@hostel.com', room: 'C-202', verified: false },
];

export default function Students() {
  const [search, setSearch] = useState('');

  const filteredStudents = dummyStudents.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
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

      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full table-auto border-collapse bg-white">
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
                  key={student.id}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-gray-600">{student.room}</td>
                  <td className="px-6 py-4">
                    {student.verified ? (
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
                    {!student.verified && (
                      <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-all">
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
}

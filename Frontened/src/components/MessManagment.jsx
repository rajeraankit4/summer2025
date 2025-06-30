// src/pages/admin/MessManagement.jsx
import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

export default function MessManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [staffList, setStaffList] = useState([
    { name: 'Naman', mobile: '654654', date: '23 May 2024' },
    { name: 'Chintu', mobile: '654654', date: '23 Aug 2024' },
    { name: 'Akhil', mobile: '654654', date: '15 Jan 2025' },
  ]);

  const [editedList, setEditedList] = useState([...staffList]);

  const handleChange = (index, field, value) => {
    const updatedList = [...editedList];
    updatedList[index][field] = value;
    setEditedList(updatedList);
  };

  const handleSave = () => {
    setStaffList(editedList);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedList(staffList);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">🍽️ Mess Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="bg-white px-4 py-1 rounded-full text-black font-bold text-lg border border-black">
          Authorised Mess Staff
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 font-semibold text-black hover:underline"
          >
            <Pencil size={20} />
            Edit List
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <table className="w-full text-center border border-black">
        <thead className="bg-white">
          <tr>
            <th className="border border-black py-2 px-4">Name</th>
            <th className="border border-black py-2 px-4">Mobile no</th>
            <th className="border border-black py-2 px-4">Date of authorization</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {(isEditing ? editedList : staffList).map((staff, index) => (
            <tr key={index}>
              <td className="border border-black font-bold py-2 px-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={staff.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                ) : (
                  staff.name
                )}
              </td>
              <td className="border border-black font-bold py-2 px-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={staff.mobile}
                    onChange={(e) => handleChange(index, 'mobile', e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                ) : (
                  staff.mobile
                )}
              </td>
              <td className="border border-black font-bold py-2 px-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={staff.date}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                ) : (
                  staff.date
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

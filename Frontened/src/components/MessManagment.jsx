import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import axios from '../api/axiosConfig';

export default function MessManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [editedList, setEditedList] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", mobile: "", date: "" , email: ""});

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get('/mess-staff');
        setStaffList(res.data);
        setEditedList(res.data);
      } catch (err) {
        console.error('Failed to fetch mess staff:', err);
      }
    };
    fetchStaff();
  }, []);

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.mobile || !newStaff.date || !newStaff.email) return;
    const updatedList = [...editedList, newStaff];
    setEditedList(updatedList);
    setNewStaff({ name: "", mobile: "", date: "", email: "" });
  };

  const handleChange = (index, field, value) => {
    const updatedList = [...editedList];
    updatedList[index][field] = value;
    setEditedList(updatedList);
  };

  const handleSave = async () => {
  try {
    const sanitizedList = editedList.map((staff) => ({
      ...staff,
      date: new Date(staff.date),
    }));
    console.log("Sending this list to backend:", sanitizedList);
   
    const response = await axios.put('/mess-staff', sanitizedList);



    setStaffList(response.data);
    setEditedList(response.data);
    setIsEditing(false);
  } catch (err) {
console.error('Failed to update mess staff. Full error response:', err.response);  }
};


  const handleCancel = () => {
    setEditedList(staffList);
    setIsEditing(false);
    setNewStaff({ name: "", mobile: "", email: "", date: "" });
  };
  const handleDelete = (index) => {
    const updatedList = [...editedList];
    updatedList.splice(index, 1);
    setEditedList(updatedList);
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

      {/* Add new staff form */}
      {isEditing && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-semibold mb-2">+ Authorize New Staff</h3>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Name"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="border px-2 py-1"
            />
            <input
              type="text"
              placeholder="Mobile"
              value={newStaff.mobile}
              onChange={(e) => setNewStaff({ ...newStaff, mobile: e.target.value })}
              className="border px-2 py-1"
            />
            <input
              type="date"
              placeholder="Date"
              value={newStaff.date}
              onChange={(e) => setNewStaff({ ...newStaff, date: e.target.value })}
              className="border px-2 py-1"
            />
            <input
              type="email"
              placeholder="Email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              className="border px-2 py-1"
            />
          </div>
          <button
            onClick={handleAddStaff}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add to List
          </button>
        </div>
      )}

      {/* Table */}
      <table className="w-full text-center border border-black">
        <thead className="bg-white">
          <tr>
            <th className="border border-black py-2 px-4">Name</th>
            <th className="border border-black py-2 px-4">Mobile no</th>
            <th className="border border-black py-2 px-4">Date of authorization</th>
            <th className="border border-black py-2 px-4">Email</th>
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
                    type="date"
                    value={staff.date?.slice(0, 10)}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                ) : (
                  new Date(staff.date).toLocaleDateString()
                )}
              </td>
              <td className="border border-black font-bold py-2 px-4 relative">
  {isEditing ? (
    <div className="flex items-center gap-2">
      <input
        type="email"
        value={staff.email}
        onChange={(e) => handleChange(index, 'email', e.target.value)}
        className="border px-2 py-1 w-full"
      />
      <button
        onClick={() => handleDelete(index)}
        className="text-red-600 text-xl font-bold hover:text-red-800"
        title="Delete"
      >
        ✕
      </button>
    </div>
  ) : (
    staff.email
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


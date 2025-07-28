// frontend/src/components/MessManagement.jsx
import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Save, XCircle } from 'lucide-react';
import axios from '../api/axiosConfig';

export default function MessManagement() {
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', mobile: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get('/mess-staff');
      setStaffList(res.data);
    } catch (err) {
      console.error('Failed to fetch mess staff:', err);
    }
  };

  const handleNewStaffChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/mess-staff', newStaff);
      setStaffList([...staffList, res.data]);
    
      setNewStaff({ name: '', mobile: '', email: '' });
    } catch (err) {
      console.error('Failed to add mess staff:', err);
      alert(err.response?.data?.error || 'Failed to add member. Please check the console.');
    }
  };

  const handleEditClick = (staff) => {
    setEditingId(staff._id);
  
    setEditedData({ name: staff.name, mobile: staff.mobile, email: staff.email });
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.put(`/mess-staff/${id}`, editedData);
      setStaffList(staffList.map(staff => (staff._id === id ? res.data : staff)));
      setEditingId(null);
    } catch (err) {
      console.error('Failed to update mess staff:', err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await axios.delete(`/mess-staff/${id}`);
        setStaffList(staffList.filter(staff => staff._id !== id));
      } catch (err) {
        console.error('Failed to delete mess staff:', err);
      }
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">🍽️ Mess Management</h1>

      <div className="bg-white p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl font-bold mb-3">Add New Mess Staff</h2>
       
        <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <input
            type="text" name="name" value={newStaff.name} onChange={handleNewStaffChange}
            placeholder="Name" className="border px-3 py-2 rounded w-full" required
          />
          <input
            type="text" name="mobile" value={newStaff.mobile} onChange={handleNewStaffChange}
            placeholder="Mobile No" className="border px-3 py-2 rounded w-full" required
          />
          <input
            type="email" name="email" value={newStaff.email} onChange={handleNewStaffChange}
            placeholder="Email" className="border px-3 py-2 rounded w-full" required
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full md:w-auto">
            Add Member
          </button>
        </form>
      </div>

      <div className="bg-white px-4 py-2 rounded-full text-black font-bold text-lg border border-black mb-4 inline-block">
        Authorised Mess Staff
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-center border border-black bg-white">
          <thead>
            <tr>
              <th className="border border-black py-2 px-4">Name</th>
              <th className="border border-black py-2 px-4">Mobile No</th>
           
              <th className="border border-black py-2 px-4">Email</th>
              <th className="border border-black py-2 px-4">Date of Authorization</th>
              <th className="border border-black py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff._id}>
                {editingId === staff._id ? (
                  <>
                    <td className="border border-black p-2"><input type="text" name="name" value={editedData.name} onChange={handleEditChange} className="border px-2 py-1 w-full"/></td>
                    <td className="border border-black p-2"><input type="text" name="mobile" value={editedData.mobile} onChange={handleEditChange} className="border px-2 py-1 w-full"/></td>
               
                    <td className="border border-black p-2"><input type="email" name="email" value={editedData.email} onChange={handleEditChange} className="border px-2 py-1 w-full"/></td>
                    <td className="border border-black p-2 font-mono text-sm">{new Date(staff.dateOfAuthorization).toLocaleDateString()}</td>
                    <td className="border border-black p-2">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleSave(staff._id)} className="text-green-600 hover:text-green-800"><Save size={20} /></button>
                        <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800"><XCircle size={20} /></button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-black font-semibold py-2 px-4">{staff.name}</td>
                    <td className="border border-black py-2 px-4">{staff.mobile}</td>
                  
                    <td className="border border-black py-2 px-4">{staff.email}</td>
                  
                    <td className="border border-black py-2 px-4 font-mono text-sm">{new Date(staff.dateOfAuthorization).toLocaleDateString()}</td>
                    <td className="border border-black py-2 px-4">
                      <div className="flex gap-4 justify-center">
                        <button onClick={() => handleEditClick(staff)} className="text-blue-600 hover:text-blue-800"><Pencil size={20} /></button>
                        <button onClick={() => handleDelete(staff._id)} className="text-red-600 hover:text-red-800"><Trash2 size={20} /></button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
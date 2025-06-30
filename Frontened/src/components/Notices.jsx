import React, { useState } from 'react';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([
    { text: 'hostel fee payment...', date: '18 Jun 4:10 PM' },
    { text: 'Mess Annual Function on 18 May 2025...', date: '12 May 9:16 PM' },
  ]);
  const [newNotice, setNewNotice] = useState('');

  const handleAddNotice = () => {
    if (newNotice.trim() !== '') {
      const now = new Date();
      const formattedDate = now.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setNotices([{ text: newNotice, date: formattedDate }, ...notices]);
      setNewNotice('');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Notice Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">📢 Notice</h1>
          <button
            onClick={handleAddNotice}
            className="text-blue-600 font-semibold underline"
          >
            Add Notice
          </button>
        </div>
        {/* Input Box */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter new notice..."
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>
        {/* Notice List */}
        <div className="space-y-3">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="bg-orange-400 text-black p-4 rounded shadow"
            >
              <p className="font-medium">{notice.text}</p>
              <p className="text-sm text-right mt-2 font-semibold">{notice.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-10 p-6 bg-orange-100 rounded-lg shadow-md text-orange-700">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="flex items-center gap-2 mb-2">
          📍 123 Anywhere St., Any City, ST 12345
        </p>
        <p className="flex items-center gap-2 mb-2">
          📞 123-456-7890
        </p>
        <p className="flex items-center gap-2">
          📧 hello@reallygreatsite.com
        </p>
      </div>
    </div>
  );
};

export default NoticeBoard;

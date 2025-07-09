import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const PersonalDetails = () => {
  const [PersonalDetails, setPersonalDetails] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDocuments, setShowDocuments] = useState(false);

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

  const handleVerifyDocuments = async (studentId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/personaldetail/verify-documents/${studentId}`,
        {
          status,
        }
      );

      toast.success(`Documents ${status} successfully`);
      getAllpersonalDetails(); // Refresh data
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to update verification status");
    }
  };

  const viewDocuments = (student) => {
    setSelectedStudent(student);
    setShowDocuments(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🎓 Student Management
        </h1>

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
                <th className="px-6 py-4">Documents</th>
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

                  {/* Documents Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">
                        {detail.documents?.length || 0} files
                      </span>
                      {detail.documents?.length > 0 && (
                        <button
                          onClick={() => viewDocuments(detail)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(detail.verificationStatus)}
                      <span className="text-sm capitalize">
                        {detail.verificationStatus || "pending"}
                      </span>
                    </div>
                  </td>

                  {/* Action Column */}
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {detail.documents?.length > 0 &&
                        detail.verificationStatus === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleVerifyDocuments(
                                  detail.studentid,
                                  "approved"
                                )
                              }
                              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleVerifyDocuments(
                                  detail.studentid,
                                  "rejected"
                                )
                              }
                              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Document Viewer Modal */}
        {showDocuments && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Documents - {selectedStudent.firstname}{" "}
                  {selectedStudent.lastname}
                </h3>
                <button
                  onClick={() => setShowDocuments(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedStudent.documents?.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold capitalize">{doc.type}</h4>
                      <a
                        href={`http://localhost:5000/${doc.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {doc.originalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;

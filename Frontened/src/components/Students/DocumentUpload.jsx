import React, { useState } from 'react';
import {
  Upload, FileText, Image, X, Check, ArrowLeft,
  UtensilsCrossed, GraduationCap, CreditCard
} from 'lucide-react';

const DocumentUpload = ({ data, updateData, onPrev }) => {
  const [documents, setDocuments] = useState(data.documents || []);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const acceptedFileTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif'
  ];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const requiredDocuments = [
    {
      title: 'Student ID Card',
      description: 'Clear photo of your student identification card',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Hostel Allotment Letter',
      description: 'Official hostel room allotment document',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Fee Payment Receipt',
      description: 'Proof of mess/canteen fee payment',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      if (!acceptedFileTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported`);
        return false;
      }
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    const newDocuments = [...documents, ...validFiles];
    setDocuments(newDocuments);
    updateData({ documents: newDocuments });
  };

  const removeDocument = (index) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    setDocuments(newDocuments);
    updateData({ documents: newDocuments });
  };

  const getFileIcon = (type) =>
    type === 'application/pdf' ? (
      <FileText className="w-8 h-8 text-red-500" />
    ) : (
      <Image className="w-8 h-8 text-orange-500" />
    );

  const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const handleSubmit = () => {
    if (documents.length === 0) {
      alert('Please upload at least one document');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">🎉 Welcome to FoodieHub!</h2>
        <p className="text-xl text-gray-600 mb-8">
          Your registration is complete! Get ready for an amazing dining experience.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <div className="flex items-center gap-2 text-orange-600">
            <UtensilsCrossed className="w-5 h-5" />
            <span className="font-semibold">Fresh Meals Daily</span>
          </div>
          <div className="flex items-center gap-2 text-amber-600">
            <span className="text-2xl">⭐</span>
            <span className="font-semibold">Premium Quality</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Upload Required Documents</h2>
        <p className="text-lg text-gray-600">Upload your documents to complete the registration process</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {requiredDocuments.map((doc, i) => {
          const Icon = doc.icon;
          return (
            <div key={i} className={`${doc.bgColor} border rounded-2xl p-6 text-center`}>
              <div className={`w-16 h-16 ${doc.bgColor} rounded-xl mx-auto mb-4 flex justify-center items-center`}>
                <Icon className={`w-8 h-8 ${doc.color}`} />
              </div>
              <h3 className="font-bold text-gray-900">{doc.title}</h3>
              <p className="text-sm text-gray-600">{doc.description}</p>
            </div>
          );
        })}
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center ${
          dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
        }`}
      >
        <Upload className="w-10 h-10 text-orange-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Drop files here or{' '}
          <label className="text-orange-600 font-bold underline cursor-pointer">
            browse
            <input type="file" multiple onChange={handleChange} className="hidden" accept=".pdf,.jpg,.jpeg,.png,.gif" />
          </label>
        </h3>
        <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG, GIF | Max size: 10MB each</p>
      </div>

      {documents.length > 0 && (
        <div className="mt-10">
          <h4 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" /> Uploaded Documents ({documents.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-orange-50 border rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
                    {getFileIcon(doc.type)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 truncate max-w-48">{doc.name}</p>
                    <p className="text-xs text-gray-600">{formatFileSize(doc.size)}</p>
                  </div>
                </div>
                <button onClick={() => removeDocument(idx)} className="hover:text-red-600 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-12">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
        >
          <ArrowLeft className="w-4 h-4 inline-block mr-2" />
          Previous
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || documents.length === 0}
          className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Complete Registration'}
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;

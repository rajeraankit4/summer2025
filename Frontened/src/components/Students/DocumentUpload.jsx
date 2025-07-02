import React, { useState } from 'react';
import { Upload, FileText, Image, X, Check, ArrowLeft, UtensilsCrossed, GraduationCap, CreditCard } from 'lucide-react';
const DocumentUpload = ({ data, updateData, onPrev }) => {
  const [documents, setDocuments] = useState(data.documents || [
    { name: 'student_id_card.jpg', size: 102400, type: 'image/jpeg' },
    { name: 'hostel_allotment_letter.pdf', size: 204800, type: 'application/pdf' },
    { name: 'fee_payment_receipt.png', size: 51200, type: 'image/png' },
  ]);
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
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
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
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
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

  const getFileIcon = (fileType) => {
    if (fileType === 'application/pdf') {
      return <FileText className="w-8 h-8 text-red-500" />;
    }
    return <Image className="w-8 h-8 text-orange-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async () => {
    if (documents.length === 0) {
      alert('Please upload at least one document');
      return;
    }

    setIsSubmitting(true);

    // Mock submission delay
    setTimeout(() => {
      setIsComplete(true);
      setIsSubmitting(false);
    }, 1500);

    // Commented out actual API call
    /*
    const formData = new FormData();
    for (const key in data) {
      if (key !== 'documents') {
        formData.append(key, data[key]);
      }
    }
    documents.forEach((doc) => {
      formData.append('documents', doc);
    });

    try {
      const res = await axios.post('/api/auth/complete-signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.message) {
        setIsComplete(true);
      }
    } catch (err) {
      console.error('Signup completion failed:', err.response?.data || err);
      alert(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <Check className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-900 mb-4">🎉 Welcome to FoodieHub!</h2>
        <p className="text-xl text-gray-600 mb-8">
          Your registration is complete! Get ready for an amazing dining experience.
        </p>
        
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-orange-800 mb-4">🍽️ What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800">Account Activation</h4>
                <p className="text-orange-700 text-sm">Your account will be activated within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800">Meal Card Collection</h4>
                <p className="text-orange-700 text-sm">Collect your meal card from the mess office</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800">App Access</h4>
                <p className="text-orange-700 text-sm">Download our mobile app for easy ordering</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800">Start Dining!</h4>
                <p className="text-orange-700 text-sm">Enjoy delicious meals and exclusive offers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <p className="text-green-800 text-lg">
            <strong>📧 Confirmation sent to:</strong><br />
            <span className="text-2xl font-mono">{data.email}</span>
          </p>
          <p className="text-green-700 text-sm mt-2">
            Check your email for login credentials and next steps
          </p>
        </div>

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
        <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Upload Required Documents</h2>
        <p className="text-lg text-gray-600">Upload your documents to complete the registration process</p>
      </div>

      <div className="space-y-8">
        {/* Required Documents Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requiredDocuments.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <div key={index} className={`${doc.bgColor} border-2 border-opacity-20 rounded-2xl p-6 text-center`}>
                <div className={`w-16 h-16 ${doc.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className={`w-8 h-8 ${doc.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{doc.title}</h3>
                <p className="text-sm text-gray-600">{doc.description}</p>
              </div>
            );
          })}
        </div>

        {/* Upload Area */}
        <div
          className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 scale-105'
              : 'border-gray-300 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-amber-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Drop your files here, or''
            <label className="text-orange-600 hover:text-orange-700 cursor-pointer font-bold underline decoration-2 underline-offset-2">
              browse files
              <input
                type="file"
                multiple
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png,.gif"
                className="hidden"
              />
            </label>
          </h3>
          <p className="text-lg text-gray-600 mb-4">
            Support for PDF, JPG, PNG, GIF up to 10MB each
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">PDF</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">JPG</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">PNG</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">GIF</span>
          </div>
        </div>

        {/* Document List */}
        {documents.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-orange-600" />
              Uploaded Documents ({documents.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-100 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                      {getFileIcon(doc.type)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 truncate max-w-48">{doc.name}</p>
                      <p className="text-sm text-gray-600">{formatFileSize(doc.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDocument(index)}
                    className="p-3 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Guidelines */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-900 mb-4 text-lg">📋 Upload Guidelines:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <ul className="space-y-2">
              <li>• Clear, readable documents only</li>
              <li>• Maximum file size: 10MB per file</li>
              <li>• Accepted formats: PDF, JPG, PNG, GIF</li>
            </ul>
            <ul className="space-y-2">
              <li>• Ensure all text is visible</li>
              <li>• No blurry or damaged documents</li>
              <li>• Upload original documents only</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button
          onClick={onPrev}
          className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || documents.length === 0}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-semibold flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              Processing Registration...
            </>
          ) : (
            <>
              Complete Registration
              <Check className="w-6 h-6" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
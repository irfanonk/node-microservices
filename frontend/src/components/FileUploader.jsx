import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { baseUrl } from '../config';

export default function FileUploader() {
    
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'image') {
      setImageFile(file);
    } else {
      setPdfFile(file);
    }
  };

  const uploadFile = async (file, type) => {
    if (!file) {
      setStatus({ type: 'error', message: 'Please select a file first' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${baseUrl}/file/upload/${type}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setStatus({ type: 'success', message: `File uploaded successfully: ${data.filename}` });
      
      // Clear the file input
      if (type === 'image') {
        setImageFile(null);
      } else {
        setPdfFile(null);
      }
    } catch (error) {
        console.log('error', error);
        
      setStatus({ type: 'error', message: 'Error uploading file' });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">File Upload Demo</h1>
            {/* Status Message */}
            {status.message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${
          status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {status.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {status.message}
        </div>
      )}
      {/* Image Upload Section */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'image')}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <button
            onClick={() => uploadFile(imageFile, 'image')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </button>
        </div>
      </div>

      {/* PDF Upload Section */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'pdf')}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <button
            onClick={() => uploadFile(pdfFile, 'pdf')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="w-4 h-4" />
            Upload PDF
          </button>
        </div>
      </div>


    </div>
  );
}
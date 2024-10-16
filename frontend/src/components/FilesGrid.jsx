// src/components/FilesGrid.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilesGrid = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/files');
      setFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:8000/api/files', formData);
      fetchFiles(); // Refresh the list after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Files Management</h2>

      <div className="mb-6">
        <input type="file" onChange={handleFileChange} className="form-input" />
        <button
          onClick={uploadFile}
          className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.length === 0 ? (
          <p>No files found</p>
        ) : (
          files.map((file, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow-md">
              <p className="text-gray-800">{file}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilesGrid;

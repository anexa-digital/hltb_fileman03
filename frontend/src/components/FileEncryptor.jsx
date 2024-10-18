// src/components/FileEncryptor.jsx

import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const FileEncryptor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEncryptAndUpload = async () => {
    if (!selectedFile || !password) {
      return;
    }

    // Read file as text
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;

      // Encrypt file content using the password
      const encryptedContent = CryptoJS.AES.encrypt(fileContent, password).toString();

      // Create a Blob with the encrypted content
      const blob = new Blob([encryptedContent], { type: 'text/plain' });

      // Upload encrypted file to backend
      const formData = new FormData();
      formData.append('file', blob, `${selectedFile.name}.enc`);

      fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File uploaded:', data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    };

    reader.readAsText(selectedFile);
  };

  return (
    <div className="file-encryptor">
      <h2>Encrypt and Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <input
        type="password"
        placeholder="Enter encryption password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleEncryptAndUpload}>Encrypt and Upload</button>
    </div>
  );
};

export default FileEncryptor;

// src/components/FilesGrid.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

let BASE_URL = "http://localhost:8000";
try {
  BASE_URL = process.env.REACT_APP_BASE_URL;
  BASE_URL = "https://ws-ponal.heliteb.co";
  console.log('Production ENV')
} catch (error) {
    console.log('Development ENV')
}
console.log(BASE_URL);

const FilesGrid = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session or authentication-related data
    localStorage.removeItem('authToken'); // Example: Remove auth token
    navigate('/'); // Redirect to login page
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  



    const getAuthToken = () => {
      return localStorage.getItem('authToken');
    };

    const fetchFiles = async () => {
      try {
        const token = getAuthToken();

        const response = await axios.get(`${BASE_URL}/api/files`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setFiles(response.data.files || []);
      } catch (error) {
        const _err = 'Error leyendo archivos';
        console.error(_err, error);
        alert(_err);
      }
    };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert('Seleccione un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = getAuthToken();

      await axios.post(`${BASE_URL}/api/files`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchFiles(); // Refresh the list after upload
    } catch (error) {
      const _err = 'Error cargando archivos';
      console.error(_err, error);
      alert(_err);
    }
  };

  const removeFile = async (fileName) => {
    try {
      const token = getAuthToken();

      await axios.delete(`${BASE_URL}/api/files/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchFiles(); // Refresh the list after deletion
    } catch (error) {
      const _err = 'Error removiendo archivos';
      console.error(_err, error);
      alert(_err);
    }
  };




  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Gestión de Archivos</h2>

      <div className="mb-6">
        <input type="file" onChange={handleFileChange} className="form-input" />
        <button
          onClick={uploadFile}
          className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Cargar
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {files.length === 0 ? (
        <p>No se encontraron archivos</p>
      ) : (
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Fecha-Hora</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{file.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{file.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{file.modified_time}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => removeFile(file.name)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FilesGrid;

// src/components/Login.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      // Make a request to the backend to get a token
      const response = await axios.post('http://localhost:8000/api/token', {
        username: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      const { access_token } = response.data;

      // If successful, store the token and update the auth context
      login(access_token);
      navigate('/files'); // Redirect to the protected page
    } catch (error) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-50 p-8 rounded-md shadow-md w-full max-w-sm">
        {/* Update the text color to improve visibility */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Login</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input w-full"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input w-full"
          />
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

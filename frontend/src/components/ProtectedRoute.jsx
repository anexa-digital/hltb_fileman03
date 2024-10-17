// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/" />;
  }

  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;

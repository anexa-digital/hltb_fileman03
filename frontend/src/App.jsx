// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import FilesGrid from './components/FilesGrid';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/files" element={  <ProtectedRoute>
                                          <FilesGrid />
                                        </ProtectedRoute>
                                      } />
      </Routes>
    </Router>
  );
}

export default App;

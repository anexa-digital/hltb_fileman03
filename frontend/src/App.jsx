// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import FilesGrid from './components/FilesGrid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/files" element={<FilesGrid />} />
      </Routes>
    </Router>
  );
}

export default App;

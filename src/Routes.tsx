import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import JobList from './JobList';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/jobs" element={<JobList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 
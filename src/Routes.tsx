import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import JobList from './JobList';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/jobs" element={<App />} />
        <Route path="/apply" element={<App />} />
        <Route path="/" element={<JobList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 
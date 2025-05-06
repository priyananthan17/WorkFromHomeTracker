import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import SummaryForm from './components/SummaryForm';
import TaskLogger from './components/TaskLogger';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/summary" element={<SummaryForm />} />
      <Route path="/tasks" element={<TaskLogger />} />
    </Routes>
  );
};

export default AppRoutes;

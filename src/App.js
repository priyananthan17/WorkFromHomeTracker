import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import TaskLogger from './components/TaskLogger';
import SummaryForm from './components/SummaryForm';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};
function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username') || '';
  const location = useLocation();

  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          }
        />
        {username === 'admin' && (
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        )}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/taskLogger"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TaskLogger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SummaryForm"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SummaryForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        
      </Routes>
      
    </>
  );
}


export default App;

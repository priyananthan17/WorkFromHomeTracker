import React from 'react';
import { useParams } from 'react-router-dom';
import userData from '../data/userData';
import './UserDashboard.css';

const UserDashboard = () => {
  const { id } = useParams();
  const user = userData.find(u => u.id.toString() === id);

  if (!user) {
    return <div>User not found</div>;
  }

  const taskCount = {
    total: user.tasks.length,
    completed: user.tasks.filter(t => t.status === 'completed').length,
    inProgress: user.tasks.filter(t => t.status === 'in-progress').length,
    notStarted: user.tasks.filter(t => t.status === 'not-started').length,
  };

  const projectCount = {
    total: user.projects.length,
    active: user.projects.filter(p => p.status === 'active').length,
    completed: user.projects.filter(p => p.status === 'completed').length,
    inactive: user.projects.filter(p => p.status === 'inactive').length,
  };

  return (
    <div className="user-dashboard">
      <h2>Welcome, {user.name}</h2>
      <div className="profile-section">
        <img src={user.profilePicture} alt={user.name} />
        <div className="info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Date Joined:</strong> {user.date}</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="card1">
          <h3>Tasks</h3>
          <p>Total: {taskCount.total}</p>
          <p>Completed: {taskCount.completed}</p>
          <p>In Progress: {taskCount.inProgress}</p>
          <p>Not Started: {taskCount.notStarted}</p>
        </div>
        <div className="card1">
          <h3>Projects</h3>
          <p>Total: {projectCount.total}</p>
          <p>Active: {projectCount.active}</p>
          <p>Completed: {projectCount.completed}</p>
          <p>Inactive: {projectCount.inactive}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

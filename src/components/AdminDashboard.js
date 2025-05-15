import React from "react";
import { useNavigate } from "react-router-dom";
import userData from "../data/userData";
import AdminData from "../data/AdminData";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Fallback for empty or malformed userData
  const safeUserData = Array.isArray(userData) ? userData : [];
  const safeAdminData = Array.isArray(AdminData) ? AdminData : [];

  // Calculate employee, task, and project stats from userData
  const totalEmployees = safeUserData.length;
  const activeEmployees = safeUserData.filter(
    (user) => user.status?.toLowerCase() === "active"
  ).length;
  const inactiveEmployees = safeUserData.filter(
    (user) => user.status?.toLowerCase() === "inactive"
  ).length;

  const allTasks = safeUserData.flatMap((user) => user.tasks || []);
  const taskStats = {
    completed: allTasks.filter((task) => task.status?.toLowerCase() === "completed").length,
    inProgress: allTasks.filter((task) => task.status?.toLowerCase() === "in-progress").length,
    notStarted: allTasks.filter((task) => task.status?.toLowerCase() === "not-started").length,
  };

  const allProjects = safeUserData.flatMap((user) => user.projects || []);
  const projectStats = {
    active: allProjects.filter((p) => p.status?.toLowerCase() === "active").length,
    completed: allProjects.filter((p) => p.status?.toLowerCase() === "completed").length,
    inactive: allProjects.filter((p) => p.status?.toLowerCase() === "inactive").length,
  };

  // Check if the user is an admin using AdminData and localStorage
  const username = localStorage.getItem("username") || "Guest";
  const storedRole = localStorage.getItem("role") || "guest";
  const loggedAdmin = safeAdminData.find((admin) => admin.name === username) || {
    id: null,
    role: "guest",
  };

  // Admin check: use stored role from localStorage (set in Login) or AdminData role
  const isAdmin = storedRole === "admin" || loggedAdmin.role === "admin";

  if (!isAdmin) {
    return (
      <div className="admin-dashboard-container">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
        <p className="no-access" role="alert">
          Access denied. You must be an admin to view this page.
        </p>
        <button
          className="back-button"
          onClick={() => navigate("/home")}
          aria-label="Back to Home"
        >
          Back to Home
        </button>
      </div>
    );
  }
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-section">
          <h2>Employees</h2>
          <div className="stats">
            <div className="stat-box" aria-label={`Total Employees: ${totalEmployees}`}>
              Total: {totalEmployees}
            </div>
            <div className="stat-box" aria-label={`Active Employees: ${activeEmployees}`}>
              Active: {activeEmployees}
            </div>
            <div className="stat-box" aria-label={`Inactive Employees: ${inactiveEmployees}`}>
              Inactive: {inactiveEmployees}
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Task Stats</h2>
          <div className="stats">
            <div className="stat-box" aria-label={`Completed Tasks: ${taskStats.completed}`}>
              Completed: {taskStats.completed}
            </div>
            <div className="stat-box" aria-label={`In Progress Tasks: ${taskStats.inProgress}`}>
              In Progress: {taskStats.inProgress}
            </div>
            <div className="stat-box" aria-label={`Not Started Tasks: ${taskStats.notStarted}`}>
              Not Started: {taskStats.notStarted}
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Project Stats</h2>
          <div className="stats">
            <div className="stat-box" aria-label={`Active Projects: ${projectStats.active}`}>
              Active: {projectStats.active}
            </div>
            <div className="stat-box" aria-label={`Completed Projects: ${projectStats.completed}`}>
              Completed: {projectStats.completed}
            </div>
            <div className="stat-box" aria-label={`Inactive Projects: ${projectStats.inactive}`}>
              Inactive: {projectStats.inactive}
            </div>
          </div>
        </div>
      </div>
      <footer className="dashboard-footer">
        <p>© 2025 WFHT. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
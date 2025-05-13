import './AdminDashboard.css';
import userData from '../data/userData'; 

const AdminDashboard = () => {
  const totalEmployees = userData.length;
  const activeEmployees = userData.filter(user => user.status === 'active').length;
  const inactiveEmployees = userData.filter(user => user.status === 'inactive').length;

  const allTasks = userData.flatMap(user => user.tasks);
  const taskStats = {
    completed: allTasks.filter(task => task.status === 'completed').length,
    inProgress: allTasks.filter(task => task.status === 'in-progress').length,
    notStarted: allTasks.filter(task => task.status === 'not-started').length,
  };

  const allProjects = userData.flatMap(user => user.projects);
  const projectStats = {
    active: allProjects.filter(p => p.status === 'active').length,
    completed: allProjects.filter(p => p.status === 'completed').length,
    inactive: allProjects.filter(p => p.status === 'inactive').length,
  };

  return (
<div className="admin-dashboard-container">
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-section" >
        <h2>Employees</h2>
        <div className="stats">
          <div className="stat-box" >Total: {totalEmployees}</div>
          <div className="stat-box">Active: {activeEmployees}</div>
          <div className="stat-box">Inactive: {inactiveEmployees}</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Task Stats</h2>
        <div className="stats">
          <div className="stat-box">Completed: {taskStats.completed}</div>
          <div className="stat-box">In Progress: {taskStats.inProgress}</div>
          <div className="stat-box">Not Started: {taskStats.notStarted}</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Project Stats</h2>
        <div className="stats">
          <div className="stat-box">Active: {projectStats.active}</div>
          <div className="stat-box">Completed: {projectStats.completed}</div>
          <div className="stat-box">Inactive: {projectStats.inactive}</div>
        </div>
      </div>
    </div>
    <section style={{ padding: "20px", textAlign: "center", marginTop: "20px" }}>
        <p>&copy; 2025 WFHT. All rights reserved.</p>
      </section>
    </div>
  );
};

export default AdminDashboard;

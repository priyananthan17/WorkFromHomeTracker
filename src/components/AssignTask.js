import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userData from "../data/userData";
import "./AssignTask.css";

const AssignTask = () => {
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("not-started");
  const [error, setError] = useState("");

  const storedRole = localStorage.getItem("role") || "guest";
  if (storedRole !== "admin") {
    navigate("/login");
    return null;
  }

  const handleAssign = () => {
    if (!selectedUserId) {
      setError("Please select an employee.");
      return;
    }
    if (!taskTitle.trim()) {
      setError("Task title is required.");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("allUsers")) || userData;
    const userIndex = savedUsers.findIndex((user) => user.id === parseInt(selectedUserId));
    if (userIndex !== -1) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
      };
      savedUsers[userIndex].tasks.push(newTask);
      localStorage.setItem("allUsers", JSON.stringify(savedUsers));
      alert(`Task "${taskTitle}" assigned to ${savedUsers[userIndex].name}`);
      setSelectedUserId("");
      setTaskTitle("");
      setTaskDescription("");
      setTaskStatus("not-started");
      setError("");
      navigate("/all-users");
    } else {
      setError("User not found.");
    }
  };

  return (
    <div className="assign-task-container">
      <div className="assign-task">
        <h2>Assign Task to Employee</h2>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="user-select">Employee</label>
          <select
            id="user-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="input-control"
            aria-label="Select employee"
          >
            <option value="">Select Employee</option>
            {userData.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.department}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="input-control"
            aria-label="Task title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-description">Task Description</label>
          <textarea
            id="task-description"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows={4}
            className="input-control"
            aria-label="Task description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-status">Task Status</label>
          <select
            id="task-status"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="input-control"
            aria-label="Task status"
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-actions">
          <button
            onClick={handleAssign}
            className="assign-button"
            aria-label="Assign task"
          >
            Assign Task
          </button>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="back-button"
            aria-label="Back to Dashboard"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTask;
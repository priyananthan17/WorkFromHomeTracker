import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import initialUserData from "../data/userData";
import "./TaskLogger.css";

const TaskLogger = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const loggedUser = initialUserData.find((user) => user.name === username) || {
    id: null,
    name: "Guest",
    tasks: [],
  };

  const [tasks, setTasks] = useState(loggedUser.tasks || []);
  const [completionDates, setCompletionDates] = useState({});
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      setError("Title and due date are required.");
      return;
    }
    const newTaskData = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      createdAt: new Date().toISOString().split("T")[0],
      status: "not-started",
      completedAt: null,
    };
    setTasks((prev) => [...prev, newTaskData]);
    setNewTask({ title: "", description: "", dueDate: "" });
    setError("");
  };

  const handleDateChange = (taskId, date) => {
    setCompletionDates((prev) => ({
      ...prev,
      [taskId]: date,
    }));
    setError("");
  };

  const handleComplete = (taskId) => {
    const completionDate = completionDates[taskId];
    if (!completionDate) {
      setError("Please select a completion date.");
      return;
    }
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: "completed", completedAt: completionDate }
        : task
    );
    setTasks(updatedTasks);
    setCompletionDates((prev) => ({
      ...prev,
      [taskId]: "",
    }));
    setError("");
  };

  if (!loggedUser.id && username === "Guest") {
    return (
      <div className="container">
        <h1 className="header">Task Logger</h1>
        <p className="no-user">Please log in to manage tasks.</p>
        <button
          className="action-button"
          onClick={() => navigate("/login")}
          aria-label="Go to Login"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="header">Welcome, {loggedUser.name}</h1>
      <div className="task-card task-card--add">
        <h3>Add New Task</h3>
        {error && <p className="error-message">{error}</p>}
        <div className="form-row">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Task Title"
            aria-label="Task Title"
          />
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Task Description"
            aria-label="Task Description"
          />
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            min="2025-05-01"
            aria-label="Due Date"
          />
          <button onClick={handleAddTask} aria-label="Add Task">
            Add Task
          </button>
        </div>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div
            key={task.id}
            className="task-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 style={{ textDecoration: task.status === "completed" ? "line-through" : "none" }}>
              {task.title}
            </h3>
            <p>{task.description || "No description provided."}</p>
            <p>Status: {task.status}</p>
            <p>Created: {task.createdAt}</p>
            {task.completedAt && <p>Completed: {task.completedAt}</p>}
            {(task.status === "not-started" || task.status === "in-progress") && (
              <div className="form-row">
                <input
                  type="date"
                  value={completionDates[task.id] || ""}
                  onChange={(e) => handleDateChange(task.id, e.target.value)}
                  min="2025-05-01"
                  aria-label="Completion Date"
                />
                <button
                  onClick={() => handleComplete(task.id)}
                  aria-label="Set Completion Date"
                >
                  Set Completion
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="no-user">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskLogger;
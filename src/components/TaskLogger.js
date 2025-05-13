import React, { useState, useEffect } from "react";
import "./TaskLogger.css";

const TaskLogger = () => {
  const username = localStorage.getItem("username") || "";
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    description: "",
    date: "",
    status: "Pending",
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = savedTasks.filter((task) => task.username === username);
    setTasks(userTasks);
  }, [username]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddTask = () => {
    if (newTask.description && newTask.date) {
      const task = {
        username,
        description: newTask.description,
        date: newTask.date,
        status: newTask.status,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(), 
        completedAt: null, 
      };
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));

      setTasks((prev) => [...prev, task]);

      setNewTask({
        description: "",
        date: "",
        status: "Pending",
      });
    } else {
      alert("Please fill out the task description and date.");
    }
  };

  const handleStatusChange = (taskId, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status,
            completedAt: status === "Completed" ? new Date().toISOString() : null, 
          }
        : task
    );
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="task-logger-container">
    <div className="task-logger">
      <h2>Task Logger for {username}</h2>
      <div className="task-form">
        <input
          type="text"
          name="description"
          placeholder="Task description"
          value={newTask.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={newTask.date}
          onChange={handleChange}
        />
        <select
          name="status"
          value={newTask.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <h3>Existing Task History</h3>
      <div className="task-history">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <div>
                <strong>{task.description}</strong>
                <p>Created On: {new Date(task.createdAt).toLocaleString()}</p>
                {task.completedAt && (
                  <p>Completed On: {new Date(task.completedAt).toLocaleString()}</p>
                )}
              </div>
              <div>
                <span>Status: {task.status}</span>
                {task.status === "Pending" && (
                  <button onClick={() => handleStatusChange(task.id, "Completed")} style={{ marginLeft: "10px" }}>
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No tasks logged yet.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default TaskLogger;

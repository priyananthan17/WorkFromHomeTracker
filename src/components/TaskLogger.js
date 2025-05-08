import React, { useState } from 'react';
import taskData from '../data/userData';
import './TaskLogger.css';

const TaskLogger = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'not-started',
  });

  const [taskHistory, setTaskHistory] = useState(taskData); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskHistory([...taskHistory, task]); 
    setTask({ title: '', description: '', status: 'not-started' });
  };

  return (
    <div style={{ padding: '10px', background: 'linear-gradient(135deg, #e0f7fa, #ffffff)' }}>
      <h2 style={{ fontSize: '30px' }}>Task Logger</h2>

      <form className="task-logger-form" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Submit Task</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <h3 style={{ fontSize: '24px' }}>Task History</h3>
      {taskHistory.length === 0 ? (
        <p>No tasks logged yet.</p>
      ) : (
        <ul className="task-history-list">
          {taskHistory.map((item, index) => (
            <li key={index} className="task-history-item">
              <strong>{item.title}</strong> - {item.description} (
              <span className={item.status}>{item.status}</span>)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskLogger;

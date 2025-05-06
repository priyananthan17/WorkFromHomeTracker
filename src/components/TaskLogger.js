import React, { useState } from 'react';
import { submitTask } from '../services/api';
import './TaskLogger.css';

const TaskLogger = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'not-started',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitTask(task);
    setTask({ title: '', description: '', status: 'not-started' });
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2 style={{ fontSize:"30px"}}>Task Logger</h2> 
    <form className="task-logger-form" onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={task.title}
        onChange={e => setTask({ ...task, title: e.target.value })}
      />
      <input
        placeholder="Description"
        value={task.description}
        onChange={e => setTask({ ...task, description: e.target.value })}
      />
      <select
        value={task.status}
        onChange={e => setTask({ ...task, status: e.target.value })}
      >
        <option value="not-started">Not Started</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Submit Task</button>
    </form>
    </div>
  );
};

export default TaskLogger;

import React, { useState } from 'react';
import userData from '../data/userData';
import './AssignTask.css';

const AssignTask = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('not-started');

  const handleAssign = () => {
    const userIndex = userData.findIndex(user => user.id === parseInt(selectedUserId));
    if (userIndex !== -1) {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
      };
      userData[userIndex].tasks.push(newTask);
      alert(`Task "${taskTitle}" assigned to ${userData[userIndex].name}`);
      setTaskTitle('');
      setTaskDescription('');
      setTaskStatus('not-started');
    }
  };

  return (
    <div className="assign-task-container">
      <div className="assign-task">
        <h2>Assign Task to Employee</h2>

        <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
          <option value="">Select Employee</option>
          {userData.map(user => (
            <option key={user.id} value={user.id}>{user.name} - {user.department}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
        />

        <textarea
  placeholder="Task Description"
  value={taskDescription}
  onChange={e => setTaskDescription(e.target.value)}
  rows={4}
  style={{ resize: 'none', width: '100%' }}
/>

        <select value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={handleAssign}>Assign Task</button>
      </div>
    </div>
  );
};

export default AssignTask;

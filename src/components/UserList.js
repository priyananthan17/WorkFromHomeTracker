import React, { useState } from 'react';
import initialUserData from '../data/userData'; // Rename to avoid conflict
import UserCard from './UserCard';
import './AllUsers.css';

const Dashboard = () => {
  const [users, setUsers] = useState(initialUserData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [newUser, setNewUser] = useState({
    name: '',
    status: 'active',
    department: '',
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.department) return;

    const newUserData = {
      ...newUser,
      id: users.length + 1, // Simple ID generation
    };

    setUsers([...users, newUserData]);
    setNewUser({ name: '', status: 'active', department: '' });
  };

  const filteredData = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey].toLowerCase();
    const valB = b[sortKey].toLowerCase();
    return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input-control"
        />
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="input-control"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button onClick={() => handleSort('name')} className="sort-button">Sort by Name</button>
        <button onClick={() => handleSort('department')} className="sort-button">Sort by Department</button>
      </div>

      <div className="add-user-form">
        <h2>Add New User</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
          className="input-control"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={newUser.department}
          onChange={handleInputChange}
          className="input-control"
        />
        <select
          name="status"
          value={newUser.status}
          onChange={handleInputChange}
          className="input-control"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button onClick={handleAddUser} className="add-button">Add User</button>
      </div>

      <div className="card-grid">
        {sortedData.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import userData from '../data/userData';
import UserCard from './UserCard';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const filteredData = userData.filter(user => {
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

      <div className="card-grid">
        {sortedData.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

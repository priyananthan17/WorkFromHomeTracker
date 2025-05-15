import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userData from "../data/userData";
import UserCard from "./UserCard";
import "./AllUsers.css";

const AllUsers = () => {
  const navigate = useNavigate();
  const savedUsers = JSON.parse(localStorage.getItem("allUsers")) || userData;
  const [users, setUsers] = useState(savedUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    status: "active",
    department: "",
    email: "",
    phone: "",
    location: "",
  });
  const [error, setError] = useState("");

  const storedRole = localStorage.getItem("role") || "guest";
  if (storedRole !== "admin") {
    navigate("/login");
    return null;
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+?[\d\s-]{10,}$/.test(phone);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setError("");
  };

  const handleAddUser = () => {
    const { name, department, email, phone, location } = newUser;
    if (!name || !department || !email || !phone || !location) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number (at least 10 digits).");
      return;
    }
    if (users.some((user) => user.name.toLowerCase() === name.toLowerCase())) {
      setError("User with this name already exists.");
      return;
    }

    const newUserData = {
      ...newUser,
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      status: newUser.status.toLowerCase(),
      role: "user",
      tasks: [],
      projects: [],
      profilePicture: "https://via.placeholder.com/100", 
      date: new Date().toISOString().split("T")[0], 
    };

    const updatedUsers = [...users, newUserData];
    setUsers(updatedUsers);
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    setNewUser({
      name: "",
      status: "active",
      department: "",
      email: "",
      phone: "",
      location: "",
    });
    setShowForm(false);
    setError("");
  };

  const filteredData = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || user.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = (a[sortKey] || "").toLowerCase();
    const valB = (b[sortKey] || "").toLowerCase();
    return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  return (
    <div className="all-users-container">
      <div className="all-users">
        <h1>All Users</h1>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
        <div className="controls">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="input-control"
            aria-label="Search users by name"
          />
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="input-control"
            aria-label="Filter users by status"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={() => handleSort("name")}
            className={`sort-button ${sortKey === "name" ? "sort-active" : ""}`}
            aria-label={`Sort by name (${sortKey === "name" ? sortOrder : "asc"})`}
          >
            Sort by Name {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => handleSort("department")}
            className={`sort-button ${sortKey === "department" ? "sort-active" : ""}`}
            aria-label={`Sort by department (${sortKey === "department" ? sortOrder : "asc"})`}
          >
            Sort by Department {sortKey === "department" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="new-user-button"
            aria-label={showForm ? "Cancel adding new user" : "Add new user"}
          >
            {showForm ? "Cancel" : "New User"}
          </button>
        </div>

        {showForm && (
          <div className="add-user-form" role="form" aria-labelledby="add-user-title">
            <h2 id="add-user-title">Add New User</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleInputChange}
                className="input-control"
                aria-label="New user name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                id="department"
                type="text"
                name="department"
                placeholder="Department"
                value={newUser.department}
                onChange={handleInputChange}
                className="input-control"
                aria-label="New user department"
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={newUser.status}
                onChange={handleInputChange}
                className="input-control"
                aria-label="New user status"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleInputChange}
                className="input-control"
                aria-label="New user email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Phone"
                value={newUser.phone}
                onChange={handleInputChange}
                className="input-control"
                aria-label="New user phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="Location"
                value={newUser.location}
                onChange={handleInputChange}
                className="input-control"
                aria-label="New user location"
              />
            </div>
            <button
              onClick={handleAddUser}
              className="add-button"
              aria-label="Add new user"
            >
              Add User
            </button>
          </div>
        )}

        <div className="card-grid">
          {sortedData.length ? (
            sortedData.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          ) : (
            <p className="no-users">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
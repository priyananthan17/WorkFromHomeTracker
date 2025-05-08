import React from 'react';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <a
      href={user.github}
      target="_blank"
      rel="noopener noreferrer"
      className="user-card-link"
    >
      <div className="user-card">
        <img src={user.profilePicture} alt={user.name} className="user-image" />
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <p><strong>Status:</strong> <span className={user.status}>{user.status}</span></p>
        <p><strong>Date Joined:</strong> {user.date}</p>
      </div>
    </a>
  );
};

export default UserCard;

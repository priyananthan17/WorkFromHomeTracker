import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.css";

const UserCard = ({ user }) => {
  const formattedDate = user.date
    ? new Date(user.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <Link
      to={`/details/${user.id}`}
      className="user-card-link"
      aria-label={`View details for ${user.name}`}
    >
      <div className="user-card">
        <img
          src={user.profilePicture || "https://via.placeholder.com/100"}
          alt={`Avatar of ${user.name}`}
          className="user-image"
        />
        <h2>{user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Department:</strong> {user.department}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={user.status === "active" ? "activestatus" : "inactivestatus"}>
            {user.status}
          </span>
        </p>
        <p>
          <strong>Date Joined:</strong> {formattedDate}
        </p>
      </div>
    </Link>
  );
};

export default UserCard;
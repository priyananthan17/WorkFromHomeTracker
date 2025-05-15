import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import userData from "../data/userData";
import "./UserDetails.css";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const savedUsers = JSON.parse(localStorage.getItem("allUsers")) || userData;
  const user = savedUsers.find((u) => u.id.toString() === id);

  if (!user) {
    return (
      <div className="user-details-container">
        <div className="user-details">
          <h2>User Not Found</h2>
          <button
            className="back-button"
            onClick={() => navigate("/all-users")}
            aria-label="Back to All Users"
          >
            Back to All Users
          </button>
        </div>
      </div>
    );
  }

  const githubUsername = user.github
    ? user.github.split("/").pop() || user.name
    : user.name;

  const formattedDate = user.date
    ? new Date(user.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="user-details-container">
      <div className="user-details">
        <h2>{user.name}</h2>
        <img
          src={user.profilePicture || "https://via.placeholder.com/160"}
          alt={`Avatar of ${user.name}`}
          className="detail-image"
        />
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
          <strong>Location:</strong> {user.location || "N/A"}
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

        <a
          href={`mailto:${user.email}`}
          className="chat-button"
          style={{ textDecoration: "none" }}
          aria-label={`Email ${user.name}`}
        >
          💬 Chat with {user.name}
        </a>

        <h3>Tasks</h3>
        <ul>
          {user.tasks?.length ? (
            user.tasks.map((task, i) => (
              <li key={`task-${task.title || i}`}>
                <strong>{task.title}</strong> - {task.status}
              </li>
            ))
          ) : (
            <li>No tasks assigned</li>
          )}
        </ul>

        <h3>Projects</h3>
        <ul>
          {user.projects?.length ? (
            user.projects.map((proj, i) => (
              <li key={`project-${proj.name || i}`}>
                <strong>{proj.name}</strong> - {proj.status}
              </li>
            ))
          ) : (
            <li>No projects assigned</li>
          )}
        </ul>

        <h3>
          GitHub Overview -{" "}
          <a
            href={user.github || `https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            aria-label={`Visit ${user.name}'s GitHub profile`}
          >
            Visit GitHub Profile
          </a>
        </h3>
        <div className="github-preview">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=light`}
            alt={`GitHub stats for ${user.name}`}
            className="github-stats"
          />
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=light`}
            alt={`GitHub streak stats for ${user.name}`}
            className="github-stats"
          />
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/all-users")}
          aria-label="Back to All Users"
        >
          Back to All Users
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
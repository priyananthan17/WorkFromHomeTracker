import React from "react";
import { useParams } from "react-router-dom";
import userData from "../data/userData";
import "./UserDetails.css";

const UserDetails = () => {
  const { id } = useParams();
  const user = userData.find((u) => u.id.toString() === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="user-details">
      <h2>{user.name}</h2>
      <img src={user.profilePicture} alt={user.name} className="detail-image" />
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
        <strong>Status:</strong> {user.status}
      </p>
      <p>
        <strong>Date Joined:</strong> {user.date}
      </p>

      <a href={`mailto:${user.email}`} className="chat-button" style={{textDecoration: 'none'}}>
        💬 Chat with {user.name}
      </a>

      <h3>Tasks</h3>
      <ul>
        {user.tasks.map((task, i) => (
          <li key={i}>
            <strong>{task.title}</strong> - {task.status}
          </li>
        ))}
      </ul>

      <h3>Projects</h3>
      <ul>
        {user.projects.map((proj, i) => (
          <li key={i}>
            <strong>{proj.name}</strong> - {proj.status}
          </li>
        ))}
      </ul>

      <h3>GitHub Overview - <a
        href={user.github}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
         Visit GitHub Profile
      </a></h3>
      <div className="github-preview">
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${user.github
            .split("/")
            .pop()}&show_icons=true&theme=default`}
          alt="GitHub Stats"
          className="github-stats"
        />
        <img
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${user.github
            .split("/")
            .pop()}&theme=default`}
          alt="GitHub Streak"
          className="github-stats"
        />
      </div>

      
    </div>
  );
};

export default UserDetails;

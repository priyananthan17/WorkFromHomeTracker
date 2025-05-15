import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import initialUserData from "../data/userData";
import "./SummaryForm.css";

const SummaryForm = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const loggedUser = initialUserData.find((user) => user.name === username) || {
    id: null,
    name: "Guest",
  };

  const [text, setText] = useState("");
  const [teamLead, setTeamLead] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamLead || !email || !text) {
      setError("All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const summaryData = { text, teamLead, email, user: loggedUser.name };
    console.log("Summary Submitted:", summaryData);
    setText("");
    setTeamLead("");
    setEmail("");
    setError("");
    // Optionally navigate to another page after submission
    // navigate(`/user-dashboard/${loggedUser.id}`);
  };

  return (
    <div className="summary-form-background">
      <div className="summary-form-container">
        <h1 className="summary-form-title">Summary for {loggedUser.name}</h1>
        {error && <p className="error-message">{error}</p>}
        {loggedUser.id === null && (
          <p className="no-user">Please log in to submit summaries.</p>
        )}
        <form className="summary-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="teamLead">Team Lead Name</label>
            <input
              id="teamLead"
              type="text"
              value={teamLead}
              onChange={(e) => {
                setTeamLead(e.target.value);
                setError("");
              }}
              placeholder="Enter team lead name"
              className="form-input"
              aria-label="Team Lead Name"
              disabled={loggedUser.id === null}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Team Lead Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter email"
              className="form-input"
              aria-label="Team Lead Email"
              disabled={loggedUser.id === null}
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError("");
              }}
              placeholder="What went well today?"
              className="form-input form-textarea"
              aria-label="Summary"
              disabled={loggedUser.id === null}
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={loggedUser.id === null}
              aria-label="Submit Summary"
            >
              Submit Summary
            </button>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(`/user-dashboard/${loggedUser.id || ""}`)}
              aria-label="Back to Dashboard"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
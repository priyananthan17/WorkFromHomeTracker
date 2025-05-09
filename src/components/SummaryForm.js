import React, { useState } from 'react';
import './SummaryForm.css';

const SummaryForm = () => {
  const [text, setText] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamLead || !email || !text) {
      setError('All fields are required!');
      return;
    }
    const summaryData = { text, teamLead, email };
    console.log('Summary Submitted:', summaryData);
    setText('');
    setTeamLead('');
    setEmail('');
    setError('');
  };

  return (
    <div className="summary-form-container">
      <h1 className="summary-form-title">Summary</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="summary-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teamLead">Team Lead Name</label>
          <input
            id="teamLead"
            type="text"
            value={teamLead}
            onChange={(e) => setTeamLead(e.target.value)}
            placeholder="Enter team lead name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Team Lead Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What went well today?"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Submit Summary</button>
      </form>
    </div>
  );
};

export default SummaryForm;

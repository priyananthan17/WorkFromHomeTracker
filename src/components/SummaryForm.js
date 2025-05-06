import React, { useState } from 'react';
import { submitSummary } from '../services/api';
import './SummaryForm.css';

const SummaryForm = () => {
  const [text, setText] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitSummary({ text, teamLead, email });
    setText('');
    setTeamLead('');
    setEmail('');
  };

  return (
    <div>
      <h1 style={{ padding: '20px' }}>Summary</h1>
    <form className="summary-form" onSubmit={handleSubmit}>
      <div>
        <label>Team Lead Name</label>
        <input
          type="text"
          value={teamLead}
          onChange={e => setTeamLead(e.target.value)}
          placeholder="Enter team lead name"
        />
      </div>
      <div>
        <label>Team Lead Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>
      <div>
        <label>Summary</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What went well today?"
        />
      </div>
      <button type="submit">Submit Summary</button>
    </form>
    </div>
  );
};

export default SummaryForm;

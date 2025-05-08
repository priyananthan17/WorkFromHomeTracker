import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to WFHT</h1>
        <p>Your Personal Work From Home Tracker</p>
      </header>

      <section className="home-actions">
        <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        <button onClick={() => navigate('/taskLogger')}>Log a Task</button>
        <button onClick={() => navigate('/SummaryForm')}>Submit Summary</button>
        <button onClick={() => navigate('/profile')}>View Profile</button>
      </section>

      <section className="ads-section">
        <h3>Sponsored</h3>
        <div className="ad-block">
          <p>Boost your productivity with our premium plan!</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { useNavigate } from "react-router-dom";
import initialUserData from "../data/userData";
import "./Home.css";
import cardData from "../data/AdsData";

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const matchedUser = initialUserData.find((user) => user.name === username) || {
    id: null,
    name: "Guest",
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to WFHT</h1>
        <p>Your Personal Work From Home Tracker</p>
      </header>

      <section className="home-actions">
        <button
          className="action-button"
          onClick={() => navigate(`/user-dashboard/${matchedUser.id}`)}
          aria-label="Go to Dashboard"
        >
          Go to Dashboard
        </button>
        <button
          className="action-button"
          onClick={() => navigate("/task-logger")}
          aria-label="Log a Task"
        >
          Log a Task
        </button>
        <button
          className="action-button"
          onClick={() => navigate("/summary-form")}
          aria-label="Submit Summary"
        >
          Submit Summary
        </button>
        <button
          className="action-button"
          onClick={() => navigate("/user-profile")}
          aria-label="View Profile"
        >
          View Profile
        </button>
      </section>

      <section className="adsection">
        <h3>Sponsored</h3>
        <div className="adblock">
          <p>Boost your productivity with our premium plan!</p>
          <button className="action-button" aria-label="Learn More About Premium">
            Learn More
          </button>
        </div>
      </section>

      <section className="cards-section">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="card"
            onClick={() => window.open(card.url, "_blank", "noopener,noreferrer")}
            tabIndex={0}
            role="button"
            aria-label={`Visit ${card.name}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                window.open(card.url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <div className="card-header">
              {card.icon}
              <h3>{card.name}</h3>
            </div>
            <p>{card.description}</p>
            <div className="card-footer">
              <span>Updated {card.updated}</span>
              <span>{card.installs} installs</span>
            </div>
          </div>
        ))}
      </section>

      <footer className="footer">
        <p>© 2025 WFHT. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
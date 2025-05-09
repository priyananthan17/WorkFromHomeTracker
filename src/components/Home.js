import React from "react";
import { useNavigate } from "react-router-dom";
import { GitHub, LinkedIn } from "@mui/icons-material";
import "./Home.css";

const cardData = [
  {
    name: "GitHub",
    url: "https://github.com/",
    icon: <GitHub fontSize="large" />,
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    installs: 835,
    updated: "May 4, 2025",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/feed/",
    icon: <LinkedIn fontSize="large" />,
    description: "LinkedIn is a portal for searching for jobs and displaying skills.",
    installs: 85,
    updated: "May 4, 2025",
  },
  {
    name: "Rentify",
    url: "https://rentifybikerental.netlify.app/",
    icon: (
      <img
        src="https://www.rentify.co.ug/static/media/logo.d1ab13c39a6f82ee2d93.png"
        alt="Rentify Logo"
        width="40"
      />
    ),
    description:
      "Rentify is a bike rental platform offering affordable, convenient, and reliable two-wheeler rentals for travelers and commuters.",
    installs: 205,
    updated: "May 7, 2025",
  },
  {
    name: "Dropbox",
    url: "https://www.dropbox.com/",
    icon: (
      <img
        src="https://d33wubrfki0l68.cloudfront.net/33b6aba6009f1635ca406dc2383b9a774bbe5118/2d63b/images/integrations/dropbox.png"
        alt="Dropbox Logo"
        width="40"
      />
    ),
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, and a personal cloud.",
    installs: 125,
    updated: "May 8, 2025",
  },
  {
    name: "Medium",
    url: "https://medium.com/",
    icon: (
      <img
        src="https://www.pngrepo.com/png/165281/180/medium.png"
        alt="Medium Logo"
        width="40"
      />
    ),
    description:
      "Medium is an online publishing platform developed by Evan Williams, launched in August 2012.",
    installs: 100,
    updated: "May 8, 2025",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to WFHT</h1>
        <p>Your Personal Work From Home Tracker</p>
      </header>

      <section className="home-actions">
        <button className="action-button" onClick={() => navigate("/dashboard")} aria-label="Go to Dashboard">
          Go to Dashboard
        </button>
        <button className="action-button" onClick={() => navigate("/taskLogger")} aria-label="Log a Task">
          Log a Task
        </button>
        <button className="action-button" onClick={() => navigate("/SummaryForm")} aria-label="Submit Summary">
          Submit Summary
        </button>
        <button className="action-button" onClick={() => navigate("/profile")} aria-label="View Profile">
          View Profile
        </button>
      </section>

      <section className="ads-section">
        <h3>Sponsored</h3>
        <div className="ad-block">
          <p>Boost your productivity with our premium plan!</p>
        </div>
      

      <section className="cards-section">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="card"
            onClick={() => window.open(card.url, "_blank", "noopener,noreferrer")}
            style={{ cursor: "pointer" }}
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
      </section>
      <section className="footer">
        <p>&copy; 2025 WFHT. All rights reserved.</p>
      </section>

    </div>
  );
};

export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to WFHT</h1>
        <p>Your Personal Work From Home Tracker</p>
      </header>
      <section className="home-actions">
        <button className="action-button" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
        <button className="action-button" onClick={() => navigate("/taskLogger")}>
          Log a Task
        </button>
        <button className="action-button" onClick={() => navigate("/SummaryForm")}>
          Submit Summary
        </button>
        <button className="action-button" onClick={() => navigate("/profile")}>
          View Profile
        </button>
      </section>
      <section className="ads-section">
        <h3>Sponsored</h3>
        <div className="ad-block">
          <p>Boost your productivity with our premium plan!</p>
        </div>
      </section>
      <section className="cards-section">
        {/* Github card */}
        <div className="card" onClick={() => window.open("https://github.com/", "_blank")} style={{ cursor: "pointer" }}>
          <div className="card-header">
            <GitHubIcon fontSize="large" />
            <h3>GitHub</h3>
          </div>
          <p>GitHub is a web-based hosting service for version control of code using Git.</p>
          <div className="card-footer">
            <span>Updated May 4, 2025</span>
            <span>835 installs</span>
          </div>
        </div>
        {/* rentify card */}
         <div className="card" onClick={() => window.open("https://rentifybikerental.netlify.app/", "_blank")} style={{ cursor: "pointer" }}>
          <div className="card-header">
             <img 
      src="https://www.rentify.co.ug/static/media/logo.d1ab13c39a6f82ee2d93.png" 
      alt="Rentify Logo" 
      width="40"/>
          <h3>Rentify</h3>
          </div>
          <p>Rentify is a bike rental platform offering affordable, convenient, and reliable two-wheeler rentals for travelers and commuters. </p>
          <div className="card-footer">
            <span>Updated May 7, 2025</span>
            <span>205 installs</span>
          </div>
        </div>
        {/* LinkedIn card */}
        <div className="card" onClick={() => window.open("https://www.linkedin.com/feed/", "_blank")} style={{ cursor: "pointer" }}>
          <div className="card-header">
            <LinkedIn fontSize="large" />
            <h3>LinkedIn</h3>
          </div>
          <p>LinkedIn is a portal for searching for jobs and displaying skills.</p>
          <div className="card-footer">
            <span>Updated May 4, 2025</span>
            <span>85 installs</span>
          </div>
        </div>
        {/* Dropbox card */}
          <div className="card" onClick={() => window.open("https://www.dropbox.com/", "_blank")} style={{ cursor: "pointer" }}>
          <div className="card-header">
             <img 
      src="https://d33wubrfki0l68.cloudfront.net/33b6aba6009f1635ca406dc2383b9a774bbe5118/2d63b/images/integrations/dropbox.png" 
      alt="Dropbox Logo" 
      width="40"/>
            <h3>DropBox</h3>
          </div>
          <p>Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.</p>
          <div className="card-footer">
            <span>Updated May 8, 2025</span>
            <span>125 installs</span>
          </div>
        </div>
        {/* Medium card */}
        <div className="card" onClick={() => window.open("https://medium.com/", "_blank")} style={{ cursor: "pointer" }}>
          <div className="card-header">
             <img 
      src="https://www.pngrepo.com/png/165281/180/medium.png" 
      alt="medium Logo" 
      width="40"/>
            <h3>Medium Corporation</h3>
          </div>
          <p>Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.</p>
          <div className="card-footer">
            <span>Updated May 8, 2025</span>
            <span>100 installs</span>
          </div>
        </div>
       
      </section>
      
    </div>
  );
};

export default Home;
import React from 'react';
import '../css/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to MERN Job Portal</h1>
        <p>Your gateway to the best jobs and talent!</p>
      </header>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature-card">
            <h3>For Job Seekers</h3>
            <ul>
              <li>Search and apply for jobs</li>
              <li>Create and manage your profile</li>
              <li>Track your applications</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>For Recruiters</h3>
            <ul>
              <li>Post new job openings</li>
              <li>Browse candidate profiles</li>
              <li>Manage applications</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>More Coming Soon</h3>
            <ul>
              <li>Advanced search filters</li>
              <li>Notifications & alerts</li>
              <li>Company profiles</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>About This Portal</h2>
        <p>
          This is a full-stack MERN job board application. Whether you are looking for your dream job or the perfect candidate, our platform connects job seekers and recruiters efficiently.
        </p>
      </section>
    </div>
  );
};

export default Home;
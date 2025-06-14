import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/homeUser.css';

const HomeUser = () => {
  const [showDetails, setShowDetails] = useState(false);

  // Get user info from localStorage
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');
  const age = localStorage.getItem('age');

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('age');
    localStorage.removeItem('isUser');
    window.location.href = '/login';
  };

  return (
    <div className="user-home-container">
      <header className="user-header">
        <div className="user-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>User Dashboard</h1>
            <p>Find your dream job and manage your applications!</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="user-action-btn"
              style={{ background: '#22c55e' }}
              onClick={() => setShowDetails((prev) => !prev)}
            >
              {showDetails ? 'Hide My Details' : 'Show My Details'}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="user-actions">
        <Link to="/homeUser/jobs" className="user-action-btn">
          Browse Jobs
        </Link>
        <Link to="/homeUser/applied" className="user-action-btn">
          My Applications
        </Link>
        <Link to="/homeUser/profile" className="user-action-btn">
          Edit Profile
        </Link>
        <Link to="/homeUser/saved-jobs" className="user-action-btn">
          Saved Jobs
        </Link>
        {showDetails && (
          <div className="user-details" style={{ marginTop: '1rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
            <h3>My Details</h3>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Age:</strong> {age}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeUser;
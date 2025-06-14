import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/homeRecruter.css';

const HomeRecruter = () => {
  const [showDetails, setShowDetails] = useState(false);

  // Get recruiter info from localStorage (or fetch from backend if needed)
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');
  const age = localStorage.getItem('age');
  // You can add more fields if you store them in localStorage



  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('age');
    localStorage.removeItem('isUser');
    window.location.href = '/login';
  };

  return (
    <div className="recruter-home-container">
      <header className="recruter-header">
        <div className="recruter-header-row">
          <div>
            <h1>
              <span className="brand">Recruiter</span> Dashboard
            </h1>
            <p>Manage your job postings and find the best candidates!</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="recruter-action-btn"
              style={{ background: '#6c63ff' }}
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

      <section className="recruter-actions">
        <Link to="/homeRecruter/post-job" className="recruter-action-btn">
          Post a New Job
        </Link>
        <Link to="/homeRecruter/manage-jobs" className="recruter-action-btn">
          Manage Job Listings
        </Link>
        <Link to="/homeRecruter/candidates" className="recruter-action-btn">
          View Candidates
        </Link>
        <Link to="/homeRecruter/profile" className="recruter-action-btn">
          Edit Profile
        </Link>
        {showDetails && (
          <div className="recruter-details" style={{ marginTop: '1rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
            <h3>My Details</h3>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Age:</strong> {age}</p>
            {/* Add more fields here if needed */}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeRecruter;
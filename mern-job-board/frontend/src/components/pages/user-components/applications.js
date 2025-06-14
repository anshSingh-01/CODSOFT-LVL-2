import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../../../utils';
import '../../css/user-components/application.css';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchApplications = async () => {

      try {
        const res = await fetch('http://localhost:5000/joblo/user/getappliedjob', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail }),
        });
        const data = await res.json();
        if (res.ok) {
          handleSuccess(res.message || 'Applications loaded successfully!');
            setApplications(data.jobs || []);

        } else {
          handleError(data.message || 'Failed to fetch applications');
        }
      } catch (err) {
        handleError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    if (userEmail) fetchApplications();
    else {
      setMessage('No user found in localStorage');
      setLoading(false);
    }
  }, [userEmail]);

  return (
    <div className="applications-container">
      <header className="applications-header">
        <h1>My Applications</h1>
        <p>View and manage your job applications.</p>
      </header>

      <section className="applications-list">
        {loading ? (
          <p>Loading...</p>
        ) : message ? (
          <p>{message}</p>
        ) : applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          applications.map((app) => (
            <div className="application-card" key={app._id}>
              <h3>{app.jobTitle}</h3>
              <p><strong>Company:</strong> {app.companyName}</p>
              <p><strong>Status:</strong> {app.status || 'Applied'}</p>
              <p><strong>Date:</strong> {app.postedDate ? new Date(app.postedDate).toLocaleDateString() : 'N/A'}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Applications;
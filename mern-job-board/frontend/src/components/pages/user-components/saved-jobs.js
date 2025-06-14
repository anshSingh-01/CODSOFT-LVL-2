import React, { useEffect, useState } from 'react';

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/joblo/user/saved', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        console.log('Saved Jobs Data:', data);
        if (res.ok) {
          setJobs(data.jobs || []);
        } else {
          setMessage(data.message || 'Failed to fetch saved jobs');
        }
      } catch (err) {
        setMessage('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    if (email) fetchSavedJobs();
    else {
      setMessage('No user found in localStorage');
      setLoading(false);
    }
  }, [email]);

  return (
    <div className="container">
      <h1>Saved Jobs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p>{message}</p>
      ) : jobs.length === 0 ? (
        <p>No saved jobs found.</p>
      ) : (
        <div className="jobs-list">
          {jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h3>{job.jobTitle}</h3>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>SavedAt:</strong> {job.postedDate}</p>
              <p>{job.jobDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
import React, { useEffect, useState } from 'react';
import '../../css/user-components/jobs.css';
import { handleError, handleSuccess } from '../../../utils';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLocation, setFilterLocation] = useState('');
  const [filterCompany, setFilterCompany] = useState('');

  const email = localStorage.getItem('email');
  let _Data = null;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/joblo/user/all');
        const data = await res.json();
        if (res.ok) {
          setJobs(data.jobs || []);
          handleSuccess('Jobs loaded successfully!');
        } else {
          handleError(data.message || 'Failed to fetch jobs');
        }
      } catch (err) {
        handleError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (_id, useEmail, userEmail) => {
    try {
      const res = await fetch('http://localhost:5000/joblo/user/applied', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, useEmail, userEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        handleSuccess(data.message || 'Applied successfully!');
      } else {
        handleError(data.message || 'Failed to apply');
      }
    } catch (err) {
      handleError('Error connecting to server');
    }
  };

  const handleSave = async (_id, email, userEmail) => {
    try {
      const res = await fetch('http://localhost:5000/joblo/user/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, email, userEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        _Data = data.job;
        handleSuccess(data.message || 'Job saved!');
      } else {
        handleError(data.message || 'Failed to save job');
      }
    } catch (err) {
      handleError('Error connecting to server');
    }
  };

  // Filter jobs based on location and company
  const filteredJobs = jobs.filter((job) => {
    const locationMatch = filterLocation
      ? job.location.toLowerCase().includes(filterLocation.toLowerCase())
      : true;
    const companyMatch = filterCompany
      ? job.companyName.toLowerCase().includes(filterCompany.toLowerCase())
      : true;
    return locationMatch && companyMatch;
  });

  return (
    <div className="jobs-container">
      <h1>Open Jobs</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Filter by Location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="job-filter-input"
        />
        <input
          type="text"
          placeholder="Filter by Company"
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className="job-filter-input"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filteredJobs.length === 0 ? (
        <p>No open jobs found.</p>
      ) : (
        <div className="jobs-list">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h3>{job.jobTitle}</h3>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p>{job.jobDescription}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.7rem' }}>
                <button className="job-btn apply-btn" onClick={() => handleApply(job._id, job.useEmail, email)}>
                  Apply
                </button>
                <button className="job-btn save-btn" onClick={() => handleSave(job._id, job.useEmail, email)}>
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
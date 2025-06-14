import React, { useEffect, useState } from 'react';
import '../../css/recruter-components/manage-jobs.css';
import { handleError, handleSuccess } from '../../../utils';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({ jobTitle: '', location: '', salary: '', jobDescription: '' });
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/joblo/job/byRecruiter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) setJobs(data.jobs || []);
        else handleError(data.message || 'Failed to fetch jobs');
      } catch (err){
          console.log(err.message || 'Error connecting to server');
        handleError('Error connecting to server');
      }
    };
    if (email) fetchJobs();
  }, [email]);

  const handleEditClick = (job) => {
    setEditingJob(job._id);
    setEditForm({
      jobTitle: job.jobTitle,
      location: job.location,
      salary: job.salary,
      jobDescription: job.jobDescription,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/joblo/job/update/${editingJob}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        setJobs((prev) =>
          prev.map((job) =>
            job._id === editingJob ? { ...job, ...editForm } : job
          )
        );
        handleSuccess('Job updated!');
        setEditingJob(null);
      } else {
        handleError(data.message || 'Failed to update job');
      }
    } catch {
      handleError('Error updating job');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`http://localhost:5000/joblo/job/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job._id !== id));
        handleSuccess('Job deleted!');
      } else {
        handleError(data.message || 'Failed to delete job');
      }
    } catch {
      handleError('Error deleting job');
    }
  };

  return (
    <div className="manage-jobs-container">
      <h2>Manage Job Listings</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="jobs-list">
          {jobs.map((job) =>
            editingJob === job._id ? (
              <form key={job._id} className="edit-job-form" onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="jobTitle"
                  value={editForm.jobTitle}
                  onChange={handleEditChange}
                  required
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                  required
                  placeholder="Location"
                />
                <input
                  type="text"
                  name="salary"
                  value={editForm.salary}
                  onChange={handleEditChange}
                  placeholder="Salary"
                />
                <textarea
                  name="jobDescription"
                  value={editForm.jobDescription}
                  onChange={handleEditChange}
                  required
                  placeholder="Job Description"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingJob(null)} style={{marginLeft: '1rem'}}>Cancel</button>
              </form>
            ) : (
              <div className="job-card" key={job._id}>
                <h3>{job.jobTitle}</h3>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p>{job.jobDescription}</p>
                <button onClick={() => handleEditClick(job)}>Edit</button>
                <button onClick={() => handleDelete(job._id)} className="delete-btn">Delete</button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
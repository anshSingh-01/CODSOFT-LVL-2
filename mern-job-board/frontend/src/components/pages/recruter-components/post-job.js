import React, { useState, useEffect } from 'react';
import '../../css/recruter-components/post-job.css';
import { handleError, handleSuccess } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    jobTitle: '',
    useEmail: '',
    jobDescription: '',
    location: '',
    salary: '',
    companyName: '',
  });
  const [error, setError] = useState('');



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
     const email = localStorage.getItem('email');
    const jobData = { ...form, useEmail: email }; 
      const res = await fetch(`http://localhost:5000/joblo/job/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });
      const data = await res.json();

      if (res.ok) {
        handleSuccess('Job posted successfully!');
        setForm({ jobTitle: '', useEmail: '', jobDescription: '', location: '', salary: '', companyName: '' });
      } else {
        handleError(data.message || 'Failed to post job');
      }
    } catch (err) {
      handleError(err.message );
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      <form className="post-job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />
        <input
          type="text"
          name="companyName"
          placeholder="company"
          value={form.companyName}
          onChange={handleChange}
        />
        <textarea
          name="jobDescription"
          placeholder="Job Description"
          value={form.jobDescription}
          onChange={handleChange}
          required
        />
        <button type="submit">Post Job</button>
        {error && <div className="post-job-error">{error}</div>}
      </form>
    </div>
  );
};

export default PostJob;
import React, { useEffect, useState } from 'react';
import '../../css/user-components/profile.css';
import { handleError } from '../../../utils';

const UserProfile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    photo: null,
    resume: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/joblo/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        console.log('Profile data:', data);
        let jobs =data;
        if (res.ok) {
          setForm({
            name: jobs.name || '',
            email: jobs.email || '',
            age: jobs.age ? String(jobs.age) : '',
            photo: jobs.photo || null,
            resume: jobs.resume || null,
          });
          if (data.photo) setPreviewPhoto(data.photo);
        } else {
          setMessage(data.message || 'Failed to load profile');
        }
      } catch (err) {
        handleError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (email) fetchProfile();
    else {
      setMessage('No user found in localStorage');
      setLoading(false);
    }
  }, [email]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' || name === 'resume') {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      if (name === 'photo' && files[0]) {
        setPreviewPhoto(URL.createObjectURL(files[0]));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('age', form.age);

      let _data =  {
                name : form.name,
                email : form.email,
                age : form.age
      }
    

      const res = await fetch('http://localhost:5000/joblo/user/updateProfile', {
        method: 'PUT',
        body: _data,
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated!');
      } else {
        setMessage(data.message || 'Failed to update profile');
      }
    } catch (err) {
        
      handleError('Error connecting to server');
    }
  };

  if (loading) return <div className="profile-container"><p>Loading profile...</p></div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          disabled
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <label>
          Upload Photo:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
        </label>
        {previewPhoto && (
          <div style={{ margin: '0.5rem 0' }}>
            <img src={previewPhoto} alt="Profile Preview" style={{ width: 80, height: 80, borderRadius: '50%' }} />
          </div>
        )}
        <label>
          Upload Resume:
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
          />
        </label>
        {form.resume && (
          <div style={{ margin: '0.5rem 0' }}>
            <span>Resume selected: {form.resume.name || 'Uploaded'}</span>
          </div>
        )}
        <button type="submit">Update Profile</button>
        <button
          type="button"
          style={{ marginLeft: '1rem' }}
          onClick={() => setShowDetails((prev) => !prev)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {message && <div className="profile-message">{message}</div>}
      </form>
      {showDetails && (
        <div className="profile-details" style={{ marginTop: '1rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
          <h3>User Details</h3>
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Age:</strong> {form.age}</p>
          {previewPhoto && (
            <div>
              <strong>Photo:</strong><br />
              <img src={previewPhoto} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%' }} />
            </div>
          )}
          {form.resume && (
            <div>
              <strong>Resume:</strong><br />
              <span>{form.resume.name || 'Uploaded'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
import React, { useEffect, useState } from 'react';
import '../../css/recruter-components/profile.css';

const Profile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Get email from localStorage
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Just call the endpoint, backend will use email from body
        const res = await fetch('http://localhost:5000/joblo/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
          setForm({
            name: data.name || '',
            email: data.email || '',
            age: data.age ? String(data.age) : '',
          });
        } else {
          setMessage(data.message || 'Failed to load profile');
        }
      } catch (err) {
        setMessage('Error connecting to server');
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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/joblo/updateprofile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated!');
      } else {
        setMessage(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  if (loading) return <div className="profile-container"><p>Loading profile...</p></div>;

  return (
    <div className="profile-container">
      <h2>Recruiter Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
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
        <button type="submit">Update Profile</button>
        {message && <div className="profile-message">{message}</div>}
      </form>
    </div>
  );
};

export default Profile;
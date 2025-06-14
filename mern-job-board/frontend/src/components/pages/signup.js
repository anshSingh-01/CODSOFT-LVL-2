import React, { useState } from 'react';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';
import { handleSuccess , handleError } from '../../utils';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    isUser: true,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setForm((prev) => ({
      ...prev,
      isUser: e.target.value === 'user',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/joblo/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        handleSuccess('Signup successful!');
        setForm({ name: '', email: '', age: '', password: '', isUser: true });
        navigate('/login');
      } else {
        handleError(data.message || 'Signup failed');
      }
    } catch (err) {
      handleError('Error connecting to server');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
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
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <div className="role-switch">
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={form.isUser === true}
              onChange={handleRadioChange}
            />
            User
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="role"
              value="recruiter"
              checked={form.isUser === false}
              onChange={handleRadioChange}
            />
            Recruiter
          </label>
        </div>
        <button type="submit">Signup</button>
        {message && <div className="signup-message">{message}</div>}
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
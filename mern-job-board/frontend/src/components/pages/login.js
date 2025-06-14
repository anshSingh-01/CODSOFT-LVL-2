import React, { useState } from 'react';
import '../css/login.css';
import {useNavigate , Link} from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
// import Signup from './signup';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    isUser: true,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'radio' ? value === 'user' : value,
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
      const res = await fetch('http://localhost:5000/joblo/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log('frontend side :' ,data);
      if (res.ok) {
        handleSuccess('Login successful!');
        localStorage.setItem('email' ,data.user.email);
        localStorage.setItem('name' ,data.user.name);
        localStorage.setItem('age' ,data.user.age);

        setTimeout(()=>{
         if(!form.isUser) navigate('/homeRecruter');
          else navigate('/homeUser');
        } , 1000);
      } else {
        handleError(data.message || 'Login failed');
      }
    } catch (err) {
      handleError('Error connecting to server');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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
        <button type="submit">Login</button>
        {/* {message && <div className="login-message">{message}</div>}
         */}
         <p>don't have an Account ? <a href="/signup">Sign up</a></p>

      </form>
    </div>
  );
};

export default Login;
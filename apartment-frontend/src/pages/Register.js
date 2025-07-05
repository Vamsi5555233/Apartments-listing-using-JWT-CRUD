// pages/Register.js
import React, { useState } from 'react';

const Register = () => {
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        setSuccessMsg('✅ Registration successful! Please check your email to verify your account.');
        setRegisterData({ username: '', email: '', password: '' }); // reset form
      } else {
        // Show detailed errors from backend
        if (data.email) {
          setErrorMsg(`❌ ${data.email[0]}`);
        } else if (data.username) {
          setErrorMsg(`❌ ${data.username[0]}`);
        } else {
          setErrorMsg(data.error || '❌ Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setErrorMsg('⚠️ Registration failed. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>🆕 Register</h2>

      {successMsg && <div style={{ color: 'green', marginBottom: '10px' }}>{successMsg}</div>}
      {errorMsg && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={registerData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

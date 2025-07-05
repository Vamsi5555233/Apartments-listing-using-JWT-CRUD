import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/forgot-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) setMsg('✅ Check your email for password reset link.');
      else setMsg(data.error || '❌ Failed to send email.');
    } catch {
      setMsg('❌ Error occurred.');
    }
  };

  return (
    <div className="form-container">
      <h2>🔑 Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Send Reset Link</button>
      </form>
      {msg && <p style={{ marginTop: '10px', color: msg.includes('✅') ? 'green' : 'red' }}>{msg}</p>}
    </div>
  );
};

export default ForgotPassword;

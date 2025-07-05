import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/reset-password/${uidb64}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('✅ Password changed successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMsg(data.error || '❌ Password reset failed.');
      }
    } catch {
      setMsg('❌ Something went wrong.');
    }
  };

  return (
    <div className="form-container">
      <h2>🔒 Reset Password</h2>
      <form onSubmit={handleReset}>
        <input type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Set New Password</button>
      </form>
      {msg && <p style={{ marginTop: '10px', color: msg.includes('✅') ? 'green' : 'red' }}>{msg}</p>}
    </div>
  );
};

export default ResetPassword;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [status, setStatus] = useState('Verifying...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uid = params.get('uid');
    const token = params.get('token');

    if (!uid || !token) {
      setStatus('Invalid verification link.');
      return;
    }

    fetch(`http://127.0.0.1:8000/api/verify-email/?uid=${uid}&token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setStatus('✅ Email verified! You can now login.');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setStatus(data.error || 'Verification failed.');
        }
      })
      .catch(() => setStatus('Something went wrong during verification.'));
  }, [location]);

  return (
    <div className="form-container">
      <h2>🔎 Email Verification</h2>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmail;

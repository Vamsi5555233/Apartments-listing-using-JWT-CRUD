import React from 'react';
import { Link } from 'react-router-dom';
import './Verify.css';

const VerifyFailed = () => {
  return (
    <div className="verify-container">
      <h2>❌ Email Verification Failed</h2>
      <p>The link may be invalid or expired. Please try registering again.</p>
      <Link to="/register" className="verify-button">Go to Register</Link>
    </div>
  );
};

export default VerifyFailed;

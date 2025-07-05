import React from 'react';
import { Link } from 'react-router-dom';
import './Verify.css';

const VerifySuccess = () => {
  return (
    <div className="verify-container">
      <h2>✅ Email Verified Successfully!</h2>
      <p>You can now log in and start using the Apartment Listing App.</p>
      <Link to="/login" className="verify-button">Go to Login</Link>
    </div>
  );
};

export default VerifySuccess;

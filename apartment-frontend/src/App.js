// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Apartments from './pages/Apartments';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import jwt_decode from 'jwt-decode';
import VerifyEmail from './pages/VerifyEmail';
import VerifySuccess from './pages/VerifySuccess';
import VerifyFailed from './pages/VerifyFailed';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


function App() {
  const [token, setToken] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleLogout = () => {
    setToken('');
    setLoggedInUser('');
    alert('Logged out successfully!');
  };

  return (
    <Router>
      <Navbar token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Apartments token={token} loggedInUser={loggedInUser} />} />
        <Route path="/login" element={
  token ? <Navigate to="/" /> :
  <Login onLogin={(accessToken) => {
    setToken(accessToken);
    const decoded = jwt_decode(accessToken);
    setLoggedInUser(decoded.username);
    localStorage.setItem('token', accessToken); // Optional: persist login
  }} />
} />

        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/verify-failed" element={<VerifyFailed />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />


      </Routes>
    </Router>
  );
}

export default App;

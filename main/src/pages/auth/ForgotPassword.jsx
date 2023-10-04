import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { auth } from '../../firebase';
import '../styles/forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a password reset email to the provided email address
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }

  return (
     <div className="form-body">
    <div className="login-container">
      <h2 className="auth-type-display">Forgot Password</h2>
      {emailSent ? (
        <p>An email with instructions to reset your password has been sent to your email address.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="type-field">
            <label>Email Address</label>
            <input type="email" className="input-field" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="submit-button">
            <button type="submit">Reset Password</button>
          </div>
        </form>
      )}
    </div>
  </div>
  );
}

export default ForgotPassword;

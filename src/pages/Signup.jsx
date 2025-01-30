import React from 'react';
import '../styles/pages/Signup.css';
import SignupForm from '../components/core/auth/SignupForm';

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-content">
        <h1 className="signup-heading">Welcome to Bank Information Management System</h1>
        <p className="signup-subheading">
          Create your account today to manage your bank accounts securely, track transactions, and stay in control of your finances.
        </p>
        <div>
          <SignupForm/>
        </div>
      </div>
     
    </div>
  );
}

export default Signup;

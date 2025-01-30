import React from 'react';
import LoginForm from '../components/core/auth/LoginForm';
import '../styles/pages/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-description">
          Login to your account to securely manage your bank accounts, view balances, and track transactions effortlessly.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;

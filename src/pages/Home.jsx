import React from 'react';
import '../styles/pages/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="content-box">
        <h1 className="title">Bank Information Management System</h1>
        <p className="description">
          Your one-stop solution for managing bank accounts, viewing balances, and securely tracking transactions. 
          We prioritize your financial data security and privacy.
        </p>
        <button 
          onClick={() => navigate("/signup")}
        className="get-started-btn">
          Get Started
          </button>
      </div>
    </div>
  );
};

export default Home;

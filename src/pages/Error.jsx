import React from 'react';

const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-message">Oops! Something went wrong.</h1>
      <p className="error-details">We couldn't find the page you're looking for. Please check the URL or try again later.</p>
    </div>
  );
};

export default Error;

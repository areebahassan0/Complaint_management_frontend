import React from "react";
import "./LoginPage.css"; // Import the CSS file

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Sign up button clicked!");
  };

  return (
    <div className="login-container">
      <header>
       
        <p className="login-heading">Sign in to your account</p>
      </header>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email Address" className="login-input" required />
        <input type="password" placeholder="Password" className="login-input" required />
        <small className="forgot-password">I&apos;ve forgotten my password</small>
        <button type="submit" className="login-button">Sign up</button>
      </form>
    </div>
  );
};

export default LoginPage;

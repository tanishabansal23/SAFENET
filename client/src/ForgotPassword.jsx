import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ChatbotWidget from "./components/ChatbotWidget";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/forgot-password", { email })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          setMessage("Password reset link sent to your email!");
          setTimeout(() => navigate("/login"), 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth-page">
      {/* Floating Chatbot Widget */}
      <ChatbotWidget />
      {/* Header */}
      <header className="auth-header">
        <div className="auth-logo" onClick={() => navigate("/")}>
          SafeNet
        </div>
        <button className="auth-back-btn" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </header>

      {/* Main Content */}
      <div className="auth-content">
        <div className="auth-container">
          <h2 className="auth-title">Forgot Password?</h2>
          <p className="auth-subtitle">
            Enter your email and we'll send you a reset link
          </p>

          {message && <div className="auth-success-message">{message}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your registered email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Send Reset Link
            </button>

            <p className="auth-link-text">
              Remember your password?{" "}
              <Link to="/login" className="auth-link">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ChatbotWidget from "./components/ChatbotWidget";
import "./Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
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
        <button className="auth-back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </header>

      {/* Main Content */}
      <div className="auth-content">
        <div className="auth-container">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">
            Join SafeNet and secure your digital assets
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
                autoComplete="new-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account
            </button>

            <div className="auth-divider">OR</div>

            <p className="auth-link-text">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

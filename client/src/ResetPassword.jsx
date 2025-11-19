import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ChatbotWidget from "./components/ChatbotWidget";
import "./Auth.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    axios
      .post(`http://localhost:3001/reset-password/${id}/${token}`, { password })
      .then((result) => {
        console.log(result);
        if (result.data.Status === "Success") {
          setMessage("Password updated successfully! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError("Token expired or password update failed");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred. Please try again.");
      });
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
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">Enter your new password below</p>

          {message && <div className="auth-success-message">{message}</div>}
          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter new password"
                autoComplete="new-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm new password"
                autoComplete="new-password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ChatbotWidget from "./components/ChatbotWidget";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    axios
      .post("/login", { email, password })
      .then((result) => {
        console.log("Login result:", result);
        
        if (result.data === "Success") {
          navigate("/home");
        } else if (result.data === "The password is incorrect") {
          setError("Incorrect password. Please try again.");
          setLoading(false);
        } else if (result.data === "No record found") {
          setError("No account found with this email.");
          setLoading(false);
        } else {
          setError("Login failed. Please try again.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("An error occurred. Please try again.");
        setLoading(false);
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
        <button className="auth-back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </header>

      {/* Main Content */}
      <div className="auth-content">
        <div className="auth-container">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to access your secure dashboard</p>

          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="forgot-password-link">
              <Link to="/forgot-password" className="auth-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="auth-divider">OR</div>

            <p className="auth-link-text">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

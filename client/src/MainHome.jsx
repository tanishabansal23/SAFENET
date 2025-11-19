import React from "react";
import { useNavigate } from "react-router-dom";
import ChatbotWidget from "./components/ChatbotWidget";
import ParticleBackground from "./components/ParticleBackground";
import MeshBackground from "./components/MeshBackground";
import Typewriter from "./components/Typewriter";
import "./MainHome.css";

function MainHome() {
  const navigate = useNavigate();

  return (
    <div className="main-home">
      {/* Animated Backgrounds */}
      <MeshBackground />
      <ParticleBackground />
      {/* Floating Chatbot Widget */}
      <ChatbotWidget />
      {/* Header */}
      <header className="header">
        <div className="logo">SafeNet</div>
        <div className="header-buttons">
          <button onClick={() => navigate("/scanner")} className="btn-header">
            Try Scanner
          </button>
          <button onClick={() => navigate("/login")} className="btn-header">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="btn-header">
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Protect. Encrypt. Empower Your Data.
          </h1>
          <p className="hero-description">
            <Typewriter
              texts={[
                "AI-driven threat detection and analysis",
                "Secure cloud storage with encryption",
                "Real-time link and file scanning",
                "Defend your digital assets with confidence",
              ]}
              speed={80}
              deleteSpeed={40}
              delay={2000}
            />
          </p>
          <button onClick={() => navigate("/register")} className="btn-get-started">
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <div className="cyber-animation">
            <div className="shield-icon">🛡️</div>
            <div className="scan-line"></div>
            <div className="data-particles">
              <span className="particle">🔒</span>
              <span className="particle">🔐</span>
              <span className="particle">🔑</span>
              <span className="particle">⚡</span>
            </div>
            <div className="security-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <div className="stat-number">1M+</div>
          <div className="stat-label">Threats Blocked</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500k+</div>
          <div className="stat-label">Secured Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">99.99%</div>
          <div className="stat-label">Uptime Reliability</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3 className="feature-title">AI Threat Detection</h3>
          <p className="feature-description">
            Detect and block malicious links, files, and scams using real-time AI threat analysis.
            SafeNet continuously learns from new threats to keep your data safe.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3 className="feature-title">Encrypted Cloud Storage</h3>
          <p className="feature-description">
            Secure your files with AES-256 encryption before upload. Only you have the key. All
            files are stored in AWS S3 with signed URL-based access.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3 className="feature-title">Real-Time Alerts & Insights</h3>
          <p className="feature-description">
            Get instant notifications for suspicious activity, login attempts, or new scans. Stay
            informed about your digital safety at all times.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">SafeNet</div>
            <p className="footer-tagline">
              Enterprise-grade malware scanning and AI-driven threat analysis. Privacy-first
              and developer friendly.
            </p>
            <p className="footer-copyright">© 2025 SafeNet</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#careers">Careers</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </div>
            <div className="footer-column">
              <h4>Contacts</h4>
              <a href="mailto:safenet@safenet.com">safenet@safenet.com</a>
              <a href="#support">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainHome;

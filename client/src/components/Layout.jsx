import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatbotWidget from "./ChatbotWidget";
import "./Layout.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const cursorGlowRef = useRef(null);

  const handleLogout = () => {
    // Clear any auth tokens/cookies if needed
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = e.clientX + "px";
        cursorGlowRef.current.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="layout">
      {/* Cursor Glow Effect */}
      <div ref={cursorGlowRef} className="cursor-glow"></div>
      {/* Floating Chatbot Widget */}
      <ChatbotWidget />
      {/* Header/Navbar */}
      <header className="layout-header">
        <div className="layout-logo" onClick={() => navigate("/home")}>
          SafeNet
        </div>
        <nav className="layout-nav">
          <button onClick={() => navigate("/home")} className="nav-link">
            Dashboard
          </button>
          <button onClick={() => navigate("/scanner")} className="nav-link">
            Scanner
          </button>
          <button onClick={() => navigate("/upload")} className="nav-link">
            Upload
          </button>
          <button onClick={handleLogout} className="nav-link logout-btn">
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="layout-content">{children}</main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">SafeNet</div>
            <p className="footer-tagline">
              Enterprise-grade malware scanning and AI-driven threat analysis.
              Privacy-first and developer friendly.
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

export default Layout;

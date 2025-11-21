import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import ParticleBackground from "./components/ParticleBackground";
import ScrollReveal from "./components/ScrollReveal";
import Tooltip from "./components/Tooltip";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [filesScanned, setFilesScanned] = useState(0);
  const [threatsDetected, setThreatsDetected] = useState(0);
  const [filesUploaded, setFilesUploaded] = useState(0);
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("/home")
      .then((result) => {
        console.log(result);
        if (result.data !== "Success") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

  // Animated counter effect
  useEffect(() => {
    const animateCounter = (setter, target, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateCounter(setFilesScanned, 127);
    animateCounter(setThreatsDetected, 3);
    animateCounter(setFilesUploaded, 45);
  }, []);

  return (
    <Layout>
      <ParticleBackground />
      <div className="home-dashboard">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome Back to SafeNet</h1>
          <p className="welcome-subtitle">
            Your secure dashboard for file scanning and threat detection
          </p>
        </div>

        <div className="dashboard-cards">
          <ScrollReveal delay={100}>
            <div
              className="dashboard-card"
              onClick={() => navigate("/scanner")}
            >
              <Tooltip text="Scan files and URLs for threats" position="top">
                <div className="card-icon">🔍</div>
              </Tooltip>
              <h3 className="card-title">Virus Scanner</h3>
              <p className="card-description">
                Scan files and URLs for malware using VirusTotal API
              </p>
              <button className="card-button">Start Scanning</button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              className="dashboard-card"
              onClick={() => navigate("/upload")}
            >
              <Tooltip text="Upload files securely to cloud" position="top">
                <div className="card-icon">☁️</div>
              </Tooltip>
              <h3 className="card-title">Cloud Storage</h3>
              <p className="card-description">
                Securely upload and manage your encrypted files
              </p>
              <button className="card-button">Upload Files</button>
            </div>
          </ScrollReveal>
        </div>

        <div className="stats-section">
          <div className="stat-box">
            <div className="stat-value">{filesScanned}</div>
            <div className="stat-label">Files Scanned</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{threatsDetected}</div>
            <div className="stat-label">Threats Detected</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{filesUploaded}</div>
            <div className="stat-label">Files Uploaded</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

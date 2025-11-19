import React, { useState } from "react";
import Layout from "./Layout";
import "./FileUpload.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 2500);
  };

  const handleUpload = async () => {
    if (!file) {
      showAlert("Please select a file to upload!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/files/", {
        method: "POST",
        body: formData,
      });

      const uploadTime = new Date().toLocaleString();

      if (res.ok) {
        showAlert("You have successfully uploaded the file!", "success");
        setHistory((prev) => [
          {
            name: file.name,
            status: "Uploaded successfully",
            time: uploadTime,
          },
          ...prev,
        ]);
        setFile(null);
      } else {
        showAlert("Upload failed. Try again.", "error");
        setHistory((prev) => [
          {
            name: file.name,
            status: "Upload failed",
            time: uploadTime,
          },
          ...prev,
        ]);
      }
    } catch (error) {
      console.error(error);
      showAlert("Server error. Try again later.", "error");
      setHistory((prev) => [
        {
          name: file.name,
          status: "Upload failed",
          time: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    }
  };

  return (
    <Layout>
      <div className="upload-page">
        <h1 className="main-heading">
          Upload your files to cloud safely and securely
        </h1>

        {/* Alert Popup */}
        {alert.message && (
          <div className={`alert-popup ${alert.type}`}>{alert.message}</div>
        )}

        {/* Upload Section */}
        <div className="upload-container">
          <h2>Upload your files from here</h2>
          <div className="upload-box">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
            <button className="upload-btn" onClick={handleUpload}>
              Upload
            </button>
          </div>
        </div>

        {/* History Section */}
        <div className="history-container">
          <h3>Upload History</h3>
          {history.length === 0 ? (
            <p className="no-history">No files uploaded yet.</p>
          ) : (
            <ul className="history-list">
              {history.map((item, index) => (
                <li key={index} className="history-item">
                  <span className="file-name">{item.name}</span>
                  <span
                    className={`status ${
                      item.status.includes("failed") ? "failed" : "success"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="upload-time">{item.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FileUpload;

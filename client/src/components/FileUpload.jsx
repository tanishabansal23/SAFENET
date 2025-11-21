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
      // Use specific file upload API from environment variable
      const FILE_UPLOAD_API =
        import.meta.env.VITE_FILE_UPLOAD_API ||
        "http://localhost:3001/api/files";
      
      console.log("Uploading to:", `${FILE_UPLOAD_API}/api/files/`);
      
      const res = await fetch(`${FILE_UPLOAD_API}/api/files/`, {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
      });

      const uploadTime = new Date().toLocaleString();

      // Log response for debugging
      console.log("Upload response status:", res.status);
      console.log("Upload response ok:", res.ok);

      // Clone response to read it multiple times if needed
      const resClone = res.clone();
      let responseData = null;

      try {
        // Try to parse as JSON
        responseData = await res.json();
        console.log("Upload response data:", responseData);
      } catch (err) {
        // If JSON parsing fails, try text
        try {
          responseData = await resClone.text();
          console.log("Upload response text:", responseData);
        } catch (textErr) {
          console.log("Could not parse response");
        }
      }

      // Consider status codes 200-299 as success
      // Also check if file actually uploaded (your teammate confirms it's in S3)
      if (res.status >= 200 && res.status < 300) {
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
        // Clear the file input
        document.querySelector(".file-input").value = "";
      } else {
        // Show error with status code
        const errorMsg =
          responseData?.message ||
          responseData?.error ||
          `Upload failed with status ${res.status}`;
        showAlert(errorMsg, "error");
        setHistory((prev) => [
          {
            name: file.name,
            status: `Upload failed: ${res.status}`,
            time: uploadTime,
          },
          ...prev,
        ]);
      }
    } catch (error) {
      console.error("Upload error:", error);
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

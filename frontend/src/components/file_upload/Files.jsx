import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Files.css"; // Importing CSS for styling

const Files = () => {
  const { user, loading } = useAuth();
  const [files, setFiles] = useState({ nid: null, cv: null, certificate: null });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You need to log in to upload files.</p>;

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsUploading(true);

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:9999/api/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <h1 className="title">Upload Your Documents</h1>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="file-upload-form">
        <div className="form-group">
          <label htmlFor="nid" className="form-label">National ID (NID):</label>
          <input
            type="file"
            id="nid"
            name="nid"
            accept=".pdf,.doc,.docx"
            className="form-input"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cv" className="form-label">CV:</label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.doc,.docx"
            className="form-input"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="certificate" className="form-label">Certificate:</label>
          <input
            type="file"
            id="certificate"
            name="certificate"
            accept=".pdf,.doc,.docx"
            className="form-input"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="submit-button" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Files;

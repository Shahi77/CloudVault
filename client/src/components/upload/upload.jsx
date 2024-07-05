import React, { useState } from "react";
import "./upload.css";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("uploadedFile", file);

      try {
        const token = getCookie("accessToken");
        if (!token) {
          alert("No token found. Please log in.");
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/v1/files/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result = await response.json();
        if (response.ok) {
          alert(`File uploaded successfully: ${result.data.name}`);
        } else {
          alert(`Error uploading file: ${result.message}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      }
    } else {
      alert("Please choose a file first.");
    }
  };

  return (
    <div className="upload-container">
      <div className="file-actions">
        <label htmlFor="file-upload" className="action-button">
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button className="action-button" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
}

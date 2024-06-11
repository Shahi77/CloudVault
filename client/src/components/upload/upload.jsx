import React, { useState } from "react";
import "./upload.css";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log("File to upload:", file);
      alert(`File ${file.name} is ready to be uploaded.`);
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

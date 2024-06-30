import React, { useState } from "react";
import "./search.css";

export default function Search() {
  const handleSearchClick = () => {
    alert("Search functionality not implemented yet.");
  };

  const handleDownloadClick = () => {
    alert("Download functionality not implemented yet.");
  };

  const handleShareClick = () => {
    alert("Share functionality not implemented yet.");
  };

  return (
    <div className="search-container">
      <div>
        <div className="search-input-container">
          <label htmlFor="filename" className="search-label">
            Enter Filename to search:
          </label>
          <input type="text" id="filename" className="search-input" />
        </div>
        <div className="button-group">
          <button onClick={handleSearchClick}>Search</button>
          <button onClick={handleDownloadClick}>Download</button>
          <button onClick={handleShareClick}>Share</button>
        </div>
      </div>
    </div>
  );
}

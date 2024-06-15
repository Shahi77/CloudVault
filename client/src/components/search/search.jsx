import React, { useState } from "react";
import "./search.css";

export default function Search() {
  const [showButtons, setShowButtons] = useState(false);

  const handleShowFilesClick = () => {
    setShowButtons(true);
  };

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
      {!showButtons && (
        <label className="show-files-label" onClick={handleShowFilesClick}>
          Show files
        </label>
      )}
      {showButtons && (
        <div>
          <div className="search-input-container">
            <span className="search-label">Enter Filename to search:</span>
            <input type="text" className="search-input" />
          </div>
          <div className="button-group">
            <button onClick={handleSearchClick}>Search</button>
            <button onClick={handleDownloadClick}>Download</button>
            <button onClick={handleShareClick}>Share</button>
          </div>
        </div>
      )}
    </div>
  );
}

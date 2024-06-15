import React, { useState } from "react";
import "./homePage.css";
import Upload from "../../components/upload/upload";
import Search from "../../components/search/search";

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState("upload");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="radio-inputs-container">
      <h2>Secure upload and Instant search</h2>
      <div className="radio-inputs">
        <label className="radio">
          <input
            type="radio"
            name="radio"
            value="upload"
            checked={selectedOption === "upload"}
            onChange={handleOptionChange}
          />
          <span className="name">Upload</span>
        </label>
        <label className="radio">
          <input
            type="radio"
            name="radio"
            value="search"
            checked={selectedOption === "search"}
            onChange={handleOptionChange}
          />
          <span className="name">Show files</span>
        </label>
      </div>
      {selectedOption === "upload" && <Upload />}
      {selectedOption === "search" && <Search />}
    </div>
  );
}

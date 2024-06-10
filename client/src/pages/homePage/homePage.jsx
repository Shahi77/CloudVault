import React, { useState } from "react";
import "./homePage.css";

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState("upload");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
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
        <span className="name">Search</span>
      </label>
    </div>
  );
}

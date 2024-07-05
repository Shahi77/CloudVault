import "./App.css";
import HomePage from "./pages/homePage/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import React, { useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          ) : (
            <Route path="/" element={<HomePage />} />
          )}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

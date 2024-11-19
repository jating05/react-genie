// src/components/DarkModeToggle.js
import React from 'react';
import './DarkModeToggle.css'; // Styles specific to the toggle

function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <div className="dark-mode-toggle" onClick={toggleDarkMode}>
      <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default DarkModeToggle;
// src/App.js
import React, { useState, useEffect } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import ApplyGenieForm from './components/ApplyGenieForm';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <div>
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mt-5 fade-in">
        <h2 className="mb-4 text-center">Apply Genie</h2>
        <ApplyGenieForm />
      </div>
    </div>
  );
}

export default App;

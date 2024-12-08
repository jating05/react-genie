// src/components/FirstNameInput.js
import React from 'react';

function FirstNameInput({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="firstName" className="form-label">First Name</label>
      <input
        type="text"
        className="form-control"
        id="firstName"
        name="firstName"
        value={value}
        onChange={onChange}
        placeholder="Enter First Name"
        // TODO: Connect to backend for validation or autocomplete if needed
      />
    </div>
  );
}

export default FirstNameInput;
// src/components/LastNameInput.js
import React from 'react';

function LastNameInput({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="lastName" className="form-label">Last Name</label>
      <input
        type="text"
        className="form-control"
        id="lastName"
        name="lastName"
        value={value}
        onChange={onChange}
        placeholder="Enter Last Name"
        // TODO: Connect to backend for validation or autocomplete if needed
      />
    </div>
  );
}

export default LastNameInput;
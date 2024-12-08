// src/components/DOBInput.js
import React from 'react';

function DOBInput({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="dob" className="form-label">Date of Birth</label>
      <input
        type="date"
        className="form-control"
        id="dob"
        name="dob"
        value={value}
        onChange={onChange}
        // TODO: Connect to backend for age verification if needed
      />
    </div>
  );
}

export default DOBInput;
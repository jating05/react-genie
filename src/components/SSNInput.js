// src/components/SSNInput.js
import React from 'react';

function SSNInput({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="ssn" className="form-label">SSN</label>
      <input
        type="text"
        className="form-control"
        id="ssn"
        name="ssn"
        value={value}
        onChange={onChange}
        placeholder="Enter SSN"
        // TODO: Validate SSN format and connect to backend if needed
      />
    </div>
  );
}

export default SSNInput;

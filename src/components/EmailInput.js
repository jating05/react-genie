// src/components/EmailInput.js
import React from 'react';

function EmailInput({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="email" className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        value={value}
        onChange={onChange}
        placeholder="Enter Email"
        // TODO: Connect to backend for email validation or verification
      />
    </div>
  );
}

export default EmailInput;
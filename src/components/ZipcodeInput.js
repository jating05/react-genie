// src/components/ZipcodeInput.js
import React from 'react';

function ZipcodeInput({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="zipcode" className="form-label">Zip Code</label>
      <input
        type="text"
        className="form-control"
        id="zipcode"
        name="zipcode"
        value={value}
        onChange={onChange}
        placeholder="Enter Zip Code"
        // TODO: Connect to backend for zip code validation or fetching related city/state
      />
    </div>
  );
}

export default ZipcodeInput;
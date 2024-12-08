// src/components/Address1Input.js
import React from 'react';

function Address1Input({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="address1" className="form-label">Address Line 1</label>
      <input
        type="text"
        className="form-control"
        id="address1"
        name="address1"
        value={value}
        onChange={onChange}
        placeholder="Enter Address Line 1"
        // TODO: Connect to backend for address validation or autocomplete
      />
    </div>
  );
}

export default Address1Input;
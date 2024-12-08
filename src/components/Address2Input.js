// src/components/Address2Input.js
import React from 'react';

function Address2Input({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="address2" className="form-label">Address Line 2</label>
      <input
        type="text"
        className="form-control"
        id="address2"
        name="address2"
        value={value}
        onChange={onChange}
        placeholder="Enter Address Line 2"
        // TODO: Optional field, connect to backend if additional address details are needed
      />
    </div>
  );
}

export default Address2Input;
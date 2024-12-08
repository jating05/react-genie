// src/components/HaveSSNRadio.js
import React from 'react';

function HaveSSNRadio({ value, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">Do you have an SSN?</label>
      <div>
        <label>
          <input
            type="radio"
            name="haveSSN"
            value="Yes"
            checked={value === 'Yes'}
            onChange={onChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="haveSSN"
            value="No"
            checked={value === 'No'}
            onChange={onChange}
          />
          No
        </label>
      </div>
    </div>
  );
}

export default HaveSSNRadio;
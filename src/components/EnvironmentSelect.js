// src/components/EnvironmentSelect.js
import React from 'react';

function EnvironmentSelect({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="environment" className="form-label">Environment</label>
      <select
        className="form-select"
        id="environment"
        name="environment"
        value={value}
        onChange={onChange}
      >
        <option value="Any">Any</option>
        <option value="Production">Production</option>
        <option value="Staging">Staging</option>
        <option value="Development">Development</option>
      </select>
    </div>
  );
}

export default EnvironmentSelect;
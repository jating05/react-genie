// src/components/ConditionForCheckbox.js
import React from 'react';

function ConditionForCheckbox({ value, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">Condition For</label>
      <div>
        <label>
          <input
            type="checkbox"
            name="conditionFor"
            checked={value === 'Loans'}
            onChange={(e) => onChange(e.target.checked ? 'Loans' : 'Generic')}
          />
          Loans
        </label>
      </div>
      {/* 
        TODO: If 'Loans' is selected, additional fields can be displayed or fetched from backend
      */}
    </div>
  );
}

export default ConditionForCheckbox;
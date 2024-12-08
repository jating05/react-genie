// src/components/CPCSelect.js
import React, { useState, useEffect } from 'react';

function CPCSelect({ partner, value, onChange }) {
  const [cpcs, setCpcs] = useState([]);

  useEffect(() => {
    if (partner) {
      // TODO: Fetch CPCs based on selected partner from backend API
      // Dummy data for now
      const dummyCPCs = {
        Partner1: ['CPC1', 'CPC2'],
        Partner2: ['CPC3', 'CPC4'],
        Partner3: ['CPC5', 'CPC6'],
      };
      setCpcs(dummyCPCs[partner] || []);
    } else {
      setCpcs([]);
    }
  }, [partner]);

  return (
    <div className="form-group">
      <label htmlFor="cpc" className="form-label">CPC</label>
      <select
        className="form-select"
        id="cpc"
        name="cpc"
        value={value}
        onChange={onChange}
      >
        <option value="">-- Select CPC --</option>
        {cpcs.map((cpc) => (
          <option key={cpc} value={cpc}>
            {cpc}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CPCSelect;
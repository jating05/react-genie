// src/components/PartnerSelect.js
import React, { useState, useEffect } from 'react';

function PartnerSelect({ value, onChange }) {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // TODO: Fetch partners from backend API
    // Dummy data for now
    setPartners(['Partner1', 'Partner2', 'Partner3']);
  }, []);

  return (
    <div className="form-group">
      <label htmlFor="partner" className="form-label">Partner</label>
      <select
        className="form-select"
        id="partner"
        name="partner"
        value={value}
        onChange={onChange}
      >
        <option value="">-- Select Partner --</option>
        {partners.map((partner) => (
          <option key={partner} value={partner}>
            {partner}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PartnerSelect;
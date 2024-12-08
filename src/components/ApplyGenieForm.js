// src/components/ApplyGenieForm.js
import React, { useState, useEffect } from 'react';
import './ApplyGenieForm.css'; // [ApplyGenieForm.css](src/components/ApplyGenieForm.css)
import PartnerSelect from './PartnerSelect'; // [PartnerSelect.js](src/components/PartnerSelect.js)
import CPCSelect from './CPCSelect'; // [CPCSelect.js](src/components/CPCSelect.js)
import EnvironmentSelect from './EnvironmentSelect'; // [EnvironmentSelect.js](src/components/EnvironmentSelect.js)
import HaveSSNRadio from './HaveSSNRadio'; // [HaveSSNRadio.js](src/components/HaveSSNRadio.js)
import SSNInput from './SSNInput'; // [SSNInput.js](src/components/SSNInput.js)
import ConditionForCheckbox from './ConditionForCheckbox'; // [ConditionForCheckbox.js](src/components/ConditionForCheckbox.js)
import FirstNameInput from './FirstNameInput'; // [FirstNameInput.js](src/components/FirstNameInput.js)
import LastNameInput from './LastNameInput'; // [LastNameInput.js](src/components/LastNameInput.js)
import DOBInput from './DOBInput'; // [DOBInput.js](src/components/DOBInput.js)
import Address1Input from './Address1Input'; // [Address1Input.js](src/components/Address1Input.js)
import Address2Input from './Address2Input'; // [Address2Input.js](src/components/Address2Input.js)
import ZipcodeInput from './ZipcodeInput'; // [ZipcodeInput.js](src/components/ZipcodeInput.js)
import EmailInput from './EmailInput'; // [EmailInput.js](src/components/EmailInput.js)

function ApplyGenieForm() {
  // Form state
  const [formData, setFormData] = useState({
    environment: 'Any',
    partner: '',
    cpc: '',
    haveSSN: '',
    ssn: '',
    conditionFor: 'Generic', // Default to 'Generic'
    personalDetails: {
      firstName: '',
      lastName: '',
      dob: '',
      address1: '',
      address2: '',
      zipcode: '',
      email: '',
    },
  });

  // Partners and CPCs data
  const partnerCPCData = {
    Partner1: ['CPC1', 'CPC2'],
    Partner2: ['CPC3', 'CPC4'],
    Partner3: ['CPC5', 'CPC6'],
  };

  const [allCPCs, setAllCPCs] = useState([]);
  const [partners, setPartners] = useState([]);
  const [cpcs, setCpcs] = useState([]);

  // Fetch partners (simulated API call)
  useEffect(() => {
    const fetchPartners = () => {
      // TODO: Replace with backend API call
      // Example:
      // fetch('https://your-backend-api.com/partners')
      //   .then(response => response.json())
      //   .then(data => setPartners(data))
      setPartners(['Partner1', 'Partner2', 'Partner3']); // Dummy data
    };

    fetchPartners();
  }, []);

  // Handle Partner selection to populate CPCs
  useEffect(() => {
    if (formData.partner) {
      // TODO: Replace with backend API call to fetch CPCs based on selected partner
      // Example:
      // fetch(`https://your-backend-api.com/cpcs?partner=${formData.partner}`)
      //   .then(response => response.json())
      //   .then(data => setCpcs(data))
      setCpcs(partnerCPCData[formData.partner] || []); // Dummy data
    } else {
      setCpcs([]);
    }
    setFormData((prevData) => ({ ...prevData, cpc: '' }));
  }, [formData.partner]);

  // Handle input changes
  const handleChange = (name, value) => {
    if (name in formData.personalDetails) {
      setFormData((prevData) => ({
        ...prevData,
        personalDetails: {
          ...prevData.personalDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate mandatory fields
    if (!formData.cpc) {
      alert('CPC is mandatory.');
      return;
    }
    if (!formData.haveSSN) {
      alert('Please select if you have an SSN.');
      return;
    }
    if (formData.haveSSN === 'Yes' && !formData.ssn) {
      alert('SSN is mandatory.');
      return;
    }

    // Send form data to dummy API endpoint
    sendFormData(formData)
      .then((response) => {
        alert('Form submitted successfully!');
        console.log('Response:', response);
        // Optionally reset the form
        // setFormData({ ...initialState });
      })
      .catch((error) => {
        alert('Error submitting form.');
        console.error('Error:', error);
      });
  };

  // Send form data to API
  const sendFormData = (data) => {
    const apiUrl = 'https://dummyapi.example.com/submit'; // [API Endpoint](https://dummyapi.example.com/submit)

    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Assuming the API returns JSON
    });
  };

  return (
    <form
      id="applyGenieForm"
      className="card p-4 shadow-sm animate__animated animate__fadeInLeft"
      onSubmit={handleSubmit}
    >
      {/* Environment Field */}
      <EnvironmentSelect
        value={formData.environment}
        onChange={(value) => handleChange('environment', value)}
      />

      {/* Partner Field */}
      <PartnerSelect
        value={formData.partner}
        onChange={(value) => handleChange('partner', value)}
      />

      {/* CPC Field */}
      <CPCSelect
        partner={formData.partner}
        value={formData.cpc}
        onChange={(value) => handleChange('cpc', value)}
      />

      {/* Condition For Checkbox */}
      <ConditionForCheckbox
        value={formData.conditionFor}
        onChange={(value) => handleChange('conditionFor', value)}
      />

      {/* Have SSN Radio */}
      <HaveSSNRadio
        value={formData.haveSSN}
        onChange={(value) => handleChange('haveSSN', value)}
      />

      {/* SSN Input */}
      {formData.haveSSN === 'Yes' && (
        <SSNInput
          value={formData.ssn}
          onChange={(value) => handleChange('ssn', value)}
        />
      )}

      {/* Personal Details */}
      <div id="personalDetails">
        <FirstNameInput
          value={formData.personalDetails.firstName}
          onChange={(value) => handleChange('firstName', value)}
        />

        <LastNameInput
          value={formData.personalDetails.lastName}
          onChange={(value) => handleChange('lastName', value)}
        />

        <DOBInput
          value={formData.personalDetails.dob}
          onChange={(value) => handleChange('dob', value)}
        />

        <Address1Input
          value={formData.personalDetails.address1}
          onChange={(value) => handleChange('address1', value)}
          disabled={formData.conditionFor === 'Loans'}
        />

        <Address2Input
          value={formData.personalDetails.address2}
          onChange={(value) => handleChange('address2', value)}
          disabled={formData.conditionFor === 'Loans'}
        />

        <ZipcodeInput
          value={formData.personalDetails.zipcode}
          onChange={(value) => handleChange('zipcode', value)}
          disabled={formData.conditionFor === 'Loans'}
        />

        <EmailInput
          value={formData.personalDetails.email}
          onChange={(value) => handleChange('email', value)}
          disabled={formData.conditionFor === 'Loans'}
        />
      </div>

      {/* Submit Buttons */}
      <div className="d-flex justify-content-between mt-3">
        <button type="submit" className="btn btn-success me-2" id="applyBtn">
          <i className="fas fa-check-circle"></i> Apply
        </button>
        <button
          type="button"
          className="btn btn-primary"
          id="applyRegisterBtn"
          onClick={() => alert('Registration process initiated.')} // TODO: Implement registration logic
        >
          <i className="fas fa-user-plus"></i> Apply and Register
        </button>
      </div>
    </form>
  );
}

export default ApplyGenieForm;
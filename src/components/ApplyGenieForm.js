// src/components/ApplyGenieForm.js
import React, { useState, useEffect } from 'react';
import './ApplyGenieForm.css'; // Custom styles

function ApplyGenieForm() {
  // Form state
  const [formData, setFormData] = useState({
    environment: 'Any',
    partner: '',
    cpc: '',
    haveSSN: '',
    ssn: '',
    conditionFor: '',
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

  const allCPCs = Object.entries(partnerCPCData).flatMap(
    ([partner, cpcs]) => cpcs.map((cpc) => `${partner}: ${cpc}`)
  );

  const [partners, setPartners] = useState([]);
  const [cpcs, setCpcs] = useState([]);

  // Fetch partners (simulated API call)
  useEffect(() => {
    const fetchPartners = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(partnerCPCData);
        }, 500);
      });
    };

    fetchPartners().then((data) => {
      setPartners(Object.keys(data));
    });
  }, []);

  // Handle Partner selection to populate CPCs
  useEffect(() => {
    if (formData.partner) {
      setCpcs(partnerCPCData[formData.partner]);
    } else {
      setCpcs(allCPCs);
    }
    setFormData((prevData) => ({ ...prevData, cpc: '' }));
  }, [formData.partner]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'haveSSN') {
      setFormData((prevData) => ({
        ...prevData,
        haveSSN: checked ? value : prevData.haveSSN,
      }));
    } else if (name === 'conditionFor') {
      setFormData((prevData) => ({
        ...prevData,
        conditionFor: checked ? value : '',
      }));
    } else if (name in formData.personalDetails) {
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

  // Handle SSN generation
  const autoGenerateSSN = () => {
    const randomSSN = Math.floor(1000000 + Math.random() * 9000000).toString();
    setFormData((prevData) => ({
      ...prevData,
      ssn: randomSSN,
    }));
  };

  // Handle radio button changes for Have SSN
  const handleHaveSSNChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      haveSSN: value,
    }));
    if (value === 'No') {
      autoGenerateSSN();
    } else {
      setFormData((prevData) => ({ ...prevData, ssn: '' }));
    }
  };

  // Handle Condition For changes
  const handleConditionForChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      conditionFor: value,
    }));
    if (value === 'Loans') {
      autopopulateLoans();
    } else if (value === 'Generic') {
      autopopulateGeneric();
    }
  };

  // Autopopulate functions
  const autopopulateLoans = () => {
    setFormData((prevData) => ({
      ...prevData,
      personalDetails: {
        ...prevData.personalDetails,
        firstName: 'bcus',
        lastName: 'Cltest',
        dob: '1994-09-09',
        address1: '',
        address2: '',
        zipcode: '',
        email: '',
      },
    }));
  };

  const autopopulateGeneric = () => {
    setFormData((prevData) => ({
      ...prevData,
      personalDetails: {
        firstName: getRandomFirstName(),
        lastName: getRandomLastName(),
        dob: getRandomDOB(),
        address1: getRandomAddress1(),
        address2: getRandomAddress2(),
        zipcode: getRandomZipcode(),
        email: getRandomEmail(),
      },
    }));
  };

  // Random data generators
  const getRandomFirstName = () => {
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Emily', 'Daniel', 'Sophia'];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  };

  const getRandomLastName = () => {
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson'];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  };

  const getRandomDOB = () => {
    const start = new Date(1970, 0, 1);
    const end = new Date(2000, 11, 31);
    const dob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return dob.toISOString().split('T')[0];
  };

  const getRandomAddress1 = () => {
    const addresses = ['123 Main St', '456 Elm St', '789 Oak St', '321 Pine St', '654 Maple St', '987 Cedar Ave'];
    return addresses[Math.floor(Math.random() * addresses.length)];
  };

  const getRandomAddress2 = () => {
    const addresses = ['Apt 1', 'Suite 200', 'Floor 3', 'Unit 4B', '', ''];
    return addresses[Math.floor(Math.random() * addresses.length)];
  };

  const getRandomZipcode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const getRandomEmail = () => {
    const domains = ['example.com', 'mail.com', 'test.org', 'demo.net', 'genie.com'];
    const firstName = getRandomFirstName().toLowerCase();
    const lastName = getRandomLastName().toLowerCase();
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName}.${lastName}@${domain}`;
  };

  // Handle AutoPopulate button click
  const handleAutoPopulate = () => {
    if (formData.conditionFor === 'Loans') {
      autopopulateLoans();
    } else if (formData.conditionFor === 'Generic') {
      autopopulateGeneric();
    } else {
      alert('Please select a Condition For option.');
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
    if (!formData.conditionFor) {
      alert('Condition For is mandatory.');
      return;
    }
    if (!formData.haveSSN) {
      alert('Please select if you have a SSN.');
      return;
    }
    if (!formData.ssn) {
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
    const apiUrl = 'https://dummyapi.example.com/submit';

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

  // Handle 'Apply and Register' button
  const handleApplyRegister = () => {
    // Trigger form submission
    handleSubmit(new Event('submit'));
    // After successful submission, implement registration logic
    // For demonstration, we'll show an alert
    alert('Registration process initiated.');
  };

  return (
    <form id="applyGenieForm" className="card p-4 shadow-sm animate__animated animate__fadeInLeft" onSubmit={handleSubmit}>
      {/* Environment Field */}
      <div className="mb-3 form-group">
        <label htmlFor="environment" className="form-label">Environment</label>
        <select
          className="form-select"
          id="environment"
          name="environment"
          value={formData.environment}
          onChange={handleChange}
        >
          <option value="Any">Any</option>
          <option value="QA01">QA01</option>
          <option value="QA02">QA02</option>
        </select>
      </div>

      {/* Partner Field */}
      <div className="mb-3 form-group">
        <label htmlFor="partner" className="form-label">Partner</label>
        <select
          className="form-select"
          id="partner"
          name="partner"
          value={formData.partner}
          onChange={handleChange}
        >
          <option value="">-- Select Partner --</option>
          {partners.map((partner) => (
            <option key={partner} value={partner}>
              {partner}
            </option>
          ))}
        </select>
      </div>

      {/* CPC Field */}
      <div className="mb-3 form-group">
        <label htmlFor="cpc" className="form-label">CPC <span className="text-danger">*</span></label>
        <select
          className="form-select"
          id="cpc"
          name="cpc"
          value={formData.cpc}
          onChange={handleChange}
          required
        >
          <option value="">-- Select CPC --</option>
          {cpcs.map((cpc, index) => (
            <option key={index} value={cpc}>
              {cpc}
            </option>
          ))}
        </select>
      </div>

      {/* Have a SSN Field */}
      <div className="mb-3 form-group">
        <label className="form-label">Have a SSN</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="haveSSNYes"
              name="haveSSN"
              value="Yes"
              checked={formData.haveSSN === 'Yes'}
              onChange={() => handleHaveSSNChange('Yes')}
            />
            <label className="form-check-label" htmlFor="haveSSNYes">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="haveSSNNo"
              name="haveSSN"
              value="No"
              checked={formData.haveSSN === 'No'}
              onChange={() => handleHaveSSNChange('No')}
            />
            <label className="form-check-label" htmlFor="haveSSNNo">No</label>
          </div>
        </div>
      </div>

      {/* SSN Field */}
      <div className="mb-3 form-group">
        <label htmlFor="ssn" className="form-label">SSN</label>
        <div className="input-group">
          <span className="input-group-text" id="ssn-icon">
            <i className="fas fa-id-card-alt"></i>
          </span>
          <input
            type="number"
            className="form-control"
            id="ssn"
            name="ssn"
            placeholder="Enter SSN"
            aria-label="SSN"
            aria-describedby="ssn-icon"
            value={formData.ssn}
            onChange={handleChange}
            required={formData.haveSSN === 'Yes'}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            id="autoGenerateSSN"
            onClick={autoGenerateSSN}
          >
            <i className="fas fa-redo"></i> Autogenerate
          </button>
        </div>
      </div>

      {/* Condition For Field */}
      <div className="mb-3 form-group">
        <label className="form-label">Condition For <span className="text-danger">*</span></label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="conditionLoans"
              name="conditionFor"
              value="Loans"
              checked={formData.conditionFor === 'Loans'}
              onChange={() => handleConditionForChange('Loans')}
            />
            <label className="form-check-label" htmlFor="conditionLoans">Loans</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="conditionGeneric"
              name="conditionFor"
              value="Generic"
              checked={formData.conditionFor === 'Generic'}
              onChange={() => handleConditionForChange('Generic')}
            />
            <label className="form-check-label" htmlFor="conditionGeneric">Generic</label>
          </div>
        </div>
      </div>

      {/* AutoPopulate Button */}
      <div className="mb-3 form-group">
        <button
          type="button"
          className="btn btn-primary w-100"
          id="autoPopulateBtn"
          onClick={handleAutoPopulate}
        >
          <i className="fas fa-fill-drip"></i> AutoPopulate
        </button>
      </div>

      {/* Personal Details Fields */}
      <div
        id="personalDetails"
        className={`mb-3 form-group ${formData.conditionFor === 'Loans' ? 'faded' : ''}`}
      >
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.personalDetails.firstName}
            onChange={handleChange}
            required={formData.conditionFor !== 'Loans'}
            disabled={formData.conditionFor === 'Loans'}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.personalDetails.lastName}
            onChange={handleChange}
            required={formData.conditionFor !== 'Loans'}
            disabled={formData.conditionFor === 'Loans'}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">DOB</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={formData.personalDetails.dob}
            onChange={handleChange}
            disabled={formData.conditionFor === 'Loans'}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address1" className="form-label">Address1</label>
          <input
            type="text"
            className="form-control"
            id="address1"
            name="address1"
            value={formData.personalDetails.address1}
            onChange={handleChange}
            disabled={formData.conditionFor === 'Loans'}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address2" className="form-label">Address2</label>
          <input
            type="text"
            className="form-control"
            id="address2"
            name="address2"
            value={formData.personalDetails.address2}
            onChange={handleChange}
            disabled={formData.conditionFor === 'Loans'}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="zipcode" className="form-label">Zipcode</label>
          <input
            type="text"
            className="form-control"
            id="zipcode"
            name="zipcode"
            value={formData.personalDetails.zipcode}
            onChange={handleChange}
            disabled={formData.conditionFor === 'Loans'}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.personalDetails.email}
            onChange={handleChange}
            disabled={formData.conditionFor === 'Loans'}
          />
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="mb-3 d-flex justify-content-between">
        <button type="submit" className="btn btn-success me-2" id="applyBtn">
          <i className="fas fa-check-circle"></i> Apply
        </button>
        <button
          type="button"
          className="btn btn-primary"
          id="applyRegisterBtn"
          onClick={handleApplyRegister}
        >
          <i className="fas fa-user-plus"></i> Apply and Register
        </button>
      </div>
    </form>
  );
}

export default ApplyGenieForm;

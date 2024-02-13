import React, { useState } from 'react';

function AgentRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    contactInformation: '',
    expertise: '',
    transactionHistory: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Agent registered:', data);
    } catch (error) {
      console.error('Error registering agent:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Agent Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="contactInformation" className="form-label">Contact Information:</label>
          <input type="text" className="form-control" id="contactInformation" name="contactInformation" value={formData.contactInformation} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="expertise" className="form-label">Expertise:</label>
          <input type="text" className="form-control" id="expertise" name="expertise" value={formData.expertise} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="transactionHistory" className="form-label">Transaction History:</label>
          <input type="text" className="form-control" id="transactionHistory" name="transactionHistory" value={formData.transactionHistory} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register Agent</button>
      </form>
    </div>
  );
}

export default AgentRegistrationForm;

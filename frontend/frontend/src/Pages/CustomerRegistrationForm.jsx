import React, { useState } from 'react';

function CustomerRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    contactInformation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Customer registered:', data);
    } catch (error) {
      console.error('Error registering customer:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="contactInformation" className="form-label">Contact Information:</label>
          <input type="text" className="form-control" id="contactInformation" name="contactInformation" value={formData.contactInformation} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register Customer</button>
      </form>
    </div>
  );
}

export default CustomerRegistrationForm;

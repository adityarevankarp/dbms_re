import React, { useState } from 'react';

function PropertyForm() {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    size: '',
    price: '',
    availability: '',
    agentId: '' // New field for agent ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Property added:', data);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Property Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type:</label>
          <input type="text" className="form-control" id="type" name="type" value={formData.type} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="size" className="form-label">Size:</label>
          <input type="text" className="form-control" id="size" name="size" value={formData.size} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="availability" className="form-label">Availability:</label>
          <input type="text" className="form-control" id="availability" name="availability" value={formData.availability} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="agentId" className="form-label">Agent ID:</label>
          <input type="text" className="form-control" id="agentId" name="agentId" value={formData.agentId} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Property</button>
      </form>
    </div>
  );
}

export default PropertyForm;

import React, { useState } from 'react';

function UpdatePropertyModal({ propertyId, onUpdate }) {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    size: '',
    price: '',
    availability: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/properties/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Property updated:', data);
      onUpdate(); // Call the onUpdate function to refresh the property list
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <div className="modal fade" id="updatePropertyModal" tabIndex="-1" aria-labelledby="updatePropertyModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updatePropertyModalLabel">Update Property</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
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
              <button type="submit" className="btn btn-primary">Update Property</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePropertyModal;

// UpdatePropertyModal.js

import React, { useState } from 'react';

function UpdatePropertyModal({ property, onUpdate, onClose }) {
  const [updatedProperty, setUpdatedProperty] = useState({ ...property });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProperty({ ...updatedProperty, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(updatedProperty);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Update Property</h2>
        <label>
          Type:
          <input type="text" name="type" value={updatedProperty.type} onChange={handleChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={updatedProperty.location} onChange={handleChange} />
        </label>
        {/* Add other input fields for other property details */}
        <button onClick={handleSubmit}>Update Property</button>
      </div>
    </div>
  );
}

export default UpdatePropertyModal;

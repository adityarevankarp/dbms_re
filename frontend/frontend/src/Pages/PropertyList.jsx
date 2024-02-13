import React, { useState, useEffect } from 'react';
import './PropertyList.css'; // Import CSS file for additional styling

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [updatedProperty, setUpdatedProperty] = useState({
    type: '',
    location: '',
    size: '',
    price: '',
    availability: ''
  });
  const [updatingPropertyId, setUpdatingPropertyId] = useState(null);
  console.log(updatedProperty,updatingPropertyId);

  // Fetch properties from backend
  useEffect(() => {
    fetchProperties();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, propertyId })
      });
      const data = await response.json();
      console.log('Appointment booked:', data);
      // Optionally, you can close the appointment booking form after successful booking
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };
  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:4000/properties');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };
  
  
  const handleBookAppointment = async (propertyId) => {
    // Implement logic to open appointment booking form
    const customerId = prompt('Enter Customer ID:');
    const agentId = prompt('Enter Agent ID:');
    const date = new Date().toISOString(); // Get current date in ISO format

    try {
      const response = await fetch('http://localhost:4000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ propertyId, customerId, agentId, date })
      });
      const data = await response.json();
      console.log('Appointment booked:', data);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleUpdateProperty = (propertyId) => {
    setUpdatingPropertyId(propertyId);
  };

  const handleDeleteProperty = (propertyId) => {
    fetch(`http://localhost:4000/properties/${propertyId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Property deleted successfully');
        // Update the property list after deletion
        onDelete(propertyId);
      } else {
        console.error('Failed to delete property');
      }
    })
    .catch(error => {
      console.error('Error deleting property:', error);
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProperty({ ...updatedProperty, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/properties/${updatingPropertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProperty)
      });
      const data = await response.json();
      console.log('Property updated:', data);
      setUpdatingPropertyId(null); // Reset updating property ID
      fetchProperties(); // Refresh property list after update
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Properties Available</h2>
      <div className="row">
        {properties.map(property => (
          <div key={property.property_id} className="col-md-4">
            <div className="card mb-3">
              {updatingPropertyId === property.property_id ? (
                <div className="card-body">
                  <h5>Update Property:</h5>
                  <form onSubmit={handleUpdateSubmit}>
                    <div className="mb-3">
                      <label htmlFor="updateType" className="form-label">Type:</label>
                      <input type="text" className="form-control" id="updateType" name="type" value={updatedProperty.type} onChange={handleInputChange} />
                      <div className="mb-3">
                        <label htmlFor="updateLocation" className="form-label">Location:</label>
                        <input type="text" className="form-control" id="updateLocation" name="location" value={updatedProperty.location} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="updateSize" className="form-label">Size:</label>
                        <input type="text" className="form-control" id="updateSize" name="size" value={updatedProperty.size} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="updatePrice" className="form-label">Price:</label>
                        <input type="text" className="form-control" id="updatePrice" name="price" value={updatedProperty.price} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="updateAvailability" className="form-label">Availability:</label>
                        <input type="text" className="form-control" id="updateAvailability" name="availability" value={updatedProperty.availability} onChange={handleInputChange} />
                    </div>
                    </div>
                    {/* Add input fields for other property details (location, size, price, availability) */}
                    <button className="btn btn-primary" onClick={() => handleBookAppointment(property.property_id)}>Book an Appointment</button>
                  </form>
                </div>
              ) : (
                <div className="card-body">
                  <h5 className="card-title">{property.type}</h5>
                  <p className="card-text"><strong>Location:</strong> {property.location}</p>
                  <p className="card-text"><strong>Size:</strong> {property.size}</p>
                  <p className="card-text"><strong>Price:</strong> {property.price}</p>
                  <p className="card-text"><strong>Availability:</strong> {property.availability}</p>
                  <button className="btn btn-primary" onClick={() => handleBookAppointment(property.property_id)}>Book an Appointment</button>
                  <button className="btn btn-info" onClick={() => handleUpdateProperty(property.property_id)}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteProperty(property.property_id)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
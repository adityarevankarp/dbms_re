import React, { useState, useEffect } from 'react';
import './PropertyList.css'; // Import CSS file for additional styling

function PropertyList() {
  const [properties, setProperties] = useState([]);

  // Fetch properties from backend
  useEffect(() => {
    fetchProperties();
  }, [properties]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:4000/properties');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleBookAppointment = (propertyId) => {
    // Add logic to handle booking appointment
    console.log('Booking appointment for property:', propertyId);
  };

  const handleUpdateProperty = (propertyId) => {
    // Add logic to handle updating property
    console.log('Updating property:', propertyId);
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

  return (
    <div className="container mt-5">
      <h2>Properties Available</h2>
      <div className="row">
        {properties.map(property => (
          <div key={property.property_id} className="col-md-4">
            <div className="card mb-3">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;

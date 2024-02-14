import React, { useState } from 'react';

function PropertySearch() {
  const [searchId, setSearchId] = useState('');
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/properties/search?id=${searchId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setProperty(data[0]); // Assuming the response contains only one property
          setError(null);
        } else {
          setError('Property not found');
          setProperty(null);
        }
      } else {
        setError('Error searching for property');
        setProperty(null);
      }
    } catch (error) {
      console.error('Error searching property:', error);
      setError('Internal Server Error');
      setProperty(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Property Search</h2>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter property ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {property && (
        <div className="card mt-3">
          <div className="card-body">
            <h3 className="card-title">Property Details</h3>
            <p><strong>ID:</strong> {property.property_id}</p>
            
            <p><strong>Location:</strong> {property.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertySearch;

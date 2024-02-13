import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:4000/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Appointments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Property ID</th>
            <th>Customer ID</th>
            <th>Agent ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.propertyId}</td>
              <td>{appointment.customerId}</td>
              <td>{appointment.agentId}</td>
              <td>{appointment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;

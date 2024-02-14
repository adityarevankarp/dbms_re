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
      console.log(data);
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
            <tr key={appointment.appointment_id}>
              <td>{appointment.appointment_id}</td>
              <td>{appointment.property_id}</td>
              <td>{appointment.customer_id}</td>
              <td>{appointment.agent_id}</td>
              <td>{appointment.appointment_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;

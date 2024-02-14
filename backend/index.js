const express = require('express');
const { Client, pool } = require('pg');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = 4000; 
app.use(cors());

app.use(bodyParser.json());
// Create a new PostgreSQL client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432, // Default PostgreSQL port
});

client.connect();
const createTablesQueries = [
    `CREATE TABLE IF NOT EXISTS agent (
      agent_id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      contact_information VARCHAR(255),
      expertise TEXT,
      transaction_history TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS property (
      property_id SERIAL PRIMARY KEY,
      agent_id INT,
      type VARCHAR(50),
      location VARCHAR(255),
      size NUMERIC,
      price NUMERIC,
      availability BOOLEAN
    );`,
    `CREATE TABLE IF NOT EXISTS customer (
      customer_id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      contact_information VARCHAR(255)
    );`,
    `CREATE TABLE IF NOT EXISTS appointment (
      appointment_id SERIAL PRIMARY KEY,
      property_id INT,
      customer_id INT,
      agent_id INT,
      appointment_date DATE
    );`,
    `CREATE TABLE IF NOT EXISTS transaction (
      transaction_id SERIAL PRIMARY KEY,
      property_id INT,
      customer_id INT,
      agent_id INT,
      transaction_date DATE
    );`
  ];
  let appointments = [];

// Endpoint to book an appointment
app.post('/appointments', (req, res) => {
  try {
    const { propertyId, customerId, agentId, date } = req.body;

    // Create a new appointment object
    const newAppointment = {
      appointmentId: appointments.length + 1, // Generate a unique ID
      propertyId,
      customerId,
      agentId,
      date
    };

    // Add the appointment to the appointments array
    appointments.push(newAppointment);

    // Return the newly created appointment
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  app.put('/properties/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { type, location, size, price, availability } = req.body;
  
      // Update the property with the specified ID in the properties table
      const query = `
        UPDATE property
        SET type = $1, location = $2, size = $3, price = $4, availability = $5
        WHERE property_id = $6
        RETURNING *;
      `;
      const values = [type, location, size, price, availability, id];
      const result = await client.query(query, values);
  
      console.log('Property updated:', result.rows[0]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/customers', async (req, res) => {
    try {
      const { name, contactInformation } = req.body;
  
      // Insert customer data into the customers table
      const query = `
        INSERT INTO customer (name, contact_information)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [name, contactInformation];
      const result = await client.query(query, values);
  
      console.log('Customer registered:', result.rows[0]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error registering customer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/transactions', async (req, res) => {
    try {
      const { propertyId, customerId, agentId } = req.body;
  
      // Execute SQL query to insert transaction into the database
      const query = `
        INSERT INTO transaction (property_id, customer_id, agent_id)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [propertyId, customerId, agentId];
      const result = await client.query(query, values);
  
      // Return the newly created transaction
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/transactions', async (req, res) => {
    try {
      // Query to fetch all transactions from the database
      const query = 'SELECT * FROM transaction';
  
      // Execute the query
      const { rows } = await client.query(query);
  
      // Return the fetched transactions as JSON response
      res.json(rows);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/properties', async (req, res) => {
    try {
      // Query to select all properties from the database
      const query = 'SELECT * FROM property;';
      const result = await client.query(query);
  
      // Send the properties data as a response
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.delete('/properties/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      // Delete the property with the specified ID from the properties table
      const query = `
        DELETE FROM property
        WHERE property_id = $1;
      `;
      const result = await client.query(query, [id]);
  
      console.log('Property deleted:', id);
      res.json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/createTables', async (req, res) => {
    try {
      
      for (const query of createTablesQueries) {
        await client.query(query);
      }
      
      console.log('Tables created successfully');
      res.send('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      // Close the client connection
      await client.end();
    }
  });
  app.get('/properties/search', async (req, res) => {
    const { id } = req.query;
    try {
      const query = 'SELECT * FROM property WHERE property_id = $1';
      const result = await client.query(query, [id]);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
      console.error('Error searching property:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/agents', async (req, res) => {
    try {
      const { name, contactInformation, expertise, transactionHistory } = req.body;
  
      // Insert agent data into the agents table
      const query = `
        INSERT INTO agent (name, contact_information, expertise, transaction_history)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [name, contactInformation, expertise, transactionHistory];
      const result = await client.query(query, values);
  
      console.log('Agent registered:', result.rows[0]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error registering agent:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  let apmnts = [
    { appointmentId: 1, propertyId: 1, customerId: 1, agentId: 1, date: '2024-02-15' },
    { appointmentId: 2, propertyId: 2, customerId: 2, agentId: 2, date: '2024-02-16' },
    { appointmentId: 3, propertyId: 3, customerId: 3, agentId: 3, date: '2024-02-17' }
  ];
  
  app.post('/appointments', async (req, res) => {
    try {
      const { propertyId, customerId, agentId, date } = req.body;
  
      // SQL query to insert the appointment into the database
      const query = `
        INSERT INTO appointment (property_id, customer_id, agent_id, appointment_date)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [propertyId, customerId, agentId, date];
  
      // Execute the SQL query
      const result = await client.query(query, values);
  
      // Return the newly created appointment
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error booking appointment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/appointments', async (req, res) => {
    try {
      // SQL query to fetch all appointments
      const query = `
        SELECT * FROM appointment;
      `;
  
      // Execute the SQL query
      const result = await client.query(query);
  
      // Return the list of appointments
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/properties', async (req, res) => {
    try {
      const { type, location, size, price, availability, agentId } = req.body;
  
      // Insert property data into the properties table
      const query = `
        INSERT INTO property (type, location, size, price, availability, agent_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const values = [type, location, size, price, availability, agentId];
      const result = await client.query(query, values);
  
      console.log('Property added:', result.rows[0]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error adding property:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/getTables',async(req,res)=>{
    
    try {
        // Connect to the PostgreSQL database
        
    
        // Query to fetch table names from information_schema.tables
        const query = `
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE';
        `;
    
        const result = await client.query(query);
    
        // Extract table names from the result
        const tableNames = result.rows.map(row => row.table_name);
    
        // Send the list of table names as a JSON object
        res.json({ tables: tableNames });
      } catch (error) {
        console.error('Error fetching tables:', error);
        res.status(500).send('Internal Server Error');
      } finally {
        // Close the client connection
        await client.end();
      }
      
      // Call the function to get tables
      
  })
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

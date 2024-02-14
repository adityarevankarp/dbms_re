import React, { useState, useEffect } from 'react';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:4000/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Transaction List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Property ID</th>
            <th>Customer ID</th>
            <th>Agent ID</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.transaction_id}>
              <td>{transaction.transaction_id}</td>
              <td>{transaction.property_id}</td>
              <td>{transaction.customer_id}</td>
              <td>{transaction.agent_id}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing');
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:3000/api/dashboard', config);
        setMetrics(response.data); 
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);



  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* error message */}
      <ul>
        {metrics.map((metric, index) => (
          <li key={index}>
            Domain: {metric.domain}, Timestamp: {new Date(metric.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

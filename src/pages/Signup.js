import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  debugger;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // For error handling
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  debugger;
    e.preventDefault();
    try {
  debugger;
      // Make an API call to register a new user
      const response = await axios.post('http://localhost:3000/api/register', { username, password });
      // const response = await axios.post('/api/register', { username, password });
      debugger;
      console.log('Signup successful', response.data);
      
      // After successful registration, redirect to the login page
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

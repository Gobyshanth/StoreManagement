import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace these credentials with your actual admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'admin123';

    if (username === adminUsername && password === adminPassword) {
      alert('Login successful!');
      navigate('/admin'); // Navigate to Admin Control page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', border: '1px solid #ddd', padding: '20px' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
     
        <div style={{ marginBottom: '15px'  }}>
        {/* <a href="tel:+94777317697">Call Now</a> */}
        {/* <a href="mailto:gobyg034@gmail.com">Send Email</a>
        <a href="file.pdf" download>Download PDF</a> */}



          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        
      </form>
      
    </div>
  );
};

export default Login;
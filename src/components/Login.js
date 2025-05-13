import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import userData from '../data/userData';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '12345678') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', 'admin');
      localStorage.setItem('role', 'admin');
      navigate('/admin/dashboard');
      return;
    }
    const matchedUser = userData.find(user => user.name === username && password === '12345678');
    if (matchedUser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', matchedUser.name);
      localStorage.setItem('role', 'user');
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/login', user);
      setMessage('Login successful');
      setTimeout(() => navigate('/dashboard'), 1000); // Replace with your page
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" required className="form-control" value={user.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" required className="form-control" value={user.password} onChange={handleChange} />
        </div>
        <button className="btn btn-success w-100" type="submit">Login</button>
        <div className="mt-2 text-end">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

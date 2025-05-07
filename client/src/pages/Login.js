import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // krijojmë këtë skedar CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, rememberMe: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (formData.rememberMe) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
        }

        setMessage('Kyçja u krye me sukses!');
        setMessageType('success');
        navigate('/dashboard');
      } else {
        setMessage(data.message || 'Email ose fjalëkalim i pasaktë.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Gabim:', error);
      setMessage('Gabim gjatë login.');
      setMessageType('error');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <h2>Hyr në llogarinë tënde</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Fjalëkalimi"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className="remember-me">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
            />
            Mbaje mend
          </label>
          <button type="submit">Hyr</button>
        </form>

        {message && (
          <p className={`message ${messageType}`}>{message}</p>
        )}

        <div className="login-links">
          <p>Nuk ke llogari? <a href="/register">Regjistrohu</a></p>
          <p><a href="/forgot-password">Keni harruar fjalëkalimin?</a></p>
          <p class="home">  <a href="/">Kthehu në faqen kryesore</a></p>
        </div>
      </div>

    </div>
  );
};


export default Login;

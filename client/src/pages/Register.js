import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPasswordStrong = (password) => {
    const lengthCheck = password.length >= 6;
    const uppercaseCheck = /[A-Z]/.test(password);
    const lowercaseCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return lengthCheck && uppercaseCheck && lowercaseCheck && numberCheck && specialCharCheck;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!isPasswordStrong(formData.password)) {
      setMessage(
        'Fjalëkalimi duhet të ketë të paktën 6 karaktere, një shkronjë të madhe, një të vogël, një numër dhe një simbol.'
      );
      setMessageType('error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Regjistrimi u krye me sukses!');
        setMessageType('success');
        navigate('/login');
      } else {
        setMessage(data.message || 'Gabim gjatë regjistrimit.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Gabim:', error);
      setMessage('Gabim në rrjet gjatë regjistrimit.');
      setMessageType('error');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <img src="/logo.png" alt="Logo" className="register-logo" />
        <h2>Krijo një llogari</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Emri"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Fjalëkalimi"
            onChange={handleChange}
            required
          />
          <button type="submit">Regjistrohu</button>
        </form>

        {message && (
          <p className={`message ${messageType}`}>{message}</p>
        )}

        <div className="register-links">
          <p>Ke llogari? <a href="/login">Hyr këtu</a></p>
          <p><a href="/">Kthehu në faqen kryesore</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;

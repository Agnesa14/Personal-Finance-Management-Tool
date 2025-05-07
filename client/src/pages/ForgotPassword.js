import React, { useState } from 'react';
import './ForgotPassword.css'; // krijo këtë skedar për stilin

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

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

    if (!isPasswordStrong(formData.newPassword)) {
      setMessage(
        'Fjalëkalimi duhet të ketë të paktën 6 karaktere, një shkronjë të madhe, një të vogël, një numër dhe një simbol.'
      );
      setMessageType('error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Fjalëkalimi u rivendos me sukses!');
        setMessageType('success');
      } else {
        setMessage(data.message || 'Gabim gjatë rivendosjes së fjalëkalimit.');
        setMessageType('error');
      }
    } catch (err) {
      console.error('Gabim gjatë resetimit:', err);
      setMessage('Gabim në rrjet gjatë resetimit.');
      setMessageType('error');
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <img src="/logo.png" alt="Logo" className="forgot-logo" />
        <h2>Rikupero fjalëkalimin</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email-i"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Fjalëkalimi i ri"
            onChange={handleChange}
            required
          />
          <button type="submit">Ndrysho fjalëkalimin</button>
        </form>

        {message && (
          <p className={`message ${messageType}`}>{message}</p>
        )}

        <div className="forgot-links">
          <p><a href="/login">Kthehu te login</a></p>
          <p><a href="/">Kthehu në faqen kryesore</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

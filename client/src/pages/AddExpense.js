// pages/AddExpense.js
import React, { useState } from 'react';
import './AddExpense.css'; // lidh CSS-in e jashtëm

const AddExpense = () => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    category: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

    if (!user) {
      setMessage('Përdoruesi nuk është i kyçur.');
      setMessageType('error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: user.id })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Shpenzimi u shtua me sukses!');
        setMessageType('success');
        setFormData({ description: '', amount: '', date: '', category: '' });
      } else {
        setMessage(data.message || '❌ Gabim gjatë shtimit.');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('❌ Gabim në rrjet.');
      setMessageType('error');
    }
  };

  return (
    <div className="add-expense-container">
      <h2 className="add-expense-title">Shto Shpenzim</h2>
      <form onSubmit={handleSubmit} className="add-expense-form">
        <input type="text" name="description" placeholder="Përshkrimi" value={formData.description} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Shuma (€)" value={formData.amount} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Kategoria" value={formData.category} onChange={handleChange} required />
        <button type="submit">Shto</button>
      </form>

      {message && (
        <div className={`add-expense-message ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddExpense;

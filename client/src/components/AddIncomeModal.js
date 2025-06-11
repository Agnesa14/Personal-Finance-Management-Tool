// components/AddIncomeModal.js
import React, { useState } from 'react';
import './AddIncomeModal.css';

const AddIncomeModal = ({ onClose }) => {
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: '',
    category: '',
    description: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      setMessage('⚠️ Përdoruesi nuk është i kyçur.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/incomes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: user.id })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Të ardhurat u shtuan me sukses!');
        setFormData({
          source: '',
          amount: '',
          date: '',
          category: '',
          description: ''
        });
        setTimeout(onClose, 1000);
      } else {
        setMessage(data.message || '❌ Gabim gjatë shtimit.');
      }
    } catch (err) {
      setMessage('❌ Gabim në rrjet.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Shto të Ardhura</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="source"
            placeholder="Burimi (p.sh. Rrogë, Bursë...)"
            value={formData.source}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Shuma (€)"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Kategoria (opsionale)"
            value={formData.category}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Përshkrimi (opsionale)"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Shto</button>
        </form>
        {message && <p className="modal-message">{message}</p>}
        <button className="modal-close" onClick={onClose}>Mbyll</button>
      </div>
    </div>
  );
};

export default AddIncomeModal;

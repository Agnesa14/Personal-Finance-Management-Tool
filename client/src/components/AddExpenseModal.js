import React, { useState } from 'react';
import './AddExpenseModal.css';
const AddExpenseModal = ({ onClose }) => {
const [formData, setFormData] = useState({
    
description: '',
amount: '',
date: '',
category: '',
});
const [message, setMessage] = useState('');
const user = JSON.parse(localStorage.getItem('user') ||
sessionStorage.getItem('user'));

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleSubmit = async (e) => {
e.preventDefault();
if (!user) return;
try {
const res = await fetch('http://localhost:5000/api/expenses', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ ...formData, userId: user.id })
});
const data = await res.json();
if (res.ok) {
setMessage('✅ Shpenzimi u shtua me sukses!');
setFormData({ description: '', amount: '', date: '', category: '' });
setTimeout(onClose, 1000); // Mbyll modalin pas 1 sekonde
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
<h3>Shto Shpenzim</h3>
<form onSubmit={handleSubmit}>
<input type="text" name="description" placeholder="Përshkrimi"
value={formData.description} onChange={handleChange} required />
<input type="number" name="amount" placeholder="Shuma (€)"

value={formData.amount} onChange={handleChange} required />
<input type="date" name="date" value={formData.date}

onChange={handleChange} required />

<input type="text" name="category" placeholder="Kategoria"
value={formData.category} onChange={handleChange} required />

<button type="submit">Shto</button>
</form>

{message && <p className="modal-message">{message}</p>}
<button className="modal-close" onClick={onClose}>Mbyll</button>
</div>
</div>
);
};
export default AddExpenseModal;
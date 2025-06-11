// ✅ PLOTËSUAR: AddTransactionModal.js që mbështet edhe EDITIM
import React, { useEffect, useState } from 'react';
import './AddTransactionModal.css';
import { toast } from 'react-toastify';

const AddTransactionModal = ({
isOpen,
onClose,
type,
userId,
onSuccess,
existingData = null // nëse ekziston, është për editim
}) => {
const [formData, setFormData] = useState({
name: '',
amount: '',
date: '',

category: '',
description: ''
});
useEffect(() => {
if (existingData) {
setFormData({
name: existingData.name || existingData.description || '',
amount: existingData.amount,
date: existingData.date?.slice(0, 10),
category: existingData.category || '',
description: existingData.description || ''
});
}
}, [existingData]);
const handleChange = (e) => {
setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};
const handleSubmit = async (e) => {
e.preventDefault();
const endpointBase = type === 'income'
? 'http://localhost:5000/api/incomes'
: 'http://localhost:5000/api/expenses';
const method = existingData ? 'PUT' : 'POST';
const url = existingData ? `${endpointBase}/${existingData._id}` :
endpointBase;
const body = {
userId,
...formData
};
if (type === 'expenses') {
body.description = formData.name;
delete body.name;
}
try {
const res = await fetch(url, {
method,
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body)

});
const data = await res.json();
if (res.ok) {
toast.success(existingData ? 'Transaksioni u përditësua me sukses!' :
'Transaksioni u shtua me sukses!');
onSuccess();
onClose();
} else {
toast.error(data.message || 'Gabim gjatë ruajtjes.');
}
} catch (err) {
toast.error('Gabim në rrjet.');
console.error(err);
}
};
if (!isOpen) return null;
return (
<div className="modal-backdrop">
<div className="modal">
<h3>{existingData ? 'Edito' : 'Shto'} {type === 'income' ? 'Të Ardhura' :
'Shpenzim'}</h3>
<form onSubmit={handleSubmit}>
<input type="text" name="name" placeholder="Emri" value={formData.name}

onChange={handleChange} required />

<input type="number" name="amount" placeholder="Shuma"
value={formData.amount} onChange={handleChange} required />
<input type="date" name="date" value={formData.date}

onChange={handleChange} required />

<input type="text" name="category" placeholder="Kategoria"

value={formData.category} onChange={handleChange} />

<input type="text" name="description" placeholder="Përshkrim
(opsional)" value={formData.description} onChange={handleChange} />

<div className="modal-actions">
<button type="submit">{existingData ? 'Ruaj Ndryshimet' :

'Shto'}</button>

<button type="button" onClick={onClose}>Anulo</button>
</div>
</form>
</div>
</div>

);
};
export default AddTransactionModal;
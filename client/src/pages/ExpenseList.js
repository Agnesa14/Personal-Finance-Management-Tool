// pages/ExpenseList.js
import React, { useEffect, useState } from 'react';
import './ExpenseList.css';
const ExpenseList = () => {
const [expenses, setExpenses] = useState([]);
const [error, setError] = useState('');
useEffect(() => {
const fetchExpenses = async () => {
try {

const user = JSON.parse(localStorage.getItem('user') ||
sessionStorage.getItem('user'));
if (!user) {
setError('Përdoruesi nuk është i kyçur.');
return;
}
const res = await fetch('http://localhost:5000/api/expenses', {
headers: {
Authorization: `Bearer ${user.token}`
}
});
const data = await res.json();
if (res.ok) {
setExpenses(data);
} else {
setError(data.message || 'Gabim gjatë marrjes së të dhënave.');
}
} catch (err) {
setError('Gabim në rrjet.');
}
};
fetchExpenses();
}, []);
return (
<div className="expense-list-container">
<h2>Shpenzimet e mia</h2>
{error && <p className="error-message">{error}</p>}
{expenses.length === 0 && !error ? (
<p>Nuk ka asnjë shpenzim të regjistruar.</p>
) : (
<table className="expense-table">
<thead>
<tr>
<th>Përshkrimi</th>
<th>Kategoria</th>
<th>Shuma (€)</th>
<th>Data</th>
</tr>

</thead>
<tbody>
{expenses.map((expense) => (
<tr key={expense._id}>
<td>{expense.description}</td>
<td>{expense.category}</td>
<td>{expense.amount}</td>
<td>{new Date(expense.date).toLocaleDateString()}</td>
</tr>
))}
</tbody>
</table>
)}
</div>
);
};
export default ExpenseList;
import React, { useState, useEffect } from 'react';
import './Accounts.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  const fetchAccounts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/accounts?userId=${user.id}`);
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error('Gabim:', err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, name, balance }),
      });
      if (res.ok) {
        setName('');
        setBalance('');
        fetchAccounts();
      }
    } catch (err) {
      console.error('Gabim:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni i sigurt që doni ta fshini?')) return;
    try {
      await fetch(`http://localhost:5000/api/accounts/${id}`, { method: 'DELETE' });
      fetchAccounts();
    } catch (err) {
      console.error('Gabim:', err);
    }
  };

  return (
    <div className="accounts-container">
      <h2>Llogaritë Financiare</h2>
      <form onSubmit={handleSubmit} className="account-form">
        <input
          type="text"
          placeholder="Emri i llogarisë"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Bilanci fillestar (€)"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />
        <button type="submit">Shto</button>
      </form>

      <div className="account-list">
        {accounts.map((acc) => (
          <div key={acc._id} className="account-item">
            <h4>{acc.name}</h4>
            <p>💰 Bilanci: €{acc.balance}</p>
            <button onClick={() => handleDelete(acc._id)}>Fshij</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
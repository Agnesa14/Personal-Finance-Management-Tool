import React, { useEffect, useState } from 'react';
import './Budget.css';
import { toast } from 'react-toastify';

const Budget = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [limit, setLimit] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editLimit, setEditLimit] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const months = [
    'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
    'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 2 + i);

  const fetchBudgets = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`http://localhost:5000/api/budgets/summary?userId=${user.id}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setBudgets(data);
      } else {
        setBudgets([]);
      }
    } catch (err) {
      console.error('Gabim në marrjen e buxheteve:', err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchBudgets();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullMonth = `${month} ${year}`;
    try {
      const res = await fetch('http://localhost:5000/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, month: fullMonth, totalLimit: limit })
      });
      const data = await res.json();
      if (res.ok) {
        fetchBudgets();
        setMonth('');
        setYear('');
        setLimit('');
        toast.success('✅ Buxheti u shtua me sukses!');
      } else {
        toast.error(data.message || 'Gabim gjatë shtimit të buxhetit.');
      }
    } catch (err) {
      toast.error('Gabim në rrjet.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/budgets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalLimit: editLimit })
      });
      const data = await res.json();
      if (res.ok) {
        fetchBudgets();
        setEditingId(null);
        setEditLimit('');
        toast.success('✅ Limiti u përditësua!');
      } else {
        toast.error(data.message || 'Gabim gjatë përditësimit.');
      }
    } catch (err) {
      toast.error('Gabim në rrjet.');
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/budgets/${deleteId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('✅ Buxheti u fshi me sukses!');
        fetchBudgets();
      } else {
        toast.error(data.message || 'Gabim gjatë fshirjes.');
      }
    } catch (err) {
      toast.error('Gabim në rrjet.');
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  const filteredBudgets = filterYear
    ? budgets.filter(b => b.month.includes(filterYear))
    : budgets;

  return (
    <div className="budget-container">
      <h2>Buxheti Mujor</h2>

      <form onSubmit={handleSubmit} className="budget-form">
        <select value={month} onChange={(e) => setMonth(e.target.value)} required>
          <option value="">Zgjidh muajin</option>
          {months.map((m, idx) => (
            <option key={idx} value={m}>{m}</option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)} required>
          <option value="">Zgjidh vitin</option>
          {years.map((y, idx) => (
            <option key={idx} value={y}>{y}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Limiti Total (€)"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          required
        />
        <button type="submit">Shto Buxhet</button>
      </form>

      <div style={{ marginBottom: '15px' }}>
        <label>Filtro sipas vitit: </label>
        <select onChange={(e) => setFilterYear(e.target.value)} value={filterYear}>
          <option value="">Të gjitha</option>
          {[...new Set(budgets.map(b => b.month.split(' ')[1]))].map((v, idx) => (
            <option key={idx} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div className="budget-list">
        {filteredBudgets.length === 0 ? (
          <p>Nuk ka buxhete të regjistruara.</p>
        ) : (
          filteredBudgets.map((b) => (
            <div className="budget-item" key={b._id}>
              <h4>{b.month}</h4>
              {editingId === b._id ? (
                <>
                  <input
                    type="number"
                    value={editLimit}
                    onChange={(e) => setEditLimit(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(b._id)}>Ruaj</button>
                  <button onClick={() => setEditingId(null)}>Anulo</button>
                </>
              ) : (
                <>
                  <p>Limiti total: €{b.totalLimit}</p>
                  <p>Shpenzuar: €{b.spent ?? 0} ({b.percentage ?? 0}%)</p>
                <div className="progress-bar">
  <div
    className={`progress ${
      b.percentage > 100
        ? 'red'
        : b.percentage >= 80
        ? 'orange'
        : 'green'
    }`}
    style={{ width: `${Math.min(b.percentage, 100)}%` }}
  ></div>
</div>
{b.percentage > 100 && (
  <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>
    ⚠️ Ke tejkaluar buxhetin!
  </p>
)}


                  <button onClick={() => {
                    setEditingId(b._id);
                    setEditLimit(b.totalLimit);
                  }}>Edito</button>
                  <button onClick={() => {
                    setDeleteId(b._id);
                    setShowConfirm(true);
                  }}>Fshij</button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>A jeni i sigurt që dëshironi ta fshini këtë buxhet?</h4>
            <div className="modal-buttons">
              <button onClick={confirmDelete}>Po, Fshij</button>
              <button onClick={() => {
                setShowConfirm(false);
                setDeleteId(null);
              }}>Anulo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;

import React, { useEffect, useState } from 'react';
import './Reports.css';
import {
  LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis,
  CartesianGrid, ResponsiveContainer
} from 'recharts';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

const COLORS = ['#28C76F', '#FFA726', '#29B6F6', '#FF6384', '#AB47BC', '#FF7043', '#66BB6A'];
const MONTHS = ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'];

const Reports = () => {
  const [summary, setSummary] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('year');

  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      fetchSummary();
      fetchCategoryData();
    }
  }, [filter]);

  const fetchSummary = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/reports/summary?userId=${user.id}`);
      const data = await res.json();
      // Shto emrin e muajit
      const withMonthNames = data.map(item => ({
        ...item,
        month: MONTHS[item.month - 1]
      }));
      setSummary(withMonthNames);
    } catch {
      toast.error('Gabim gjatë marrjes së përmbledhjes mujore.');
    }
  };

  const fetchCategoryData = async () => {
    const now = new Date();
    let from, to;

    if (filter === 'month') {
      from = new Date(now.getFullYear(), now.getMonth(), 1);
      to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (filter === 'quarter') {
      const q = Math.floor(now.getMonth() / 3);
      from = new Date(now.getFullYear(), q * 3, 1);
      to = new Date(now.getFullYear(), q * 3 + 3, 0);
    } else {
      from = new Date(now.getFullYear(), 0, 1);
      to = new Date(now.getFullYear(), 11, 31);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/reports/categories?userId=${user.id}&from=${from.toISOString()}&to=${to.toISOString()}`);
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error('Gabim gjatë analizës së kategorive.');
    }
  };

  const exportCSV = () => {
    const header = 'Muaji,Të Ardhura,Shpenzime\n';
    const rows = summary.map(row =>
      `${row.month},${row.income},${row.expense}`
    ).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'raporti_financiar.csv');
    toast.success('✅ Raporti u eksportua me sukses!');
  };

  return (
    <div className="reports-container">
      <h2>📊 Raportet Financiare</h2>

      <div className="filter-export">
        <div>
          <label>Filtri: </label>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="month">Mujore</option>
            <option value="quarter">Tremujore</option>
            <option value="year">Vjetore</option>
          </select>
        </div>
        <button onClick={exportCSV}>📁 Eksporto në CSV</button>
      </div>

      <div className="chart-section">
        <h3>📈 Të Ardhura dhe Shpenzime Mujore</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={summary}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#28C76F" name="Të Ardhura" />
            <Line type="monotone" dataKey="expense" stroke="#FF6384" name="Shpenzime" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>🎯 Shpenzime sipas Kategorive</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categories} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;

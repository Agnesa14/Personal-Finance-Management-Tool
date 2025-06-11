// pages/HomeDashboard.js
import React, { useEffect, useState } from 'react';
import './HomeDashboard.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from
    'recharts';
const HomeDashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const COLORS = ['#28C76F', '#FFA726', '#66BB6A', '#29B6F6', '#AB47BC',
        '#FF7043', '#26A69A'];
    const user = JSON.parse(localStorage.getItem('user') ||
        sessionStorage.getItem('user'));
    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            try {
                // Marrim të ardhurat

                const incomeRes = await
                    fetch(`http://localhost:5000/api/incomes?userId=${user.id}`);
                const incomeData = await incomeRes.json();
                setIncome(incomeData || []);
                const incomeTotal = incomeData.reduce((sum, item) => sum +
                    Number(item.amount), 0);
                setTotalIncome(incomeTotal);
                // Marrim shpenzimet
                const expenseRes = await
                    fetch(`http://localhost:5000/api/expenses?userId=${user.id}`);
                const expenseData = await expenseRes.json();
                setExpenses(expenseData || []);
                const expenseTotal = expenseData.reduce((sum, item) => sum +
                    Number(item.amount), 0);
                setTotalExpense(expenseTotal);
            } catch (err) {
                console.error('Gabim në marrjen e të dhënave:', err);
            }
        };
        fetchData();
    }, [user]);
    const totalBalance = totalIncome - totalExpense;
    // ✅ Funksioni që përgatit të dhënat për grafikun
    const getCategoryTotals = () => {
        const categoryMap = {};
        expenses.forEach((exp) => {
            const category = exp.category || 'Tjetër';
            if (!categoryMap[category]) {
                categoryMap[category] = 0;
            }
            categoryMap[category] += Number(exp.amount);
        });
        return Object.entries(categoryMap).map(([name, value]) => ({
            name,
            value,
        }));
    };
    return (

        <div className="home-dashboard">
            <h2>Përmbledhje Financiare</h2>
            <div className="summary-cards">
                <div className="card">
                    <h3>Bilanci Total</h3>
                    <p>€{totalBalance.toFixed(2)}</p>
                </div>
                <div className="card">
                    <h3>Të Ardhurat</h3>
                    <p>€{totalIncome.toFixed(2)}</p>
                </div>
                <div className="card">
                    <h3>Shpenzimet</h3>
                    <p>€{totalExpense.toFixed(2)}</p>
                </div>
            </div>
            <div className="chart-section">
                <h3>📊 Shpenzimet sipas Kategorive</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={getCategoryTotals()}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label
                        >
                            {getCategoryTotals().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}

                                />

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

export default HomeDashboard;
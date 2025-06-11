// ✅ Transactions.js me Edit + Delete dhe Toast njoftime
import React, { useState, useEffect } from 'react';
import './Transactions.css';
import AddTransactionModal from '../components/AddTransactionModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Transactions = () => {
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [activeTab, setActiveTab] = useState('expenses');
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('all');
    const user = JSON.parse(localStorage.getItem('user') ||
        sessionStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            const endpoint =
                activeTab === 'expenses'
                    ? `http://localhost:5000/api/expenses?userId=${user.id}`
                    : `http://localhost:5000/api/incomes?userId=${user.id}`;
            try {
                const res = await fetch(endpoint);
                const result = await res.json();
                const filtered = applyDateFilter(result || []);

                setData(filtered);
            } catch (err) {
                toast.error('Gabim gjatë marrjes së të dhënave');
            }
        };
        fetchData();
    }, [activeTab, user, filter]);
    const applyDateFilter = (items) => {
        const now = new Date();
        return items.filter((item) => {
            const itemDate = new Date(item.date);
            if (filter === 'today') return itemDate.toDateString() ===
                now.toDateString();
            if (filter === 'thisWeek') {
                const start = new Date(now);
                start.setDate(now.getDate() - now.getDay());
                const end = new Date(start);
                end.setDate(start.getDate() + 7);
                return itemDate >= start && itemDate < end;
            }
            if (filter === 'thisMonth') {
                return (
                    itemDate.getFullYear() === now.getFullYear() &&
                    itemDate.getMonth() === now.getMonth()
                );
            }
            return true;
        });
    };
    const handleDelete = async (id) => {
        const confirm = window.confirm('A jeni i sigurt që dëshironi ta fshini këtë transaksion ? ');
if (!confirm) return;
        const endpoint =
            activeTab === 'expenses'
                ? `http://localhost:5000/api/expenses/${id}`
                : `http://localhost:5000/api/incomes/${id}`;
        try {
            const res = await fetch(endpoint, { method: 'DELETE' });
            const result = await res.json();

            if (res.ok) {
                setData(data.filter((item) => item._id !== id));
                toast.success('Transaksioni u fshi me sukses');
            } else {
                toast.error(result.message || 'Gabim gjatë fshirjes.');
            }
        } catch (err) {
            toast.error('Gabim në rrjet.');
        }
    };
    return (
        <div className="transactions-container">
            <div className="tabs">
                <button className={activeTab === 'expenses' ? 'active' : ''} onClick={()=> setActiveTab('expenses')}>Expenses</button>
                <button className={activeTab === 'income' ? 'active' : ''} onClick={() =>
                    setActiveTab('income')}>Income</button>
            </div>
            <div className="transactions-header">
                <div className="left">
                    <h2>{activeTab === 'expenses' ? 'Shpenzimet' : 'Të Ardhurat'}</h2>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}

                        className="filter-select">

                        <option value="all">Të gjitha</option>
                        <option value="today">Sot</option>
                        <option value="thisWeek">Këtë javë</option>
                        <option value="thisMonth">Këtë muaj</option>
                    </select>
                </div>
                <button className="add-new-btn" onClick={() => {
                    setShowModal(true);
                    setEditItem(null);
                }}>+ Add New</button>
            </div>
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr><td colSpan="5">Nuk ka të dhëna për t’u shfaqur.</td></tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.description || item.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.date?.slice(0, 10)}</td>
                                <td>{item.category || '-'}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => {

                                        setEditItem(item); setShowModal(true);
                                    }}>Edit</button>
                                    <button className="delete-btn" onClick={() =>

                                        handleDelete(item._id)}>Delete</button>

                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <AddTransactionModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                type={activeTab}
                userId={user?.id}
                existingData={editItem}
                onSuccess={() => {
                    setShowModal(false);
                    setEditItem(null);
                    setTimeout(() => setActiveTab((prev) => prev), 100);
                }}
            />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar
                closeOnClick pauseOnHover />
        </div>
    );
};
export default Transactions;
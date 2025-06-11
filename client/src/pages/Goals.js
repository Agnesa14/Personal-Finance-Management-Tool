import React, { useState, useEffect } from 'react';
import './Goals.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editGoal, setEditGoal] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        targetAmount: '',
        currentAmount: '',
        deadline: ''
    });
    const user = JSON.parse(localStorage.getItem('user') ||
        sessionStorage.getItem('user'));
    useEffect(() => {
        fetchGoals();
    }, []);
    const fetchGoals = async () => {
        if (!user) return;
        try {
            const res = await
                fetch(`http://localhost:5000/api/goals?userId=${user.id}`);
            const data = await res.json();
            setGoals(data);
        } catch (err) {
            toast.error('Gabim gjatë marrjes së qëllimeve');
        }
    };
    const openAddModal = () => {
        setFormData({

            name: '',
            targetAmount: '',
            currentAmount: '',
            deadline: ''
        });
        setEditGoal(null);
        setShowModal(true);
    };
    const openEditModal = (goal) => {
        setFormData({
            name: goal.name,
            targetAmount: goal.targetAmount,
            currentAmount: goal.currentAmount,
            deadline: goal.deadline ? goal.deadline.slice(0, 10) : ''
        });
        setEditGoal(goal);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setEditGoal(null);
    };
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Ju duhet të jeni i kyçur.');
            return;
        }
        const method = editGoal ? 'PUT' : 'POST';
        const url = editGoal
            ? `http://localhost:5000/api/goals/${editGoal._id}`
            : 'http://localhost:5000/api/goals';
        const body = {

            ...formData,
            userId: user.id,
            targetAmount: Number(formData.targetAmount),
            currentAmount: Number(formData.currentAmount)
        };
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                toast.success(editGoal ? 'Qëllimi u përditësua' : 'Qëllimi u shtua');
                fetchGoals();
                closeModal();
            } else {
                const data = await res.json();
                toast.error(data.message || 'Gabim gjatë ruajtjes së qëllimit');
            }
        } catch {
            toast.error('Gabim në rrjet');
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm('A jeni të sigurt që dëshironi ta fshini këtë qëllim?'))
            return;
        try {
            const res = await fetch(`http://localhost:5000/api/goals/${id}`, {
                method:
                    'DELETE'
            });
            if (res.ok) {
                toast.success('Qëllimi u fshi');
                setGoals(goals.filter(goal => goal._id !== id));
            } else {
                const data = await res.json();
                toast.error(data.message || 'Gabim gjatë fshirjes së qëllimit');
            }
        } catch {
            toast.error('Gabim në rrjet');
        }
    };

    const calculateProgress = (goal) => {
        if (goal.targetAmount === 0) return 0;
        return Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
    };
    return (
        <div className="goals-container">
            <h2>Qëllimet e Kursimeve</h2>
            <button className="add-goal-btn" onClick={openAddModal}>+ Shto
                Qëllim</button>
            {goals.length === 0 ? (
                <p>Nuk ka qëllime të regjistruara.</p>
            ) : (
                <div className="goal-list">
                    {goals.map(goal => (
                        <div className="goal-card" key={goal._id}>
                            <h3>{goal.name}</h3>
                            <p>Afati: {goal.deadline ? new
                                Date(goal.deadline).toLocaleDateString() : '-'}</p>

                            <p>{goal.currentAmount} € / {goal.targetAmount} €</p>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${calculateProgress(goal)}%` }}
                                />
                            </div>
                            <div className="goal-actions">
                                <button onClick={() => openEditModal(goal)}>Edit</button>
                                <button onClick={() => handleDelete(goal._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3>{editGoal ? 'Edito Qëllimin' : 'Shto Qëllim'}</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Emri"

                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="targetAmount"
                                placeholder="Shuma totale që synohet (€)"
                                value={formData.targetAmount}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                            <input
                                type="number"
                                name="currentAmount"
                                placeholder="Shuma aktuale që ka kursyer (€)"
                                value={formData.currentAmount}
                                onChange={handleChange}
                                min="0"
                            />
                            <input
                                type="date"
                                name="deadline"
                                placeholder="Afati kohor"
                                value={formData.deadline}
                                onChange={handleChange}
                                required
                            />
                            <div className="modal-actions">
                                <button type="submit">{editGoal ? 'Ruaj Ndryshimet' :

                                    'Shto'}</button>

                                <button type="button" onClick={() =>

                                    setShowModal(false)}>Anulo</button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar
                closeOnClick pauseOnHover />
        </div>
    );
};

export default Goals;
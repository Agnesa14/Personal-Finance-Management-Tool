// pages/Settings.js
import React, { useState, useEffect } from 'react';
import './Settings.css';
import { toast } from 'react-toastify';
const Settings = () => {
    const [formData, setFormData] = useState({
        preferredCurrency: 'EUR',
        timezone: 'Europe/Tirane',
        notificationsEnabled: true,
        darkMode: false
    });
    const user = JSON.parse(localStorage.getItem('user') ||
        sessionStorage.getItem('user'));
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/settings/${user.id}`);
                const data = await res.json();
                setFormData(data);
            } catch (err) {
                toast.error('Gabim gjatë ngarkimit të preferencave');
            }
        };
        if (user) fetchSettings();
    }, [user]);
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/settings/${user.id}`, {
                method: 'PUT',

                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) toast.success('Preferencat u ruajtën me sukses!');
            else toast.error(data.message || 'Gabim gjatë ruajtjes');
        } catch (err) {
            toast.error('Gabim në rrjet.');
        }
    };
    return (
        <div className="settings-container">
            <h2>Preferencat e Përdoruesit</h2>
            <form onSubmit={handleSubmit} className="settings-form">
                <label>Valuta e preferuar:</label>
                <select name="preferredCurrency" value={formData.preferredCurrency}
                    onChange={handleChange}>

                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                </select>
                <label>Zona kohore (timezone):</label>
                <select name="timezone" value={formData.timezone}
                    onChange={handleChange}>

                    <option value="Europe/Tirane">Europe/Tirane</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                </select>
                <label>
                    <input
                        type="checkbox"
                        name="notificationsEnabled"
                        checked={formData.notificationsEnabled}
                        onChange={handleChange}
                    />
                    Aktivizo njoftimet
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="darkMode"

                        checked={formData.darkMode}
                        onChange={handleChange}
                    />
                    Dark Mode
                </label>
                <button type="submit">Ruaj Preferencat</button>
            </form>
        </div>
    );
};
export default Settings;
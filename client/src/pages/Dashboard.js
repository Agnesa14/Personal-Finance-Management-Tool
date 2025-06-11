// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaChartPie,
  FaListAlt,
  FaCog,
  FaWallet,
  FaSignOutAlt,
  FaUserCircle,
  FaCalculator,
  FaBell
} from 'react-icons/fa';
import './Dashboard.css';
import QuickActionModal from '../components/QuickActionModal';
import CalculatorModal from '../components/CalculatorModal';
import NotificationDropdown from '../components/NotificationDropdown';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!token || !userData) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchNotifications(parsedUser._id || parsedUser.id);
    }
  }, [navigate]);

  const fetchNotifications = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/notifications?userId=${userId}`);
      const data = await res.json();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (err) {
      console.error("Gabim gjatë marrjes së njoftimeve:", err);
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter(n => !n.read);
    await Promise.all(
      unread.map(n =>
        fetch(`http://localhost:5000/api/notifications/${n._id}/read`, {
          method: 'PUT'
        })
      )
    );
    fetchNotifications(user._id || user.id);
  };

  const handleOpenNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      markAllAsRead();
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: 'DELETE'
      });
      fetchNotifications(user._id || user.id);
    } catch (err) {
      console.error('Gabim gjatë fshirjes së njoftimit:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  if (!user) return <p className="loading">Po ngarkohet...</p>;

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>
        <div className="sidebar-section">
          <p className="section-title">Main</p>
          <Link to="/dashboard" className="sidebar-link">
            <FaTachometerAlt /> Dashboard
          </Link>
        </div>
        <div className="sidebar-section">
          <p className="section-title">Transactions</p>
          <Link to="/dashboard/transactions?tab=income" className="sidebar-link">
            <FaMoneyBillWave /> Income
          </Link>
          <Link to="/dashboard/transactions?tab=expenses" className="sidebar-link">
            <FaMoneyBillWave /> Expenses
          </Link>
        </div>
        <div className="sidebar-section">
          <p className="section-title">Tools</p>
          <Link to="/dashboard/budget" className="sidebar-link">
            <FaChartPie /> Budgets
          </Link>
          <Link to="/dashboard/goals" className="sidebar-link">
            <FaListAlt /> Goals
          </Link>
          <Link to="/dashboard/reports" className="sidebar-link">
            <FaChartPie /> Reports
          </Link>
        </div>
        <div className="sidebar-section">
          <p className="section-title">Settings</p>
          <Link to="/dashboard/accounts" className="sidebar-link">
            <FaWallet /> Accounts
          </Link>
          <Link to="/dashboard/settings" className="sidebar-link">
            <FaCog /> Preferences
          </Link>
        </div>
        <div className="sidebar-footer">
          <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button className="new-btn" onClick={() => setShowModal(true)}>+ New</button>

          <div className="topbar-right">
            {/* 🔔 Notification */}
            <div className="notification-wrapper">
              <button
                className="calculator-btn"
                title="Njoftime"
                onClick={handleOpenNotifications}
              >
                <FaBell />
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              </button>
              {showNotifications && (
                <NotificationDropdown
                  notifications={notifications}
                  onDelete={handleDeleteNotification}
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            {/* 🧮 Calculator */}
            <button
              className="calculator-btn"
              title="Kalkulator"
              onClick={() => setShowCalculator(true)}
            >
              <FaCalculator size={18} />
            </button>

            <div className="user-info">
              <FaUserCircle size={20} style={{ marginRight: '8px' }} />
              {user.name || user.email}
            </div>
          </div>
        </header>

        <main className="main-content">
          {showModal && <QuickActionModal onClose={() => setShowModal(false)} />}
          {showCalculator && <CalculatorModal onClose={() => setShowCalculator(false)} />}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

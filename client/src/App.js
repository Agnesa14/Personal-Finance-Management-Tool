import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Home from './Home';
import ExpenseList from './pages/ExpenseList';
import HomeDashboard from './pages/HomeDashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Goals from './pages/Goals';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Accounts from './pages/Accounts'; 


function App() {
  return (
    <Router>
      <Routes>
        {/* Rrugët jashtë dashboard-it */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard dhe nënfaqet e tij */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomeDashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="expenses" element={<ExpenseList />} />
          <Route path="budget" element={<Budget />} />
          <Route path="goals" element={<Goals />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="accounts" element={<Accounts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

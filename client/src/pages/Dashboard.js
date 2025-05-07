import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lexo nga localStorage ose sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login'); // nëse nuk është i kyçur, dërgo te login
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Mirë se erdhe, {user.name}!</p>
          <p>Emaili: {user.email}</p>
          <button onClick={handleLogout}>Dil</button>
        </div>
      ) : (
        <p>Po ngarkohet...</p>
      )}
    </div>
  );
};

export default Dashboard;

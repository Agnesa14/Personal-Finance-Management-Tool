import React from 'react';
import './NotificationDropdown.css';

const NotificationDropdown = ({ notifications, onClose, onDelete }) => {
  return (
    <div className="notification-dropdown">
      <div className="dropdown-header">
        <span>Njoftimet</span>
        <button onClick={onClose}>X</button>
      </div>
      <ul>
        {notifications.length === 0 ? (
          <li className="no-notifications">Nuk ka njoftime të reja.</li>
        ) : (
          notifications
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((n, i) => (
              <li key={n._id || i}>
                <div>{n.message}</div>
                <small>{new Date(n.createdAt).toLocaleString('sq-AL')}</small>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(n._id)}
                >
                  Fshij
                </button>
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default NotificationDropdown;

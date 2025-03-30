import React, { useState } from 'react';
import './style.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 1, icon: '📊', label: 'Dashboard' },
    { id: 2, icon: '📄', label: 'Data Log' },
    { id: 3, icon: '✓', label: 'Test Checkpoints' },
    { id: 4, icon: '⚙️', label: 'Settings' },
    { id: 5, icon: '📈', label: 'Analytics' },
    { id: 6, icon: '🎯', label: 'Mission Control' }
  ];

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="toggle-button" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '→' : '←'}
      </button>
      <div className="sidebar-content">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
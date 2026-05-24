import React, { useState } from 'react';
import './ShutDownWindow.css';

function ShutDownWindow() {
  const [state, setState] = useState('idle');

  const handleRestart = () => {
    setState('shutting-down');
    setTimeout(() => window.location.reload(), 1500);
  };

  const handleShutdown = () => {
    setState('shutting-down');
  };

  const handleLogOff = () => {
    setState('shutting-down');
    setTimeout(() => window.location.reload(), 1000);
  };

  if (state === 'shutting-down') {
    return (
      <div className="shutdown-overlay">
        <div className="shutdown-text">Windows is shutting down...</div>
      </div>
    );
  }

  return (
    <div className="shutdown-window">
      <div className="shutdown-header">
        <span style={{ fontSize: 32, marginRight: 12 }}>&#x1F4BB;</span>
        <div>
          <div style={{ fontWeight: 600, color: '#1a3a5c' }}>Shut down Windows</div>
          <div style={{ fontSize: 11, color: '#666' }}>What do you want the computer to do?</div>
        </div>
      </div>
      <div className="shutdown-buttons">
        <button className="shutdown-option" onClick={handleShutdown}>
          <span className="shutdown-opt-icon">&#x23FB;</span> Shut down
        </button>
        <button className="shutdown-option" onClick={handleRestart}>
          <span className="shutdown-opt-icon">&#x21bb;</span> Restart
        </button>
        <button className="shutdown-option" onClick={handleLogOff}>
          <span className="shutdown-opt-icon">&#x1F6AA;</span> Log off
        </button>
      </div>
    </div>
  );
}

export default ShutDownWindow;

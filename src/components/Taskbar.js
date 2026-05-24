import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useWindowManager } from '../contexts/WindowContext';
import Clock from './ClockTaskbar';
import SystemTray from './SystemTray';
import StartMenu from './StartMenu';
import './Taskbar.css';

function Taskbar({ isPlaying, togglePlayPause }) {
  const { windows, toggleWindow } = useWindowManager();
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const handleStartClick = (e) => {
    e.stopPropagation();
    setStartMenuOpen(prev => !prev);
  };

  return (
    <>
      <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
      <div className="taskbar">
        <div className="taskbar-start">
          <button className="start-orb" onClick={handleStartClick}>
            <span className="orb-inner">
              <img src="/start.png" alt="Start" />
            </span>
          </button>
        </div>
        <div className="taskbar-apps">
          {windows.map(win => (
            <div
              key={win.id}
              className={`taskbar-app-btn ${win.isMinimized ? 'minimized' : ''}`}
              onClick={() => toggleWindow(win.id)}
            >
              {win.icon && <img src={win.icon} alt="" style={{ width: 16, height: 16, marginRight: 4 }} />}
              <span>{win.title}</span>
            </div>
          ))}
        </div>
        <div className="taskbar-right">
          <div className="music-controls" onClick={togglePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="sm" className="play-pause-icon" />
          </div>
          <SystemTray />
          <Clock />
        </div>
      </div>
    </>
  );
}

export default Taskbar;

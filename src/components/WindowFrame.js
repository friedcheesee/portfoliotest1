import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useWindowManager } from '../contexts/WindowContext';
import './WindowFrame.css';

function WindowFrame({ window: win }) {
  const { closeWindow, minimizeWindow, maximizeWindow, unmaximizeWindow, focusWindow, moveWindow } = useWindowManager();
  const [anim, setAnim] = useState('open');

  const handleClose = () => {
    setAnim('close');
    setTimeout(() => closeWindow(win.id), 200);
  };

  const onDragStop = (_, data) => {
    moveWindow(win.id, { x: data.x, y: data.y });
  };

  return (
    <Draggable
      disabled={win.isMaximized}
      defaultPosition={win.position}
      position={win.isMaximized ? { x: 0, y: 0 } : win.position}
      bounds={{ left: 0, top: 0 }}
      handle=".window-titlebar"
      onStart={() => focusWindow(win.id)}
      onStop={onDragStop}
      nodeRef={React.createRef()}
    >
      <div
        className={`window-frame ${anim} ${win.isMaximized ? 'maximized' : ''}`}
        style={{
          zIndex: win.zIndex,
          width: win.isMaximized ? '100vw' : win.size.width,
          height: win.isMaximized ? `calc(100vh - var(--taskbar-height))` : win.size.height,
        }}
        onMouseDown={() => focusWindow(win.id)}
      >
        <div className="window-titlebar" onDoubleClick={() => { if (win.isMaximized) unmaximizeWindow(win.id); else maximizeWindow(win.id); }}>
          <span className="window-icon">
            {win.icon && <img src={win.icon} alt="" style={{ width: 16, height: 16 }} />}
          </span>
          <span className="window-title-text">{win.title}</span>
          <div className="window-buttons">
            <button className="win-btn minimize" onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }} title="Minimize">&#x2015;</button>
            <button className="win-btn maximize" onClick={(e) => { e.stopPropagation(); if (win.isMaximized) unmaximizeWindow(win.id); else maximizeWindow(win.id); }} title={win.isMaximized ? "Restore" : "Maximize"}>
              {win.isMaximized ? '&#x239E;' : '&#x25A1;'}
            </button>
            <button className="win-btn close" onClick={(e) => { e.stopPropagation(); handleClose(); }} title="Close">&#x2715;</button>
          </div>
        </div>
        <div className="window-content">
          <win.component {...win.componentProps} />
        </div>
      </div>
    </Draggable>
  );
}

export default WindowFrame;

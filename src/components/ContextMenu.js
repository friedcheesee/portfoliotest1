import React, { useEffect, useRef } from 'react';
import './ContextMenu.css';

function ContextMenu({ position }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        // Close handled by parent setting position to null
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const items = [
    { label: 'View', sub: true },
    { label: 'Sort by', sub: true },
    { label: 'Refresh', action: handleRefresh },
    { divider: true },
    { label: 'New', sub: true },
    { divider: true },
    { label: 'Screen resolution' },
    { label: 'Personalize' },
  ];

  // Ensure menu stays within viewport
  const style = {
    top: Math.min(position.y, window.innerHeight - 300),
    left: Math.min(position.x, window.innerWidth - 200),
  };

  return (
    <div className="context-menu" ref={menuRef} style={style}>
      {items.map((item, i) =>
        item.divider
          ? <div key={i} className="context-divider" />
          : (
            <div key={i} className="context-item" onClick={item.action}>
              <span>{item.label}</span>
              {item.sub && <span className="context-arrow">{'>'}</span>}
            </div>
          )
      )}
    </div>
  );
}

export default ContextMenu;

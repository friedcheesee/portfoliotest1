import React from 'react';

function RecycleBinWindow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'white', fontFamily: 'var(--win7-font)', fontSize: '13px' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>&#x1F4D6;</div>
      <div style={{ color: '#666' }}>This Folder is Empty</div>
    </div>
  );
}

export default RecycleBinWindow;

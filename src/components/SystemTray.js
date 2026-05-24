import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faWifi, faPlug } from '@fortawesome/free-solid-svg-icons';
import './SystemTray.css';

function SystemTray() {
  return (
    <div className="system-tray">
      <div className="tray-icons">
        <div className="tray-icon" title="Volume"><FontAwesomeIcon icon={faVolumeHigh} size="xs" /></div>
        <div className="tray-icon" title="Network"><FontAwesomeIcon icon={faWifi} size="xs" /></div>
        <div className="tray-icon" title="Power"><FontAwesomeIcon icon={faPlug} size="xs" /></div>
        <div className="tray-icon" title="Show hidden icons">&#x25B2;</div>
      </div>
    </div>
  );
}

export default SystemTray;

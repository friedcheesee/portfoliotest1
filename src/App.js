import React, { useState, useRef } from 'react';
import './App.css';
import { WindowProvider, useWindowManager } from './contexts/WindowContext';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import ContextMenu from './components/ContextMenu';
import StartingVideo from './StartingVideo';
import folderImage from './images/folder.png';
import recycleBinImage from './images/recycle-bin.png';
import githubImage from './images/github.png';
import linkedinImage from './images/linkedin.png';
import mailImage from './images/mail.png';
import ProjectsListWindow from './components/ProjectsListWindow';
import RecycleBinWindow from './components/RecycleBinWindow';
import AboutWindow from './components/AboutWindow';

const desktopIcons = [
  { label: 'My Projects', image: folderImage, windowTitle: 'My Projects', windowComponent: ProjectsListWindow, windowIcon: folderImage },
  { label: 'Recycle Bin', image: recycleBinImage, windowTitle: 'Recycle Bin', windowComponent: RecycleBinWindow, windowIcon: null },
  { label: 'About Me', image: mailImage, windowTitle: 'About Me', windowComponent: AboutWindow, windowIcon: mailImage },
  { label: 'GitHub', image: githubImage, external: 'https://github.com/friedcheesee' },
  { label: 'LinkedIn', image: linkedinImage, external: 'https://www.linkedin.com/in/piyush-kumar-yadav/' },
  { label: 'Mail', image: mailImage, external: 'mailto:piyush20152003@gmail.com' },
];

function DesktopContent() {
  const { openWindow } = useWindowManager();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const audioRef = useRef(null);

  const handleVideoEnd = () => setShowDesktop(true);

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleIconClick = (icon, e) => {
    setSelectedIcon(desktopIcons.indexOf(icon));
    if (e.detail === 2) {
      // Double click
      if (icon.external) {
        window.open(icon.external, '_blank', 'noopener,noreferrer');
      } else if (icon.windowComponent) {
        openWindow({
          title: icon.windowTitle,
          icon: icon.windowIcon,
          component: icon.windowComponent,
          componentProps: {},
          defaultSize: { width: 700, height: 450 },
        });
      }
    }
  };

  const handleDesktopRightClick = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Close context menu on left click
  React.useEffect(() => {
    if (!contextMenu) return;
    const handler = () => setContextMenu(null);
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [contextMenu]);

  return (
    <div className="app">
      {!showDesktop && <StartingVideo onVideoEnd={handleVideoEnd} />}

      {showDesktop && (
        <div
          className="desktop"
          onContextMenu={handleDesktopRightClick}
          onClick={() => setContextMenu(null)}
        >
          <div className="icons">
            {desktopIcons.map((icon, i) => (
              <div
                key={i}
                className={`icon ${selectedIcon === i ? 'selected' : ''}`}
                onClick={(e) => handleIconClick(icon, e)}
              >
                <img src={icon.image} alt={icon.label} />
                <span>{icon.label}</span>
              </div>
            ))}
          </div>

          <WindowManager />

          {contextMenu && <ContextMenu position={contextMenu} />}

          <Taskbar isPlaying={isPlaying} togglePlayPause={togglePlayPause} />

          <audio ref={audioRef} src="/images/Kalimba.mp3" />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <WindowProvider>
      <DesktopContent />
    </WindowProvider>
  );
}

export default App;

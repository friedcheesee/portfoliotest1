import React, { useState, useRef, useEffect } from 'react';
import { useWindowManager } from '../contexts/WindowContext';
import ProjectsListWindow from './ProjectsListWindow';
import AboutWindow from './AboutWindow';
import ShutDownWindow from './ShutDownWindow';
import RecycleBinWindow from './RecycleBinWindow';
import folderImage from '../images/folder.png';
import githubImage from '../images/github.png';
import linkedinImage from '../images/linkedin.png';
import mailImage from '../images/mail.png';
import './StartMenu.css';

const programs = [
  { label: 'My Projects', icon: folderImage, action: 'projects', winTitle: 'My Projects', winComponent: ProjectsListWindow, winIcon: folderImage },
  { label: 'About Me', icon: mailImage, action: 'about', winTitle: 'About Me', winComponent: AboutWindow, winIcon: mailImage },
  { label: 'Recycle Bin', icon: null, action: 'recycle', winTitle: 'Recycle Bin', winComponent: RecycleBinWindow, winIcon: null },
  { label: 'GitHub', icon: githubImage, action: 'github', external: 'https://github.com/friedcheesee' },
  { label: 'LinkedIn', icon: linkedinImage, action: 'linkedin', external: 'https://www.linkedin.com/in/piyush-kumar-yadav/' },
  { label: 'Email', icon: mailImage, action: 'email', external: 'mailto:piyush20152003@gmail.com' },
];

const places = [
  { label: 'Computer', icon: 'fa-laptop' },
  { label: 'Documents', icon: 'fa-folder' },
  { label: 'Pictures', icon: 'fa-image' },
  { label: 'Music', icon: 'fa-music' },
  { label: 'Control Panel', icon: 'fa-cogs' },
];

function StartMenu({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [allProgs, setAllProgs] = useState(false);
  const ref = useRef(null);
  const { openWindow } = useWindowManager();

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handler); };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleProgram = (prog) => {
    onClose();
    if (prog.external) {
      window.open(prog.external, '_blank', 'noopener,noreferrer');
      return;
    }
    if (prog.winComponent) {
      openWindow({
        title: prog.winTitle,
        icon: prog.winIcon,
        component: prog.winComponent,
        componentProps: {},
        defaultSize: prog.defaultSize || { width: 700, height: 450 },
      });
    }
  };

  const handleShutDown = () => {
    onClose();
    openWindow({
      title: 'Shut Down Windows',
      icon: null,
      component: ShutDownWindow,
      componentProps: {},
      defaultSize: { width: 380, height: 180 },
    });
  };

  const filtered = programs.filter(p => p.label.toLowerCase().includes(search.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="start-menu" ref={ref}>
      <div className="start-menu-left">
        <div className="start-menu-list">
          {filtered.map(p => (
            <div key={p.action} className="start-menu-item" onClick={() => handleProgram(p)}>
              {p.icon && <img src={p.icon} alt="" className="start-menu-item-icon" />}
              {!p.icon && <span className="start-menu-item-icon start-menu-item-icon-none">{p.label[0]}</span>}
              <span>{p.label}</span>
            </div>
          ))}
        </div>
        <div className="start-menu-all-programs" onClick={() => setAllProgs(!allProgs)}>
          {allProgs ? '▲' : '▼'} All Programs
        </div>
      </div>
      <div className="start-menu-right">
        {places.map(p => (
          <div key={p.label} className="start-menu-place">
            <span className="start-menu-place-icon">▶</span>
            <span>{p.label}</span>
          </div>
        ))}
      </div>
      <div className="start-menu-search">
        <input
          type="text"
          placeholder="Search programs and files"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onClick={e => e.stopPropagation()}
        />
      </div>
      <div className="start-menu-footer">
        <button className="shutdown-btn" onClick={handleShutDown}>
          <span className="shutdown-icon">&#x23FB;</span> Shut down
        </button>
      </div>
    </div>
  );
}

export default StartMenu;

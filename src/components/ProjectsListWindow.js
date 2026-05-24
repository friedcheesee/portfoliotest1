import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useWindowManager } from '../contexts/WindowContext';
import ProjectWindow from './ProjectWindow';
import folderImage from '../images/folder.png';
import './ProjectsListWindow.css';

function ProjectsListWindow() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const { openWindow } = useWindowManager();

  useEffect(() => {
    axios.get('https://portfoliobackend-1-rb9h.onrender.com/api/projects')
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  const openProject = (project) => {
    setSelected(project);
    openWindow({
      title: project.name,
      icon: folderImage,
      component: ProjectWindow,
      componentProps: { project },
      defaultSize: { width: 550, height: 400 },
    });
  };

  return (
    <div className="explorer-window">
      <div className="explorer-toolbar">
        <span className="explorer-breadcrumb">Libraries &gt; My Projects</span>
      </div>
      <div className="explorer-sidebar">
        <div className="sidebar-item active"><span>&#x1F4C1;</span> My Projects</div>
        <div className="sidebar-item"><span>&#x1F4C1;</span> Documents</div>
        <div className="sidebar-item"><span>&#x1F3A8;</span> Music</div>
        <div className="sidebar-item"><span>&#x1F5BC;</span> Pictures</div>
      </div>
      <div className="explorer-content">
        <div className="project-explorer-list">
          {projects.map(p => (
            <div
              key={p._id}
              className={`project-explorer-item ${selected?._id === p._id ? 'selected' : ''}`}
              onDoubleClick={() => openProject(p)}
              onClick={() => setSelected(p)}
            >
              <span className="project-explorer-icon">&#x1F4C2;</span>
              <div className="project-explorer-info">
                <div className="project-explorer-name">{p.name}</div>
                <div className="project-explorer-desc">{p.description?.slice(0, 60)}{p.description?.length > 60 ? '...' : ''}</div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="explorer-empty">Loading projects...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsListWindow;

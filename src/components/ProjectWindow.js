import React from 'react';
import './ProjectWindow.css';

function ProjectWindow({ project }) {
  if (!project) return <div className="project-empty">No project selected.</div>;

  return (
    <div className="project-window">
      <div className="project-header">
        <h2 className="project-title">{project.name}</h2>
      </div>
      <div className="project-body">
        <p className="project-desc">{project.description}</p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-techs">
            <strong>Technologies:</strong>
            <div className="tech-badges">
              {project.technologies.map((t, i) => (
                <span key={i} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
            View Project
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectWindow;

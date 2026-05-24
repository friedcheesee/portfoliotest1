import React from 'react';
import './AboutWindow.css';

function AboutWindow() {
  return (
    <div className="about-window">
      <div className="about-sidebar">
        <div className="about-avatar">&#x1F464;</div>
        <div className="about-name">Piyush Kumar Yadav</div>
        <div className="about-role">Full Stack Developer</div>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h3>About Me</h3>
          <p>
            I'm a passionate developer with experience in building web applications
            using modern technologies. I enjoy creating clean, functional, and
            user-friendly software solutions.
          </p>
        </div>
        <div className="about-section">
          <h3>Contact</h3>
          <div className="about-links">
            <a href="https://github.com/friedcheesee" target="_blank" rel="noopener noreferrer" className="about-link">
              <span className="about-link-icon">&#x1F4BB;</span> GitHub
            </a>
            <a href="https://www.linkedin.com/in/piyush-kumar-yadav/" target="_blank" rel="noopener noreferrer" className="about-link">
              <span className="about-link-icon">&#x1F4E3;</span> LinkedIn
            </a>
            <a href="mailto:piyush20152003@gmail.com" className="about-link">
              <span className="about-link-icon">&#x2709;</span> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutWindow;

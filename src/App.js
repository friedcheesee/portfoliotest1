import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import folderImage from './images/folder.png';
import recycleBinImage from './images/recycle-bin.png';
import githubImage from './images/github.png';
import linkedinImage from './images/linkedin.png';
import mailImage from './images/mail.png';
import Clock from './Clock';
import StartingVideo from './StartingVideo'; // Import the StartingVideo component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [projects, setProjects] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [showDesktop, setShowDesktop] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Track the selected project

  const handleVideoEnd = () => {
    setShowDesktop(true);
  };

  useEffect(() => {
    axios.get('https://portfoliobackend-1-rb9h.onrender.com/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error('Play error:', error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  const handleProjectIconClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project); // Set the selected project
  };

  const handleCloseStartMenu = () => {
    setIsStartMenuOpen(false);
    setSelectedProject(null); // Clear the selected project when closing the menu
  };

  return (
    <div className="app">
      {!showDesktop && <StartingVideo onVideoEnd={handleVideoEnd} />}
      
      {showDesktop && (
        <div className="desktop">
          <div className="taskbar">
            <div className="start-button" onClick={handleProjectIconClick}>
              <img src="/start.png" alt="Windows Logo" />
            </div>
            <div className="music-controls">
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                onClick={togglePlayPause}
                size="lg"
                className="play-pause-icon"
              />
            </div>
            <Clock />
          </div>

          {isStartMenuOpen && (
            <div className="start-menu">
              <div className="menu-left">
                <ul className="project-list">
                  {projects.map(project => (
                    <li
                      key={project._id}
                      onClick={() => handleProjectClick(project)} // Set selected project on click
                      className="project-name"
                    >
                      {project.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="menu-right">
                {selectedProject ? (
                  <>
                    <h3>{selectedProject.name}</h3>
                    <p>{selectedProject.description}</p>
                    <ul>
                      {selectedProject.technologies?.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                    <button onClick={handleCloseStartMenu}>Close</button> {/* Button to close the start menu */}
                  </>
                ) : (
                  <p>Hover over or click an item to preview</p>
                )}
              </div>
            </div>
          )}

          <div className="icons">
            <div className="icon" onClick={handleProjectIconClick}>
              <img src={folderImage} alt="Folder" />
              <span>My Projects</span>
            </div>
            <div className="icon">
              <img src={recycleBinImage} alt="Recycle Bin" />
              <span>Recycle Bin</span>
            </div>
            <div className="icon">
              <a href="https://github.com/friedcheesee" target="_blank" rel="noopener noreferrer">
                <img src={githubImage} alt="GitHub" />
              </a>
              <span>GitHub</span>
            </div>
            <div className="icon">
              <a href="https://www.linkedin.com/in/piyush-kumar-yadav/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinImage} alt="LinkedIn" />
              </a>
              <span>LinkedIn</span>
            </div>
            <div className="icon">
              <a href="mailto:piyush20152003@gmail.com">
                <img src={mailImage} alt="Mail" />
              </a>
              <span>Mail</span>
            </div>
          </div>

          <audio ref={audioRef} src="/images/Kalimba.mp3" />
        </div>
      )}
    </div>
  );
}

export default App;

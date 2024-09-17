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
import Modal from './Modal'; // Import the Modal component

function App() {
  const [projects, setProjects] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [showDesktop, setShowDesktop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoEnd = () => {
    setShowDesktop(true);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              <button onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
            <Clock />
          </div>
          
          <div className="icons">
            <div className="icon" onClick={handleProjectIconClick}>
              <img src={folderImage} alt="Folder" />
              <span>My Projects</span>
            </div>
            <div className="icon">
              <img src={recycleBinImage} alt="Recycle Bin" onClick={handleProjectIconClick} />
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

          <div className="project-list">
            {projects.map((project, index) => (
              <div key={index} className="project">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>

          <audio ref={audioRef} src="/images/Kalimba.mp3" autoPlay />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;

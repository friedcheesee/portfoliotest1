import React, { useState, useEffect } from 'react';
import './StartingVideo.css';

function StartingVideo({ onVideoEnd }) {
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    onVideoEnd();
  };

  return (
    <div className={`starting-video ${isVideoEnded ? 'hidden' : ''}`}>
      <video autoPlay muted onEnded={handleVideoEnd} className="video">
        <source src="/starting-windows.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default StartingVideo;

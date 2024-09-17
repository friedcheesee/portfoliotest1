// src/Clock.js
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="clock">
      {format(time, 'hh:mm a')} {/* Format time in AM/PM using date-fns */}
    </div>
  );
}

export default Clock;

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="taskbar-clock">
      <div className="clock-time">{format(time, 'hh:mm a')}</div>
      <div className="clock-date">{format(time, 'MM/dd/yyyy')}</div>
    </div>
  );
}

export default Clock;

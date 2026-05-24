import React from 'react';
import { useWindowManager } from '../contexts/WindowContext';
import WindowFrame from './WindowFrame';

function WindowManager() {
  const { windows } = useWindowManager();

  return (
    <>
      {windows.filter(w => !w.isMinimized).map(win => (
        <WindowFrame key={win.id} window={win} />
      ))}
    </>
  );
}

export default WindowManager;

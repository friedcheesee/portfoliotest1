import React, { createContext, useContext, useReducer } from 'react';

const WindowContext = createContext();

let nextId = 1;

function windowReducer(state, action) {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const id = nextId++;
      const center = {
        x: 80 + (state.length * 30) % 300,
        y: 40 + (state.length * 30) % 200,
      };
      const win = {
        id,
        title: action.title,
        icon: action.icon,
        component: action.component,
        componentProps: action.componentProps,
        zIndex: 100 + state.length + 1,
        isMinimized: false,
        isMaximized: false,
        position: center,
        size: action.defaultSize || { width: 600, height: 400 },
        defaultSize: action.defaultSize || { width: 600, height: 400 },
        prevBounds: null,
      };
      return [...state, win];
    }
    case 'CLOSE_WINDOW':
      return state.filter(w => w.id !== action.id);
    case 'MINIMIZE_WINDOW':
      return state.map(w => w.id === action.id ? { ...w, isMinimized: true } : w);
    case 'RESTORE_WINDOW':
      return state.map(w => w.id === action.id ? { ...w, isMinimized: false, zIndex: Math.max(...state.map(s => s.zIndex)) + 1 } : w);
    case 'MAXIMIZE_WINDOW': {
      return state.map(win => win.id === action.id
        ? { ...win, isMaximized: true, prevBounds: { position: win.position, size: win.size, zIndex: win.zIndex } }
        : win);
    }
    case 'UNMAXIMIZE_WINDOW': {
      const maxZ = Math.max(...state.map(s => s.zIndex)) + 1;
      return state.map(win => win.id === action.id
        ? { ...win, isMaximized: false, position: win.prevBounds?.position || win.position, size: win.prevBounds?.size || win.size, zIndex: maxZ }
        : win);
    }
    case 'FOCUS_WINDOW':
      return state.map(w => w.id === action.id ? { ...w, zIndex: Math.max(...state.map(s => s.zIndex)) + 1 } : w);
    case 'MOVE_WINDOW':
      return state.map(w => w.id === action.id ? { ...w, position: action.position } : w);
    case 'RESIZE_WINDOW':
      return state.map(w => w.id === action.id ? { ...w, size: action.size } : w);
    default:
      return state;
  }
}

export function WindowProvider({ children }) {
  const [windows, dispatch] = useReducer(windowReducer, []);

  function openWindow(opts) {
    dispatch({ type: 'OPEN_WINDOW', ...opts });
  }

  function closeWindow(id) {
    dispatch({ type: 'CLOSE_WINDOW', id });
  }

  function minimizeWindow(id) {
    dispatch({ type: 'MINIMIZE_WINDOW', id });
  }

  function maximizeWindow(id) {
    dispatch({ type: 'MAXIMIZE_WINDOW', id });
  }

  function unmaximizeWindow(id) {
    dispatch({ type: 'UNMAXIMIZE_WINDOW', id });
  }

  function focusWindow(id) {
    dispatch({ type: 'FOCUS_WINDOW', id });
  }

  function toggleWindow(id) {
    const w = windows.find(w => w.id === id);
    if (!w) return;
    if (w.isMinimized) {
      dispatch({ type: 'RESTORE_WINDOW', id });
    } else if (w.zIndex === Math.max(...windows.map(s => s.zIndex))) {
      dispatch({ type: 'MINIMIZE_WINDOW', id });
    } else {
      dispatch({ type: 'FOCUS_WINDOW', id });
    }
  }

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, unmaximizeWindow, focusWindow, toggleWindow }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowManager() {
  return useContext(WindowContext);
}

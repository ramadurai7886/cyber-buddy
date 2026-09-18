import React, { createContext, useContext, useState, useEffect } from 'react';

interface DiscreetContextType {
  isDiscreetMode: boolean;
  triggerQuickExit: () => void;
  exitDiscreetMode: () => void;
}

const DiscreetContext = createContext<DiscreetContextType | undefined>(undefined);

export const DiscreetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDiscreetMode, setIsDiscreetMode] = useState(false);

  // Allow ESC key x2 or Alt+Q shortcut for instant quick exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'q') || e.key === 'Escape') {
        setIsDiscreetMode(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerQuickExit = () => {
    setIsDiscreetMode(true);
  };

  const exitDiscreetMode = () => {
    setIsDiscreetMode(false);
  };

  return (
    <DiscreetContext.Provider value={{ isDiscreetMode, triggerQuickExit, exitDiscreetMode }}>
      {children}
    </DiscreetContext.Provider>
  );
};

export const useDiscreet = (): DiscreetContextType => {
  const context = useContext(DiscreetContext);
  if (!context) {
    throw new Error('useDiscreet must be used within a DiscreetProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';

export type DiscreetModel = 'calculator' | 'weather';

interface DiscreetContextType {
  isDiscreetMode: boolean;
  discreetModel: DiscreetModel;
  setDiscreetModel: (model: DiscreetModel) => void;
  triggerQuickExit: (model?: DiscreetModel) => void;
  exitDiscreetMode: () => void;
}

const DiscreetContext = createContext<DiscreetContextType | undefined>(undefined);

export const DiscreetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDiscreetMode, setIsDiscreetMode] = useState<boolean>(() => {
    return localStorage.getItem('cyberbuddy_discreet_mode') === 'true';
  });

  const [discreetModel, setDiscreetModelState] = useState<DiscreetModel>(() => {
    return (localStorage.getItem('cyberbuddy_discreet_model') as DiscreetModel) || 'calculator';
  });

  const setDiscreetModel = (model: DiscreetModel) => {
    setDiscreetModelState(model);
    localStorage.setItem('cyberbuddy_discreet_model', model);
  };

  // Allow ESC key or Alt+Q shortcut for instant quick exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'q') || e.key === 'Escape') {
        triggerQuickExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [discreetModel]);

  const triggerQuickExit = (model?: DiscreetModel) => {
    if (model) {
      setDiscreetModel(model);
    }
    setIsDiscreetMode(true);
    localStorage.setItem('cyberbuddy_discreet_mode', 'true');
  };

  const exitDiscreetMode = () => {
    setIsDiscreetMode(false);
    localStorage.removeItem('cyberbuddy_discreet_mode');
  };

  return (
    <DiscreetContext.Provider
      value={{
        isDiscreetMode,
        discreetModel,
        setDiscreetModel,
        triggerQuickExit,
        exitDiscreetMode,
      }}
    >
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

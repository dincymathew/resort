"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  snowActive: boolean;
  setSnowActive: (active: boolean) => void;
  elephantsTriggered: boolean;
  setElephantsTriggered: (triggered: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  selectedRoomId: string | undefined;
  setSelectedRoomId: (id: string | undefined) => void;
  handleOpenBookingModal: (roomId?: string) => void;
  handleTriggerElephants: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [snowActive, setSnowActive] = useState<boolean>(true);
  const [elephantsTriggered, setElephantsTriggered] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setElephantsTriggered(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenBookingModal = (roomId?: string) => {
    setSelectedRoomId(roomId);
    setIsBookingModalOpen(true);
  };

  const handleTriggerElephants = () => {
    setElephantsTriggered(false);
    setTimeout(() => {
      setElephantsTriggered(true);
    }, 100);
  };

  return (
    <AppContext.Provider value={{
      snowActive, setSnowActive,
      elephantsTriggered, setElephantsTriggered,
      isBookingModalOpen, setIsBookingModalOpen,
      selectedRoomId, setSelectedRoomId,
      handleOpenBookingModal,
      handleTriggerElephants
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

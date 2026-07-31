"use client";

import React from 'react';
import { AppProvider, useAppContext } from './AppContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppBookingModal } from '../components/WhatsAppBookingModal';
import { ElephantHerdEffect } from '../components/ElephantHerdEffect';
import { FloatingWhatsAppFAB } from '../components/FloatingWhatsAppFAB';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { 
    snowActive, setSnowActive, 
    elephantsTriggered, setElephantsTriggered,
    isBookingModalOpen, setIsBookingModalOpen,
    selectedRoomId, handleOpenBookingModal, handleTriggerElephants
  } = useAppContext();

  return (
    <div className="min-h-screen bg-[#070e0a] text-slate-100 relative font-sans-body selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar
        onOpenWhatsAppBooking={() => handleOpenBookingModal()}
        snowActive={snowActive}
        onToggleSnow={() => setSnowActive(!snowActive)}
        onTriggerElephants={handleTriggerElephants}
      />

      <ElephantHerdEffect
        isTriggered={elephantsTriggered}
        onDismiss={() => setElephantsTriggered(false)}
      />

      <main>
        {children}
      </main>

      <Footer onOpenWhatsAppBooking={() => handleOpenBookingModal()} />
      <FloatingWhatsAppFAB onOpenWhatsAppBooking={() => handleOpenBookingModal()} />

      <WhatsAppBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedRoomId={selectedRoomId}
      />
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <LayoutContent>
        {children}
      </LayoutContent>
    </AppProvider>
  );
}

"use client";

import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TestimonialsAndFAQSection } from '../components/TestimonialsAndFAQSection';
import { useAppContext } from './AppContext';

export default function HomePage() {
  const { snowActive, handleOpenBookingModal, handleTriggerElephants } = useAppContext();

  return (
    <>
      <HeroSection
        snowActive={snowActive}
        onOpenWhatsAppBooking={handleOpenBookingModal}
        onTriggerElephants={handleTriggerElephants}
      />
      <TestimonialsAndFAQSection onOpenWhatsAppBooking={handleOpenBookingModal} />
    </>
  );
}

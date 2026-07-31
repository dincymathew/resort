"use client";

import React from 'react';
import { ExperiencesSection } from '../../components/ExperiencesSection';
import { useAppContext } from '../AppContext';

export default function ExperiencesPage() {
  const { handleOpenBookingModal } = useAppContext();

  return (
    <div className="pt-24">
      <ExperiencesSection onOpenWhatsAppBooking={() => handleOpenBookingModal()} />
    </div>
  );
}

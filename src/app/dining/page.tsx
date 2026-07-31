"use client";

import React from 'react';
import { DiningSection } from '../../components/DiningSection';
import { useAppContext } from '../AppContext';

export default function DiningPage() {
  const { handleOpenBookingModal } = useAppContext();

  return (
    <div className="pt-24">
      <DiningSection onOpenWhatsAppBooking={() => handleOpenBookingModal()} />
    </div>
  );
}

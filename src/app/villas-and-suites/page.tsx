"use client";

import React from 'react';
import { RoomsSection } from '../../components/RoomsSection';
import { useAppContext } from '../AppContext';

export default function VillasAndSuitesPage() {
  const { handleOpenBookingModal } = useAppContext();

  return (
    <div className="pt-24">
      <RoomsSection onOpenWhatsAppBooking={handleOpenBookingModal} />
    </div>
  );
}

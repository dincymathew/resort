"use client";

import React from 'react';
import { GallerySection } from '../../components/GallerySection';
import { useAppContext } from '../AppContext';

export default function GalleryPage() {
  const { handleOpenBookingModal } = useAppContext();

  return (
    <div className="pt-24">
      <GallerySection onOpenWhatsAppBooking={() => handleOpenBookingModal()} />
    </div>
  );
}

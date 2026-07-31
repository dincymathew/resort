"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const InteractiveMapSection = dynamic(
  () => import('../../components/InteractiveMapSection').then(mod => mod.InteractiveMapSection),
  { ssr: false }
);

export default function LocationPage() {
  return (
    <div className="pt-24">
      <InteractiveMapSection />
    </div>
  );
}

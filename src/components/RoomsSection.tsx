import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Check, Users, Maximize, Eye, Sparkles, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { ROOMS } from '../data/resortData';
import { Room } from '../types';

interface RoomsSectionProps {
  onOpenWhatsAppBooking: (roomId?: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onOpenWhatsAppBooking }) => {
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [roomId: string]: number }>({});

  const handleNextImage = (roomId: string, maxIndex: number) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % maxIndex,
    }));
  };

  const handlePrevImage = (roomId: string, maxIndex: number) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + maxIndex) % maxIndex,
    }));
  };

  return (
    <section id="villas" className="relative py-24 bg-[#080e0a] border-t border-emerald-900/40 text-slate-100 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-cinzel font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Accommodations & Private Villas
          </span>
          <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-white mt-4">
            Sanctuaries Suspended Above Tea Slopes
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-4 leading-relaxed font-sans-body">
            Designed with natural teak wood, glass walls, warm fireplaces, and private heated pools overlooking Munnar's rolling misty hills.
          </p>
        </div>

        {/* Villa Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ROOMS.map((room) => {
            const currentImgIndex = activeImageIndexes[room.id] || 0;
            const currentImage = room.galleryImages[currentImgIndex] || room.coverImage;

            return (
              <motion.div
                key={room.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl overflow-hidden border border-emerald-800/40 shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Carousel Container */}
                  <div className="relative h-72 md:h-80 overflow-hidden">
                    <img
                      src={currentImage}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                    {/* Carousel Nav Controls */}
                    {room.galleryImages.length > 1 && (
                      <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                        <button
                          onClick={() => handlePrevImage(room.id, room.galleryImages.length)}
                          className="pointer-events-auto p-2 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-white/20 text-white transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleNextImage(room.id, room.galleryImages.length)}
                          className="pointer-events-auto p-2 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-white/20 text-white transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {room.featured && (
                        <span className="bg-amber-400 text-slate-950 font-bold text-[10px] uppercase font-cinzel px-3 py-1 rounded-full shadow-lg">
                          ⭐ Signature Villa
                        </span>
                      )}
                      <span className="bg-emerald-950/80 text-amber-200 border border-amber-500/30 text-[10px] font-sans px-3 py-1 rounded-full backdrop-blur-md">
                        👁️ {room.viewType}
                      </span>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <span className="text-2xl font-serif-display font-bold text-amber-300 drop-shadow-md">
                          ₹{room.priceINR.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-300 ml-1 font-sans">
                          / night (~${room.priceUSD} USD)
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-300 bg-emerald-950/90 px-2.5 py-1 rounded-md border border-emerald-800">
                        Tax Included
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6">
                    <h3 className="text-2xl font-serif-display font-bold text-white group-hover:text-amber-300 transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-cinzel font-medium mt-1">
                      {room.subtitle}
                    </p>

                    <p className="text-xs text-slate-300 mt-3 font-sans-body leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Specs Bar */}
                    <div className="my-4 pt-3 border-t border-emerald-900/60 grid grid-cols-3 gap-2 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Maximize className="w-3.5 h-3.5 text-amber-400" />
                        <span>{room.sizeSqFt} sq ft</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{room.occupancy}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Halal & Private</span>
                      </div>
                    </div>

                    {/* Highlights Pills */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[11px] font-cinzel text-amber-300 uppercase font-semibold block">
                        Villa Highlights
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {room.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-[#122319] text-emerald-200 px-2.5 py-1 rounded-lg border border-emerald-800/50 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-amber-400" /> {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenWhatsAppBooking(room.id)}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all transform hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>Book {room.name} on WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

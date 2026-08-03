import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MessageCircle, Calendar, Users, Sparkles, MapPin, Star, ShieldCheck, ChevronDown, Compass } from 'lucide-react';
import { SnowfallEffect } from './SnowfallEffect';
import { ROOMS, RESORT_CONFIG } from '../data/resortData';

interface HeroSectionProps {
  snowActive: boolean;
  onOpenWhatsAppBooking: (roomId?: string) => void;
  onTriggerElephants: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  snowActive,
  onOpenWhatsAppBooking,
  onTriggerElephants,
}) => {
  const { scrollY } = useScroll();

  // Smooth parallax transforms
  const backgroundY = useTransform(scrollY, [0, 800], [0, 250]);
  const textY = useTransform(scrollY, [0, 800], [0, 120]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0.2]);

  const [selectedRoom, setSelectedRoom] = useState<string>(ROOMS[0].id);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070e0a] pt-24 pb-16">
      {/* Parallax Background Scenery Layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 scale-105"
      >
        {/* Deep Tea Estate Photography Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url('/photo/munnar.jfif')`,
          }}
        />
        {/* Dark Emerald Vignette & Fog Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e0a] via-[#070e0a]/60 to-black/70" />
        <div className="absolute inset-0 bg-emerald-950/30 mix-blend-multiply" />
      </motion.div>

      {/* Snowfall & Mist Canvas Overlay */}
      <SnowfallEffect active={snowActive} intensity="moderate" />

      {/* Main Hero Content */}
      <motion.div
        style={{ y: textY, opacity: opacityText }}
        className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-amber-400/40 text-amber-300 text-xs font-cinzel font-semibold tracking-widest uppercase mb-6 backdrop-blur-md shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>Munnar, Kerala</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif-display font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-2xl"
        >
          Where Luxury Meets <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 font-cinzel">
            The Clouds of Munnar
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-sans-body font-light leading-relaxed drop-shadow"
        >
          Wake up in private villas. Enjoy direct WhatsApp booking and wild elephant sightings.
        </motion.p>

        {/* Quick WhatsApp Search / Booking Engine Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 glass-panel p-4 md:p-6 rounded-2xl max-w-4xl mx-auto border border-amber-500/30 shadow-2xl text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-[11px] font-cinzel font-semibold text-amber-300 uppercase tracking-wider mb-1.5">
                Select Villa / Suite
              </label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full bg-[#122219] border border-emerald-800/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {ROOMS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-semibold text-amber-300 uppercase tracking-wider mb-1.5">
                Check-In Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                  className="w-full bg-[#122219] border border-emerald-800/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-semibold text-amber-300 uppercase tracking-wider mb-1.5">
                Guests
              </label>
              <select className="w-full bg-[#122219] border border-emerald-800/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400">
                <option>2 Adults (Honeymoon / Couple)</option>
                <option>2 Adults + 1 Child</option>
                <option>2 Adults + 2 Children</option>
                <option>Family Group (4+ Guests)</option>
              </select>
            </div>

            <div>
              <button
                onClick={() => onOpenWhatsAppBooking(selectedRoom)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 uppercase tracking-wider transition-all transform hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Check Availability</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Feature Highlights Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs"
        >
          <div className="glass-panel p-3.5 rounded-xl border border-emerald-800/40 flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              ☕
            </div>
            <div>
              <span className="font-bold text-white block">120 Acres Tea Estate</span>
              <span className="text-slate-400 text-[10px]">Private Plucking Trek</span>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-emerald-800/40 flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              🏊
            </div>
            <div>
              <span className="font-bold text-white block">Heated Infinity Pools</span>
              <span className="text-slate-400 text-[10px]">180° Mountain Views</span>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-emerald-800/40 flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              🐘
            </div>
            <div>
              <span className="font-bold text-white block">Elephant Viewing</span>
              <span className="text-slate-400 text-[10px]">Wildlife Trail Corridor</span>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-emerald-800/40 flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              ⭐
            </div>
            <div>
              <span className="font-bold text-white block">4.9 / 5.0 Rating</span>
              <span className="text-slate-400 text-[10px]">500+ Verified Guests</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <div className="mt-12 flex flex-col items-center">
          <a
            href="#villas"
            className="text-slate-400 hover:text-amber-300 text-xs font-cinzel flex flex-col items-center gap-2 transition-colors group"
          >
            <span>Scroll to Explore Villas</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
